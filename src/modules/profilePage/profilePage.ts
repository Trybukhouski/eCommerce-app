import { Address, Customer, LocalStorageService, NotificationService } from '@services';
import { Form, FormInputs } from '@shared';
import { ProfilePageUI, FormTypes } from './ui';
import { ProfileService } from './services';
import { AddressFields, CustomerFields, SettingsKeys, fillingFieldsSettingsObject } from './config';

type ChangedInputsWithValues = (readonly [FormInputs, string | boolean])[];

export class ProfilePage {
  public elem: HTMLElement;

  private uiApi: ProfilePageUI;

  private serverService = ProfileService;

  static readonly formTypes = ProfilePageUI.formTypes;

  static readonly addressIdAttribute = 'data-address-id';

  private readonly fillingFieldsSettingsObject = fillingFieldsSettingsObject;

  private userDataCache?: Customer;

  constructor() {
    this.uiApi = new ProfilePageUI();
    this.elem = this.uiApi.elem;

    this.addEditClickListener();
    this.addLoggedInListener();
  }

  public async displayUserData(update = false): Promise<void> {
    if (!this.userDataCache || update) {
      const response = await this.serverService.getCustomer();
      this.userDataCache = response;
    }
    const data = this.userDataCache;
    if (!data) {
      return;
    }
    this.addBasicUserData(data);
  }

  private addLoggedInListener(): void {
    const id = LocalStorageService.getUserId();
    if (id) {
      this.displayUserData(true);
    }
    document.addEventListener('logined', (e: Event) => {
      if (!(e instanceof CustomEvent)) {
        return;
      }
      const { detail } = e;
      const isLoggedIn = detail.logined;
      if (isLoggedIn) {
        this.displayUserData(true);
      }
    });
  }

  private addEditClickListener(): void {
    this.elem.addEventListener('click', (event) => {
      const { target } = event;
      const button = (target as HTMLElement | null)?.closest('button');
      const isEditButton = button?.classList.contains(this.uiApi.editButtonClassName);
      const formEntry = Object.entries(this.uiApi.forms).find(
        (entry) => entry[1].editButton === button
      );
      const formKey = ProfilePage.formTypes.find((k) => (formEntry ? formEntry[0] === k : false));

      if (!target || !button || !isEditButton || !formEntry || !formKey) {
        return;
      }

      const isDisabled = this.uiApi.forms[formKey].form.fieldsetElement?.disabled;
      if (isDisabled === undefined) {
        return;
      }

      this.uiApi.toggleFormEditing(formKey, isDisabled);
      if (isDisabled) {
        this.createEditingSession(formKey);
      } else {
        this.displayUserData();
      }
    });
  }

  private createEditingSession(formKey: FormTypes): void {
    const form = this.uiApi.forms[formKey];
    const formElement = form.form.form;
    const inputs = form.form.inputArr;
    const oldValues = inputs.map((i) => this.uiApi.getInputValue(i));

    let submitListener: (e: SubmitEvent) => void;
    const removeSubmitListener = () => {
      formElement.removeEventListener('submit', submitListener);
    };
    submitListener = (e) => {
      e.preventDefault();
      const valuesAndInputs = inputs.map((i) => [i, this.uiApi.getInputValue(i)] as const);
      const changed = valuesAndInputs.filter((pair, ind) => pair[1] !== oldValues[ind]);
      if (changed.length === 0) {
        this.uiApi.toggleFormEditing(formKey, false);
        removeSubmitListener();
        return;
      }
      this.sendEditRequest(formKey, changed, removeSubmitListener);
    };

    formElement.addEventListener('submit', submitListener);
    formElement.firstChild?.addEventListener('click', removeSubmitListener);
  }

  private async sendEditRequest(
    formKey: FormTypes,
    changed: ChangedInputsWithValues,
    removeSubmitListener: () => void
  ): Promise<void> {
    let request: () => void | Promise<Customer>;
    if (formKey === ProfilePage.formTypes[0]) {
      const actions = this.createProfileInfoActions(formKey, changed);
      request = ProfileService.sendActions.bind(null, actions);
    } else if (formKey === ProfilePage.formTypes[1]) {
      request = this.createPasswordRequest(changed);
    } else {
      request = this.createChangeAddressAction(formKey);
    }
    try {
      const data = await request();
      NotificationService.displaySuccess('The information has been updated');
      removeSubmitListener();
      this.uiApi.toggleFormEditing(formKey, false);
      if (formKey === ProfilePage.formTypes[1]) {
        this.cleanPasswordFields();
      } else if (data && formKey !== ProfilePage.formTypes[0]) {
        this.addBasicUserData(data);
      }
    } catch (error) {
      NotificationService.displayError(
        error instanceof Error ? error.message : 'Error fetching customer version'
      );
    }
  }

  private createChangeAddressAction(
    formKey: typeof ProfilePage.formTypes[2] | typeof ProfilePage.formTypes[3]
  ): () => Promise<Customer> {
    const settings = this.fillingFieldsSettingsObject[formKey].fields;
    const addressKeys: {
      [key: string]: string;
    }[] = [];
    settings.forEach((s) => {
      const input = this.uiApi.getFormInputByName(formKey, s.inputName);
      const value = input ? this.uiApi.getInputValue(input) : undefined;
      if (!input || !value) {
        addressKeys.push({
          [s.dataKey]: '',
        });
      } else {
        addressKeys.push({
          [s.dataKey]: `${value}`,
        });
      }
    });

    const address = Object.assign({}, {}, ...addressKeys);
    const addressId = this.uiApi.forms[formKey].form.form.getAttribute(
      ProfilePage.addressIdAttribute
    );

    return ProfileService.sendActions.bind(null, [
      {
        action: 'changeAddress',
        addressId: `${addressId}`,
        address,
      },
    ]);
  }

  private createPasswordRequest(changed: ChangedInputsWithValues): () => void {
    const { formTypes } = ProfilePage;
    const settings = this.fillingFieldsSettingsObject[formTypes[1]].fields;
    const currentPasswordPair = changed.find(
      (pair) => Form.getInputElement(pair[0]).name === settings[0]?.inputName
    );
    const newPasswordPair = changed.find(
      (pair) => Form.getInputElement(pair[0]).name === settings[1]?.inputName
    );
    if (!currentPasswordPair || !newPasswordPair) {
      return () => {};
    }
    return ProfileService.changePassword.bind(
      null,
      `${currentPasswordPair[1]}`,
      `${newPasswordPair[1]}`
    );
  }

  private cleanPasswordFields(): void {
    const { formTypes } = ProfilePage;
    const settings = this.fillingFieldsSettingsObject[formTypes[1]].fields;
    settings.forEach((s) => {
      const input = this.uiApi.getFormInputByName(formTypes[1], s.inputName);
      if (!input) return;
      const inputElement = Form.getInputElement(input);
      inputElement.value = '';
    });
  }

  private createProfileInfoActions(
    formKey: typeof ProfilePage.formTypes[0],
    changed: ChangedInputsWithValues
  ): {
    [key: string]: string | boolean;
    action: string;
  }[] {
    const fieldsSettings = this.fillingFieldsSettingsObject[formKey];
    const actions: {
      [key: string]: string | boolean;
      action: string;
    }[] = [];
    changed.forEach(([input, value]) => {
      const inputElement = Form.getInputElement(input);
      const inputName = inputElement.name;
      const settings = fieldsSettings.fields.find((f) => f.inputName === inputName);
      if (!settings) {
        return;
      }
      const correctValue =
        settings.dataKey === 'dateOfBirth' ? Form.rotateBirthDate(`${value}`) : value;
      actions.push({
        action: settings.actionName,
        [settings.dataKey]: correctValue,
      });
    });
    return actions;
  }

  private addBasicUserData(data: Customer): void {
    const { formTypes } = ProfilePage;
    this.writeDataIntoFormFields(data, formTypes[0]);

    const { addresses } = data;

    const { shippingAddressIds } = data;
    const { billingAddressIds } = data;

    const lastShippingAddressId = shippingAddressIds[billingAddressIds.length - 1];
    const lastBillingAddressId = billingAddressIds[billingAddressIds.length - 1];

    ([
      [lastShippingAddressId, formTypes[2]],
      [lastBillingAddressId, formTypes[3]],
    ] as const).forEach(([id, formKey]) => {
      const address = addresses?.find((a) => a.id === id);
      if (!id || !addresses || !address) {
        return;
      }
      this.writeDataIntoFormFields(address, formKey);
      this.addInputValue(data, formKey, this.fillingFieldsSettingsObject[formKey].defaultCheckbox);
    });
  }

  private writeDataIntoFormFields(data: Customer | Address, formKey: SettingsKeys): void {
    const form = this.uiApi.forms[formKey].form.form;
    if (formKey === ProfilePage.formTypes[2] || formKey === ProfilePage.formTypes[3]) {
      form.setAttribute(ProfilePage.addressIdAttribute, data.id ?? '');
    }
    const fieldsSettingsForFilling = this.fillingFieldsSettingsObject[formKey];

    const { fields } = fieldsSettingsForFilling;
    fields.forEach((field) => {
      this.addInputValue(data, formKey, field);
    });
  }

  private addInputValue(
    data: Customer | Address,
    formKey: SettingsKeys,
    field: (CustomerFields | AddressFields)['fields'][number]
  ): void {
    const input = this.uiApi.getFormInputByName(formKey, field.inputName);
    const inputElement = input ? Form.getInputElement(input) : undefined;

    const isCheckbox = inputElement instanceof HTMLInputElement && inputElement.type === 'checkbox';
    let value: Customer[keyof Customer];
    if (isCheckbox || formKey === ProfilePage.formTypes[0]) {
      value = (data as Customer)[field.dataKey as keyof Customer];
    } else {
      value = (data as Address)[field.dataKey as keyof Address];
    }

    if (!input || value === undefined || !inputElement) {
      return;
    }

    if (isCheckbox) {
      inputElement.checked = Boolean(value);
      return;
    }

    if (field.dataKey === 'dateOfBirth' && typeof value === 'string') {
      value = Form.rotateBirthDate(value);
    }

    inputElement.value = (value ?? '').toString();
  }
}

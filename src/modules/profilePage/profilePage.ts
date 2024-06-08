import { Address, Customer, NotificationService } from '@services';
import { Form } from '@shared';
import { ProfilePageUI, FormTypes } from './ui';
import { ProfileService, handleResponse } from './services';
import { AddressFields, CustomerFields, SettingsKeys, fillingFieldsSettingsObject } from './config';
import { AddressManager, ChangedInputsWithValues } from './addressManager';

export class ProfilePage {
  public elem: HTMLElement;

  private uiApi: ProfilePageUI;

  static readonly formTypes = ProfilePageUI.formTypes;

  private readonly fillingFieldsSettingsObject = fillingFieldsSettingsObject;

  private userDataCache?: Customer;

  private addressManager: AddressManager;

  constructor() {
    this.uiApi = new ProfilePageUI();
    this.elem = this.uiApi.elem;
    this.addressManager = new AddressManager(this.uiApi);

    this.addEditClickListener();
    this.addLoadPageListeners();
  }

  public async displayUserData(update?: boolean, customer?: Customer): Promise<void> {
    if (!this.userDataCache || update) {
      let response: Customer | undefined;
      if (customer) {
        response = customer;
      } else {
        const customerPromise = ProfileService.getCustomer().catch((err: Error) => {
          NotificationService.displayError(err.message);
          return undefined;
        });
        response = await customerPromise;
      }
      this.userDataCache = response;
    }
    const data = this.userDataCache;
    if (!data) {
      return;
    }
    this.addBasicUserData(data);
  }

  private addLoadPageListeners(): void {
    const func = () => {
      setTimeout(() => {}, 0);
      const idMatch = window.location.hash.match(/profile/);
      if (idMatch === null) {
        return;
      }
      this.displayUserData(true);
    };
    window.addEventListener('hashchange', func);
    document.addEventListener('DOMContentLoaded', func);
    document.addEventListener('logined', (event) => {
      if (!(event instanceof CustomEvent)) return;
      const isLoggedIn = event.detail.logined;
      if (typeof isLoggedIn !== 'boolean') return;
      if (isLoggedIn === false) {
        this.deleteUserInfo();
      }
    });
  }

  private deleteUserInfo(): void {
    ProfileService.deleteCustomerID();
    this.userDataCache = undefined;
    this.uiApi.clearPageFields();
    this.addressManager.clearAddressIds();
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
      this.uiApi.toggleDisableEditButton(formKey, true);
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
      request = await this.addressManager.chooseAddOrUpdateAddress(formKey, changed);
    }

    const data = await handleResponse(
      request(),
      'The information has been updated',
      'Error fetching customer version'
    );
    removeSubmitListener();
    this.uiApi.toggleFormEditing(formKey, false);
    if (data) {
      if (formKey === ProfilePage.formTypes[1]) {
        this.cleanPasswordFields();
      } else if (data && formKey !== ProfilePage.formTypes[0]) {
        this.displayUserData(true, data);
      }
    }
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
      const inputElement = this.uiApi.getInputElementByName(formTypes[1], s.inputName);
      if (!inputElement) return;
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

    const lastShippingAddressId = shippingAddressIds[0];
    const lastBillingAddressId = billingAddressIds[0];

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
    const { form } = this.uiApi.forms[formKey].form;
    if (formKey === ProfilePage.formTypes[2] || formKey === ProfilePage.formTypes[3]) {
      form.setAttribute(this.addressManager.addressIdAttribute, data.id ?? '');
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
    const inputElement = this.uiApi.getInputElementByName(formKey, field.inputName);

    const isCheckbox = inputElement instanceof HTMLInputElement && inputElement.type === 'checkbox';
    let value: Customer[keyof Customer];
    if (isCheckbox || formKey === ProfilePage.formTypes[0]) {
      value = (data as Customer)[field.dataKey as keyof Customer];
    } else {
      value = (data as Address)[field.dataKey as keyof Address];
    }

    if (!inputElement || value === undefined || !inputElement) {
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

import { Address, Customer, LocalStorageService } from '@services';
import { Form } from '@shared';
import { ProfilePageUI } from './ui';
import { ProfileService } from './services';
import { AddressField, CustomerField, SettingsKeys, fillingFieldsSettingsObject } from './config';

export class ProfilePage {
  public elem: HTMLElement;

  private uiApi: ProfilePageUI;

  private serverService = ProfileService;

  static readonly formTypes = ProfilePageUI.formTypes;

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
      this.uiApi.changeRequired(formKey, !!isDisabled);
      this.uiApi.disableFieldset(formKey, !isDisabled);
      this.uiApi.toggleFormEditing(formKey);
      if (!isDisabled) {
        this.displayUserData();
      }
    });
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
    const fieldsSettingsForFilling = this.fillingFieldsSettingsObject[formKey];

    const { fields } = fieldsSettingsForFilling;
    fields.forEach((field) => {
      this.addInputValue(data, formKey, field);
    });
  }

  private addInputValue(
    data: Customer | Address,
    formKey: SettingsKeys,
    field: (CustomerField | AddressField)['fields'][number]
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

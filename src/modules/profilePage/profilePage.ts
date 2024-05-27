import { Address, Customer } from '@services';
import { Form } from '@shared';
import { ProfilePageUI } from './ui';
import { ProfileService } from './services';
import { AddressField, CustomerField, Settings, SettingsKeys } from './interfaces';

export class ProfilePage {
  public elem: HTMLElement;

  private uiApi: ProfilePageUI;

  private serverService = ProfileService;

  static readonly formTypes = ProfilePageUI.formTypes;

  private readonly fillingFieldsSettingsObject: Settings = {
    [ProfilePage.formTypes[0]]: {
      fields: [
        {
          inputName: 'first-name',
          dataKey: 'firstName',
        },
        {
          inputName: 'last-name',
          dataKey: 'lastName',
        },
        {
          inputName: 'email',
          dataKey: 'email',
        },
        {
          inputName: 'birth-date',
          dataKey: 'dateOfBirth',
        },
      ],
    },
    [ProfilePage.formTypes[2]]: {
      fields: [
        {
          inputName: 'delivery-country',
          dataKey: 'country',
        },
        {
          inputName: 'delivery-city',
          dataKey: 'city',
        },
        {
          inputName: 'delivery-street',
          dataKey: 'streetName',
        },
        {
          inputName: 'delivery-index',
          dataKey: 'postalCode',
        },
      ],
      defaultCheckbox: {
        inputName: 'delivery-default',
        dataKey: 'defaultShippingAddressId',
      },
    },
    [ProfilePage.formTypes[3]]: {
      fields: [
        {
          inputName: 'bills-country',
          dataKey: 'country',
        },
        {
          inputName: 'bills-city',
          dataKey: 'city',
        },
        {
          inputName: 'bills-street',
          dataKey: 'streetName',
        },
        {
          inputName: 'bills-index',
          dataKey: 'postalCode',
        },
      ],
      defaultCheckbox: {
        inputName: 'bills-default',
        dataKey: 'defaultBillingAddressId',
      },
    },
  };

  constructor() {
    this.uiApi = new ProfilePageUI();
    this.elem = this.uiApi.elem;

    this.addEditClickListener();
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
        this.displayUserData(); // TODO: убрать, когда закончу разработку
      }
    });
  }

  public async displayUserData(): Promise<void> {
    const response = await this.serverService.getCustomer();
    this.addBasicUserData(response);
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

    if (isCheckbox && typeof value === 'boolean') {
      inputElement.checked = value;
      return;
    }

    if (field.dataKey === 'dateOfBirth' && typeof value === 'string') {
      value = Form.rotateBirthDate(value);
    }

    inputElement.value = (value ?? '').toString();
  }
}

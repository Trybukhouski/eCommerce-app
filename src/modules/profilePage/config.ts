import { Address, Customer } from '@services';
import { ProfilePageUI } from './ui';

type CustomerField = {
  actionName: string;
  inputName: string;
  dataKey: keyof Customer;
};

type AddressField = {
  inputName: string;
  dataKey: keyof Address;
};

type CustomerFields = {
  fields: CustomerField[];
};

type PasswordFields = {
  fields: {
    inputName: string;
    dataKey: string;
  }[];
};

type DefaultCheckboxType = CustomerField;

type AddressFields = {
  fields: AddressField[];
  defaultCheckbox: DefaultCheckboxType;
};

const { formTypes } = ProfilePageUI;
const addressSettingsTypes = [formTypes[2], formTypes[3]] as const;

type BasicFieldsSettings = Record<typeof formTypes[0], CustomerFields>;
type PasswordFieldsSettings = Record<typeof formTypes[1], PasswordFields>;
type AddressFieldsSettings = Record<typeof addressSettingsTypes[number], AddressFields>;

const settingsTypes = [formTypes[0], formTypes[2], formTypes[3]] as const;
type SettingsKeys = typeof settingsTypes[number];
interface Settings extends BasicFieldsSettings, PasswordFieldsSettings, AddressFieldsSettings {}

const fillingFieldsSettingsObject: Settings = {
  [ProfilePageUI.formTypes[0]]: {
    fields: [
      {
        inputName: 'first-name',
        dataKey: 'firstName',
        actionName: 'setFirstName',
      },
      {
        inputName: 'last-name',
        dataKey: 'lastName',
        actionName: 'setLastName',
      },
      {
        inputName: 'email',
        dataKey: 'email',
        actionName: 'changeEmail',
      },
      {
        inputName: 'birth-date',
        dataKey: 'dateOfBirth',
        actionName: 'setDateOfBirth',
      },
    ],
  },
  [ProfilePageUI.formTypes[1]]: {
    fields: [
      {
        inputName: 'password',
        dataKey: 'currentPassword',
      },
      {
        inputName: 'new-password',
        dataKey: 'newPassword',
      },
    ],
  },
  [ProfilePageUI.formTypes[2]]: {
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
      actionName: 'setDefaultShippingAddress',
    },
  },
  [ProfilePageUI.formTypes[3]]: {
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
      actionName: 'setDefaultBillingAddress',
    },
  },
};

export { Settings, SettingsKeys, AddressFields, CustomerFields, fillingFieldsSettingsObject };

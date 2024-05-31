import { Address, Customer } from '@services';
import { ProfilePageUI } from './ui';

type CustomerField = {
  fields: {
    inputName: string;
    dataKey: keyof Customer;
  }[];
};

type AddressField = {
  fields: {
    inputName: string;
    dataKey: keyof Address;
  }[];
  defaultCheckbox: {
    inputName: string;
    dataKey: keyof Customer;
  };
};

const { formTypes } = ProfilePageUI;
const addressSettingsTypes = [formTypes[2], formTypes[3]] as const;

type BasicFieldsSettings = Record<typeof formTypes[0], CustomerField>;
type AddressFieldsSettings = Record<typeof addressSettingsTypes[number], AddressField>;

const settingsTypes = [formTypes[0], formTypes[2], formTypes[3]] as const;
type SettingsKeys = typeof settingsTypes[number];
interface Settings extends BasicFieldsSettings, AddressFieldsSettings {}

const fillingFieldsSettingsObject: Settings = {
  [ProfilePageUI.formTypes[0]]: {
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
    },
  },
};

export { Settings, SettingsKeys, AddressField, CustomerField, fillingFieldsSettingsObject };

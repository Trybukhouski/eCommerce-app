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

export { Settings, SettingsKeys, AddressField, CustomerField };

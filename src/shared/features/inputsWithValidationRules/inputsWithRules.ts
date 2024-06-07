import { FormOptions } from '@shared';
import {
  emailValidation,
  passwordValidation,
  nameValidation,
  birthDateValidation,
  postValidation,
  streetValidation,
} from './validationRules';

type FormInputOptions = NonNullable<FormOptions['inputsOptions']>[number];

type InputOptionsType = FormInputOptions['type'];

const passwordType: InputOptionsType = 'password';

const selectType: InputOptionsType = 'select';

const requiredWithHintPattern = {
  hasHint: true,
  required: true,
};

const emailInputOptions = {
  labelText: 'Email:',
  placeholder: 'example@gmail.com',
  name: 'email',
  type: 'email',
};

const passwordInputOptions = {
  labelText: 'Password:',
  placeholder: '2333Wd#sQ',
  name: 'password',
  type: 'password',
};

const firstNameInputOptions = {
  labelText: 'First name:',
  placeholder: 'Alex',
  name: 'first-name',
  type: 'text',
};

const lastNameInputOptions = {
  labelText: 'Last name:',
  placeholder: 'Smith',
  name: 'last-name',
  type: 'text',
};

const birthDateInputOptions = {
  labelText: 'Date of Birth:',
  placeholder: '15-03-1988',
  name: 'birth-date',
  type: 'text',
};

const countrySelectOptions = {
  name: 'country',
  labelText: 'Country:',
  size: 1,
  required: true,
  options: [
    {
      value: 'RU',
      text: 'Russia',
    },
    {
      value: 'BY',
      text: 'Belarus',
    },
    {
      value: 'US',
      text: 'United States of America',
    },
    {
      value: 'KZ',
      text: 'Kazakhstan',
    },
  ],
};

const cityInputOption = {
  labelText: 'City:',
  placeholder: 'Moscow',
  name: 'city',
  type: 'text',
};

const streetInputOptions = {
  labelText: 'Street:',
  placeholder: 'Lenina',
  name: 'street',
  type: 'text',
};

const postInputOption = {
  labelText: 'Postal code:',
  placeholder: '12345',
  name: 'index',
  type: 'text',
};

[
  emailInputOptions,
  passwordInputOptions,
  firstNameInputOptions,
  lastNameInputOptions,
  birthDateInputOptions,
  cityInputOption,
  streetInputOptions,
  postInputOption,
].forEach((o) => Object.assign(o, requiredWithHintPattern));

const defaultAddressCheckboxOptions = {
  name: 'default',
  labelText: 'Set as default address',
  type: 'checkbox',
};

const matchAddressCheckboxOptions: FormInputOptions['options'] = {
  name: 'address-match',
  labelText: 'Also use as billing address',
  type: 'checkbox',
};

const [
  deliveryCountrySelectOptions,
  deliveryCityInputOption,
  deliveryStreetInputOptions,
  deliveryPostInputOption,
  deliveryDefaultAddressCheckboxOptions,
]: Partial<FormInputOptions>[] = [{}, {}, {}, {}, {}];

const deliveryInputOptions = [
  deliveryCountrySelectOptions,
  deliveryCityInputOption,
  deliveryStreetInputOptions,
  deliveryPostInputOption,
  deliveryDefaultAddressCheckboxOptions,
];

const [
  billsCountrySelectOptions,
  billsCityInputOption,
  billsStreetInputOptions,
  billsPostInputOption,
  billsDefaultAddressCheckboxOptions,
]: Partial<FormInputOptions>[] = [{}, {}, {}, {}, {}];

const billsInputOptions = [
  billsCountrySelectOptions,
  billsCityInputOption,
  billsStreetInputOptions,
  billsPostInputOption,
  billsDefaultAddressCheckboxOptions,
];

const addressInputOptions = [
  {
    options: countrySelectOptions,
    type: selectType,
  },
  {
    options: cityInputOption,
    rule: nameValidation,
  },
  {
    options: streetInputOptions,
    rule: streetValidation,
  },
  {
    options: postInputOption,
    rule: postValidation,
  },
  {
    options: defaultAddressCheckboxOptions,
  },
];

// The object is copied here and the name property is changed in order to have 2 address fields
const [nonNullableDeliveryInputOptions, nonNullableBillsInputOptions] = [
  deliveryInputOptions,
  billsInputOptions,
].map((group, index) => {
  const namePrefix = index === 0 ? 'delivery' : 'bills';
  const newGroup = group.map((i, ind) => {
    const address = addressInputOptions[ind];
    const addressName = address?.options.name;
    if (i === undefined || !address) {
      return {} as FormInputOptions;
    }
    const newOptions = { ...address.options, name: `${namePrefix}-${addressName}` };
    Object.assign(i, address, { options: newOptions });
    return i as FormInputOptions;
  });
  return newGroup;
}) as [FormInputOptions[], FormInputOptions[]];

nonNullableDeliveryInputOptions.push({ options: matchAddressCheckboxOptions });

const firstNameInputOptionsWithRule = {
  options: firstNameInputOptions,
  rule: nameValidation,
};

const lastNameInputOptionsWithRule = {
  options: lastNameInputOptions,
  rule: nameValidation,
};

const emailInputOptionsWithRule = {
  options: emailInputOptions,
  rule: emailValidation,
};

const passwordInputOptionsWithRule = {
  options: passwordInputOptions,
  rule: passwordValidation,
  type: passwordType,
};

const birthDateInputOptionsWithRule = {
  options: birthDateInputOptions,
  rule: birthDateValidation,
};

export {
  firstNameInputOptionsWithRule,
  lastNameInputOptionsWithRule,
  emailInputOptionsWithRule,
  passwordInputOptionsWithRule,
  birthDateInputOptionsWithRule,
  nonNullableDeliveryInputOptions as deliveryInputOptionsWithRuleArr,
  nonNullableBillsInputOptions as billsInputOptionsWithRuleArr,
};

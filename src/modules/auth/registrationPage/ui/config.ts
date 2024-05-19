import {
  emailValidation,
  passwordValidation,
  nameValidation,
  birthDateValidation,
  postValidation,
  streetValidation,
  FormOptions,
} from '@shared';

type InputOptions = NonNullable<FormOptions['inputsOptions']>[number];

type InputOptionsType = InputOptions['type'];

const passwordType: InputOptionsType = 'password';

const selectType: InputOptionsType = 'select';

const formId = 'registration';

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
  form: formId,
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

const defaultAdressCheckboxOptions = {
  name: 'default',
  labelText: 'Set as default adress',
  type: 'checkbox',
};

const matchAdressCheckboxOptions: InputOptions['options'] = {
  name: 'adress-match',
  labelText: 'Also use as billing adress',
  type: 'checkbox',
};

const [
  deliveryCountrySelectOptions,
  deliveryCityInputOption,
  deliveryStreetInputOptions,
  deliveryPostInputOption,
  deliveryDefaultAdressCheckboxOptions,
]: Partial<InputOptions>[] = [{}, {}, {}, {}, {}];

const deliveryInputOptions = [
  deliveryCountrySelectOptions,
  deliveryCityInputOption,
  deliveryStreetInputOptions,
  deliveryPostInputOption,
  deliveryDefaultAdressCheckboxOptions,
];

const [
  billsCountrySelectOptions,
  billsCityInputOption,
  billsStreetInputOptions,
  billsPostInputOption,
  billsDefaultAdressCheckboxOptions,
]: Partial<InputOptions>[] = [{}, {}, {}, {}, {}];

const billsInputOptions = [
  billsCountrySelectOptions,
  billsCityInputOption,
  billsStreetInputOptions,
  billsPostInputOption,
  billsDefaultAdressCheckboxOptions,
];

const adressInputOptions = [
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
    options: defaultAdressCheckboxOptions,
  },
];

// The object is copied here and the name property is changed in order to have 2 address fields
const [nonNullableDeliveryInputOptions, nonNullableBillsInputOptions] = [
  deliveryInputOptions,
  billsInputOptions,
].map((g, index) => {
  const namePrefix = index === 0 ? 'delivery' : 'bills';
  const newG = g.map((i, ind) => {
    const adress = adressInputOptions[ind];
    const adressName = adress?.options.name;
    if (i === undefined || !adress) {
      return {} as InputOptions;
    }
    const newOptions = { ...adress.options, name: `${namePrefix}-${adressName}` };
    Object.assign(i, adress, { options: newOptions });
    if (index === 1) {
      Object.defineProperty(i.options, 'required', { value: false });
    }
    return i as InputOptions;
  });
  return newG;
}) as [InputOptions[], InputOptions[]];

nonNullableDeliveryInputOptions.push({ options: matchAdressCheckboxOptions });

const formOptions = {
  hasFieldset: false,
  inputsOptions: [
    {
      options: firstNameInputOptions,
      rule: nameValidation,
    },
    {
      options: lastNameInputOptions,
      rule: nameValidation,
    },
    {
      options: emailInputOptions,
      rule: emailValidation,
    },
    {
      options: passwordInputOptions,
      rule: passwordValidation,
      type: passwordType,
    },
    {
      options: birthDateInputOptions,
      rule: birthDateValidation,
    },
  ],
  subGroups: [
    {
      inputOptions: nonNullableDeliveryInputOptions,
      id: 'delivery',
      legend: 'Delivery adress:',
    },
    {
      inputOptions: nonNullableBillsInputOptions,
      id: 'bills',
      legend: 'Bills adress:',
    },
  ],
  buttonOptions: {
    text: 'Create account',
    type: 'submit' as const,
    disabled: true,
  },
  id: formId,
};

export { formOptions };

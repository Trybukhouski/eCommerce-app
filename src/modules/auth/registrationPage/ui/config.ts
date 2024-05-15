import {
  emailValidation,
  passwordValidation,
  nameValidation,
  birthDateValidation,
  postValidation,
  streetValidation,
  FormOptions,
} from '@shared';

type InputOptionsType = NonNullable<FormOptions['inputsOptions']>[number]['type'];

const passwordType: InputOptionsType = 'password';

const selectType: InputOptionsType = 'select';

const formId = 'registration';

const requiredWithHintPattern = {
  hasHint: true,
  require: true,
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
  options: 'Russia, Belarus, USA, Kazakhstan'.split(', '),
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

const formOptions = {
  hasFieldset: true,
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
  ],
  buttonOptions: {
    text: 'Create account',
    type: 'submit' as const,
    disabled: true,
  },
  id: formId,
};

export { formOptions };

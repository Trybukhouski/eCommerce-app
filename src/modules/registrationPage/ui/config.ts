import { emailValidation, passwordValidation } from '@shared/index';

const requiredWithHintPattern = {
  hasHint: true,
  require: true,
}

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
  type: 'date',
};

const adressInputOptions = {
  labelText: 'Address:',
  placeholder: 'Minsk, Belarus, Independence str 100-34',
  name: 'adress',
  type: 'text',
};

[
  emailInputOptions,
  passwordInputOptions,
  firstNameInputOptions,
  lastNameInputOptions,
  birthDateInputOptions,
  adressInputOptions,
].forEach((o) => Object.assign(o, requiredWithHintPattern));

const formOptions = {
  hasFieldset: true,
  inputsOptions: [
    {
      options: firstNameInputOptions,
      // rule: emailValidation,
    },
    {
      options: lastNameInputOptions,
      // rule: emailValidation,
    },
    {
      options: emailInputOptions,
      rule: emailValidation,
    },
    {
      options: passwordInputOptions,
      rule: passwordValidation,
    },
    {
      options: birthDateInputOptions,
      // rule: emailValidation,
    },
    {
      options: adressInputOptions,
      // rule: emailValidation,
    },
  ],
  buttonOptions: {
    text: 'Create account',
    type: 'submit' as const,
    disabled: true,
  },
};

export { formOptions };
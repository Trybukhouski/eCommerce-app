import { emailValidation, passwordValidation } from '@shared/index';

const emailInputOptions = {
  labelText: 'Email:',
  placeholder: 'example@gmail.com',
  name: 'email',
  hasHint: true,
  require: true,
  type: 'email',
};

const passwordInputOptions = {
  labelText: 'Password:',
  placeholder: '2333Wd#sQ',
  name: 'password',
  hasHint: true,
  require: true,
  type: 'password',
};

const formOptions = {
  hasFieldset: true,
  inputsOptions: [
    {
      options: emailInputOptions,
      rule: emailValidation,
    },
    {
      options: passwordInputOptions,
      rule: passwordValidation,
    },
  ],
  buttonOptions: {
    text: 'Login',
    type: 'submit' as const,
    disabled: true,
  },
};

export { formOptions };

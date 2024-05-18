import { emailValidation, passwordValidation, FormOptions } from '@shared';

type InputOptionsType = NonNullable<FormOptions['inputsOptions']>[number]['type'];

const passwordType: InputOptionsType = 'password';

const emailInputOptions = {
  labelText: 'Email:',
  placeholder: 'example@gmail.com',
  name: 'email',
  hasHint: true,
  required: true,
  type: 'email',
};

const passwordInputOptions = {
  labelText: 'Password:',
  placeholder: '2333Wd#sQ',
  name: 'password',
  hasHint: true,
  required: true,
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
      type: passwordType,
    },
  ],
  buttonOptions: {
    text: 'Login',
    type: 'submit' as const,
    disabled: true,
  },
};

export { formOptions };

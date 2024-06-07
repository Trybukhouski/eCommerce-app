import { passwordInputOptionsWithRule, emailInputOptionsWithRule } from '@shared';

const formOptions = {
  hasFieldset: false,
  inputsOptions: [emailInputOptionsWithRule, passwordInputOptionsWithRule],
  buttonOptions: {
    text: 'Login',
    type: 'submit' as const,
    disabled: true,
  },
};

export { formOptions };

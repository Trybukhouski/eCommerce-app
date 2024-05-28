import {
  firstNameInputOptionsWithRule,
  lastNameInputOptionsWithRule,
  emailInputOptionsWithRule,
  passwordInputOptionsWithRule,
  birthDateInputOptionsWithRule,
  deliveryInputOptionsWithRuleArr,
  billsInputOptionsWithRuleArr,
} from '@shared';

const formId = 'registration';

const formOptions = {
  hasFieldset: false,
  inputsOptions: [
    firstNameInputOptionsWithRule,
    lastNameInputOptionsWithRule,
    emailInputOptionsWithRule,
    passwordInputOptionsWithRule,
    birthDateInputOptionsWithRule,
  ],
  subGroups: [
    {
      inputOptions: deliveryInputOptionsWithRuleArr,
      id: 'delivery',
      legend: 'Delivery address:',
    },
    {
      inputOptions: billsInputOptionsWithRuleArr,
      id: 'bills',
      legend: 'Bills address:',
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

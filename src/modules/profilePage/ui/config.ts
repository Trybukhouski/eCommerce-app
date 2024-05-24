import {
  firstNameInputOptionsWithRule,
  lastNameInputOptionsWithRule,
  emailInputOptionsWithRule,
  // passwordInputOptionsWithRule,
  birthDateInputOptionsWithRule,
  deliveryInputOptionsWithRuleArr,
  billsInputOptionsWithRuleArr,
} from '@shared';

const formId = 'profile';

const mainInputOptionsWithRuleArr = [
  firstNameInputOptionsWithRule,
  lastNameInputOptionsWithRule,
  emailInputOptionsWithRule,
  birthDateInputOptionsWithRule,
];

const formOptions = {
  hasFieldset: false,
  inputsOptions: [],
  subGroups: [
    {
      inputOptions: mainInputOptionsWithRuleArr,
      id: 'basic',
      legend: 'Main Info:',
    },
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

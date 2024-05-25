import {
  firstNameInputOptionsWithRule,
  lastNameInputOptionsWithRule,
  emailInputOptionsWithRule,
  // passwordInputOptionsWithRule,
  birthDateInputOptionsWithRule,
  deliveryInputOptionsWithRuleArr,
  billsInputOptionsWithRuleArr,
} from '@shared';

const mainInputOptionsWithRuleArr = [
  firstNameInputOptionsWithRule,
  lastNameInputOptionsWithRule,
  emailInputOptionsWithRule,
  birthDateInputOptionsWithRule,
];

const buttonOptions = {
  text: 'Update',
  type: 'submit' as const,
  disabled: true,
};

const profilePageOptions = {
  basic: {
    hasFieldset: true,
    inputsOptions: mainInputOptionsWithRuleArr,
    buttonOptions,
    id: 'basic',
  },
  delivery: {
    hasFieldset: true,
    inputsOptions: deliveryInputOptionsWithRuleArr,
    buttonOptions,
    id: 'profile-delivery',
  },
  bills: {
    hasFieldset: true,
    inputsOptions: billsInputOptionsWithRuleArr,
    buttonOptions,
    id: 'profile-bills',
  },
};

export { profilePageOptions };

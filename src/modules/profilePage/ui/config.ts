import {
  firstNameInputOptionsWithRule,
  lastNameInputOptionsWithRule,
  emailInputOptionsWithRule,
  passwordInputOptionsWithRule,
  birthDateInputOptionsWithRule,
  deliveryInputOptionsWithRuleArr,
  billsInputOptionsWithRuleArr,
} from '@shared';

function cloneObject(obj: { options: object }, options: object) {
  const objOptions = { ...obj.options };
  const newObjOptions = { ...objOptions, ...options };
  const newObj = { ...obj };
  newObj.options = newObjOptions;
  return newObj;
}

const newPassword = cloneObject(passwordInputOptionsWithRule, {
  labelText: 'New password:',
  name: 'new-password',
});

const addressMatch = deliveryInputOptionsWithRuleArr[deliveryInputOptionsWithRuleArr.length - 1];
if (addressMatch) {
  const addressMatchBills = cloneObject(addressMatch, {
    labelText: 'Also use as shipping address',
  });
  billsInputOptionsWithRuleArr.push(addressMatchBills);
}

const mainInputOptionsWithRuleArr = [
  firstNameInputOptionsWithRule,
  lastNameInputOptionsWithRule,
  emailInputOptionsWithRule,
  birthDateInputOptionsWithRule,
];

const passwordInputOptionsWithRuleArr = [passwordInputOptionsWithRule, newPassword];

const buttonOptions = {
  text: 'Update',
  type: 'submit' as const,
  disabled: true,
};

const profilePageOptionsKeys = ['basic', 'password', 'delivery', 'bills'] as const;

const profilePageOptions = {
  [profilePageOptionsKeys[0]]: {
    hasFieldset: true,
    inputsOptions: mainInputOptionsWithRuleArr,
    buttonOptions,
    id: 'basic',
  },
  [profilePageOptionsKeys[1]]: {
    hasFieldset: true,
    inputsOptions: passwordInputOptionsWithRuleArr,
    buttonOptions,
    id: 'password',
  },
  [profilePageOptionsKeys[2]]: {
    hasFieldset: true,
    inputsOptions: deliveryInputOptionsWithRuleArr,
    buttonOptions,
    id: 'profile-delivery',
  },
  [profilePageOptionsKeys[3]]: {
    hasFieldset: true,
    inputsOptions: billsInputOptionsWithRuleArr,
    buttonOptions,
    id: 'profile-bills',
  },
} as const;

export { profilePageOptions, profilePageOptionsKeys };

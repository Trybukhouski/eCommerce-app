import { ValidationRule } from './ValidationRule';

const emailValidation = new ValidationRule({
  pattern: `^[\\w\\d!#$%&*+=\\?^_\\|~\\-]+?@(\\w|\\d|\\.|_|-){1,}\\.(\\w|\\d|\\.|_|-){1,}$`,
});

emailValidation.addHints([
  {
    text: 'There should be no spaces in the email.',
    callback: (s: string) => !s.match(/\s/),
  },
  {
    text: `Must contain an '@' symbol.`,
    callback: (s: string) => !!s.match(/@/),
  },
  {
    text: 'There should be a domain part.',
    callback: (s: string) => !!s.match(/@(\w|\d|_|-){1}(\w|\d|\.|_|-)*\.(\w|\d|\.|_|-){1,}$/),
  },
  {
    text: 'Must contain an account name.',
    callback: (s: string) => !!s.match(/^\S{1,}@/),
  },
  {
    text: 'Only roman alphabet is allowed.',
    callback: (s: string) => !!s.match(/^[\w\d!#$%&*+=?^_|~-]*@/),
  },
]);

export { emailValidation };

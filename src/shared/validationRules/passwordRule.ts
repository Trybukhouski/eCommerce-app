import ValidationRule from './class/validation';

const passwordValidation = new ValidationRule({
  minLength: 8,
  pattern: `^(?=.*[A-Z])(?=.*[a-z])(?=.*\\d)(?=.*[!@#$%^&*])\\S.*\\S$`,
});

passwordValidation.addHints([
  {
    text: 'The minimum length is 8 characters long.',
    callback: (s: string) => s.length >= 8,
  },
  {
    text: 'Must contain at least one uppercase roman letter.',
    callback: (s: string) => !!s.match(/[A-Z]/),
  },
  {
    text: 'Must contain at least one lowercase roman letter.',
    callback: (s: string) => !!s.match(/[a-z]/),
  },
  {
    text: 'Must contain at least one digit.',
    callback: (s: string) => !!s.match(/\d/),
  },
  {
    text: 'Must contain at least one special character (!@#$%^&*).',
    callback: (s: string) => !!s.match(/[!@#$%^&*]{1}/),
  },
  {
    text: 'Must not contain leading or trailing whitespace.',
    callback: (s: string) => (s.length < 3 ? !s.match(/\s/) : !!s.match(/^\S.*\S$/)),
  },
]);

export default passwordValidation;

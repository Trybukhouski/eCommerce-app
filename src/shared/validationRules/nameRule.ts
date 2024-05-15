import { ValidationRule } from './class/validation';

const nameValidation = new ValidationRule({
  minLength: 1,
  pattern: `^[\\p{L} \\-]*$`,
});

nameValidation.addHints([
  {
    text: 'The minimum length is 1 characters long.',
    callback: (s: string) => s.length >= 1,
  },
  {
    text: 'There should be no special characters or numbers.',
    callback: (s: string) => !!s.match(/^[\p{L} -]*$/u),
  },
]);

export { nameValidation };

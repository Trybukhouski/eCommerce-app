import { ValidationRule } from './ValidationRule';

const nameValidation = new ValidationRule({
  minLength: 1,
  hasCustomValidation: true,
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
  {
    text: 'There should be no spaces at the beginning or end of a line.',
    callback: (s: string) => (s.length < 2 && s !== ' ') || !!s.match(/(?<=^\p{L}).*(?=\p{L}$)/u),
  },
]);

export { nameValidation };

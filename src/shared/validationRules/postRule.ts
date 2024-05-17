import { ValidationRule } from './class/validation';

const postValidation = new ValidationRule({
  minLength: 4,
});

postValidation.addHints([
  {
    text: 'The minimum length is 4 characters long.',
    callback: (s: string) => s.length >= 4,
  },
]);

export { postValidation };

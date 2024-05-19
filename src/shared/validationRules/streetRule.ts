import { ValidationRule } from './ValidationRule';

const streetValidation = new ValidationRule({
  minLength: 1,
  hasCustomValidation: true,
});

streetValidation.addHints([
  {
    text: 'The minimum length is 1 characters long.',
    callback: (s: string) => s.length >= 1,
  },
]);

export { streetValidation };

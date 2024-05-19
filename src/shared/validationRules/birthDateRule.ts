import { ValidationRule } from './ValidationRule';

function flipDate(date: string) {
  return date.replace(/^(\d{1,2})([-.]\d{1,2}[-.])(\d{4})$/, '$3$2$1');
}

const birthDateValidation = new ValidationRule({
  minLength: 8,
  pattern: `^\\d{1,2}([\\-\\.]{1})\\d{1,2}\\1\\d{4}$`,
  hasCustomValidation: true,
});

birthDateValidation.addHints([
  {
    text: 'You should be at least 14 y.o.',
    callback: (s: string) => {
      if (s.length < 8 || !s.match(/^\d{1,2}([-.]{1})\d{1,2}\1\d{4}$/)) {
        return false;
      }

      const correctDateStr = flipDate(s);
      const currentData = new Date();
      const birthDate = new Date(correctDateStr);
      const yearsDifference = currentData.getFullYear() - birthDate.getFullYear();
      if (Number.isNaN(yearsDifference)) {
        return false;
      }

      if (yearsDifference > 14) {
        return true;
      }
      if (yearsDifference === 14 && birthDate.getMonth() - currentData.getMonth() < 0) {
        return true;
      }
      if (
        yearsDifference === 14 &&
        birthDate.getMonth() - currentData.getMonth() === 0 &&
        birthDate.getDate() - currentData.getDate() <= 0
      ) {
        return true;
      }
      return false;
    },
  },
  {
    text: 'It should be an actual date',
    callback: (s) => new Date(flipDate(s)).toString() !== 'Invalid Date',
  },
  {
    text: 'Please, enter in the correct format (dd-mm-yyyy).',
    callback: (s) => !!s.match(/^\d{1,2}([-.]{1})\d{1,2}\1\d{4}$/),
  },
]);

export { birthDateValidation };

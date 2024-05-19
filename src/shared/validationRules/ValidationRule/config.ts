interface ValidationOptions {
  minLength?: number;
  pattern?: string;
  titleText?: string;
  hasCustomValidation?: boolean;
}

const defaultValidationOptions: Required<ValidationOptions> = {
  minLength: 0,
  pattern: '',
  titleText: '',
  hasCustomValidation: false,
};

export { ValidationOptions, defaultValidationOptions };

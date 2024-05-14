import { InputOptions, Input, ButtonOptions } from '@shared';

interface FormOptions {
  hasFieldset?: boolean;
  inputsOptions?: {
    options: InputOptions;
    rule?: {
      setRules(input: Input): void;
    };
    type?: 'password';
  }[];
  buttonOptions?: ButtonOptions;
}

const defaultFormOptions: Required<FormOptions> = {
  hasFieldset: false,
  inputsOptions: [],
  buttonOptions: {},
};

export { FormOptions, defaultFormOptions };

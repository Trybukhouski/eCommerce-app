import { InputOptions, Input, ButtonOptions, SelectOptions } from '@shared';

interface FormOptions {
  hasFieldset?: boolean;
  inputsOptions?: {
    options: InputOptions | SelectOptions;
    rule?: {
      setRules(input: Input): void;
    };
    type?: 'password' | 'select';
  }[];
  buttonOptions?: ButtonOptions;
}

const defaultFormOptions: Required<FormOptions> = {
  hasFieldset: false,
  inputsOptions: [],
  buttonOptions: {},
};

export { FormOptions, defaultFormOptions };

import { InputOptions, Input, Select, ButtonOptions, SelectOptions } from '@shared';

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
  id?: string;
}

type FormInputs = Input | Select;

const defaultFormOptions: Required<Omit<FormOptions, 'id'>> = {
  hasFieldset: false,
  inputsOptions: [],
  buttonOptions: {},
};

export { FormOptions, defaultFormOptions, FormInputs };

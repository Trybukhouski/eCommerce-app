interface InputOptions {
  name?: string;
  type?: string;
  placeholder?: string;
  labelText?: string;
  value?: string;
  required?: boolean;
  hasHint?: boolean;
  disabled?: boolean;
}

const defaultInputOptions: Required<InputOptions> = {
  name: '',
  type: 'text',
  placeholder: '',
  labelText: '',
  value: '',
  required: false,
  hasHint: false,
  disabled: false,
};

export { InputOptions, defaultInputOptions };

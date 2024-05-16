type InputTypes =
  | 'button'
  | 'checkbox'
  | 'color'
  | 'date'
  | 'datetime-local'
  | 'email'
  | 'file'
  | 'hidden'
  | 'image'
  | 'month'
  | 'number'
  | 'password'
  | 'radio'
  | 'range'
  | 'reset'
  | 'search'
  | 'submit'
  | 'tel'
  | 'text'
  | 'time'
  | 'url'
  | 'week';

interface InputOptions {
  name?: string;
  type?: InputTypes;
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

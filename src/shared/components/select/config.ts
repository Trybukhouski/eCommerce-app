interface SelectOptions {
  name?: string;
  form?: string;
  labelText?: string;
  size?: number;
  multiple?: boolean;
  required?: boolean;
  disabled?: boolean;
  options?: {
    value: string;
    text: string;
  }[];
}

const defaultSelectOptions: Required<SelectOptions> = {
  name: '',
  form: '',
  labelText: '',
  size: 0,
  multiple: false,
  required: false,
  disabled: false,
  options: [],
};

export { SelectOptions, defaultSelectOptions };

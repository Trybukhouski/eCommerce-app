interface ButtonOptions {
  text?: string;
  type?: 'submit' | 'reset' | 'button';
  icon?: {
    sprite?: BrowserSpriteSymbol;
    towhere: 'start' | 'end';
  };
  disabled?: boolean;
  isLink?: boolean;
  href?: string;
}

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

interface FormOptions {
  hasFieldset?: boolean;
  inputsOptions?: {
    options: InputOptions;
    rule?: {
      setRules(input: Input): void;
    };
  }[];
  buttonOptions?: ButtonOptions;
}

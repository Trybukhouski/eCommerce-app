interface ButtonOptions {
  text?: string;
  type?: 'submit' | 'reset' | 'button';
  icon?: {
    sprite: BrowserSpriteSymbol | undefined;
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

interface InputsOptionsWithRule {
  options: InputOptions;
  rule?: {
    setRules(input: Input): void;
  };
}

interface FormOptions {
  hasFieldset: boolean;
  inputsOptions: InputsOptionsWithRule[];
  buttonOptions: ButtonOptions;
}

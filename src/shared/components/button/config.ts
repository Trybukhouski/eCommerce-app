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

const defaultButtonOptions: Required<ButtonOptions> = {
  text: '',
  type: 'button',
  icon: {
    towhere: 'start',
  },
  disabled: false,
  isLink: false,
  href: '',
};

export { ButtonOptions, defaultButtonOptions };

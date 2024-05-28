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
  customColor?: 'blue';
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
  customColor: 'blue',
};

export { ButtonOptions, defaultButtonOptions };

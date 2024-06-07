interface ButtonOptions {
  className?: 'simple' | 'edit-icon';
  text?: string;
  type?: 'submit' | 'reset' | 'button';
  icon?: {
    sprite?: BrowserSpriteSymbol;
    towhere: 'start' | 'end';
  };
  disabled?: boolean;
  isLink?: boolean;
  href?: string;
  customColor?: string;
}

const defaultButtonOptions: Required<Omit<ButtonOptions, 'customColor'>> = {
  className: 'simple',
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

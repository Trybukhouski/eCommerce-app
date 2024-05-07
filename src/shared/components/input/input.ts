import './style.scss';

interface Options {
  name: string;
  type: string;
  placeholder: string;
  labelText: string;
  value: string;
  required: boolean;
  disabled: boolean;
}

class Input {
  public input: HTMLInputElement;

  public label: HTMLLabelElement;

  public container: HTMLDivElement;

  public hint = undefined as undefined | HTMLUListElement;

  constructor({
    name = '',
    type = 'text',
    placeholder = '',
    labelText = '',
    value = '',
    required = false,
    hasHint = false,
    disabled = false,
  } = {}) {
    this.container = document.createElement('div');
    this.label = document.createElement('label');
    this.input = document.createElement('input');
    this.container.append(this.input);
    this.container.classList.add('input');

    if (hasHint) {
      this.addHint();
    }

    this.setAtributes({
      name,
      type,
      placeholder,
      labelText,
      value,
      required,
      disabled,
    });
  }

  private addHint() {
    const hintContainer = document.createElement('div');
    const hint = document.createElement('ul');
    hintContainer.classList.add('input__hint');
    hintContainer.append(hint);
    this.container.append(hintContainer);
    this.hint = hint;
  }

  private setAtributes({
    name,
    type,
    placeholder,
    labelText,
    value,
    required,
    disabled,
  }: Options): void {
    const { label } = this;
    const { input } = this;

    if (type) {
      input.type = type;
    }
    if (placeholder) {
      input.placeholder = placeholder;
    }
    if (labelText) {
      label.textContent = labelText;
      this.container.prepend(this.label);
    }
    if (name) {
      input.name = name;
    }
    if (value) {
      input.value = value;
    }
    if (required) {
      input.required = true;
    }
    if (disabled) {
      input.disabled = true;
    }
  }
}

export default Input;

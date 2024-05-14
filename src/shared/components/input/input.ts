import * as style from './style.module.scss';
import { defaultInputOptions, InputOptions } from './config';

class Input {
  public input: HTMLInputElement;

  public label: HTMLLabelElement;

  public container: HTMLDivElement;

  public hint?: HTMLUListElement;

  public hintContainer?: HTMLDivElement;

  constructor(options?: InputOptions) {
    const configs = { ...defaultInputOptions, ...options };
    this.container = document.createElement('div');
    this.label = document.createElement('label');
    this.input = document.createElement('input');
    this.container.append(this.input);
    this.container.classList.add(style.input);

    if (configs.hasHint) {
      this.addHint();
    }

    this.setAtributes(configs);
  }

  private addHint(): void {
    const hintContainer = document.createElement('div');
    const hint = document.createElement('ul');
    hintContainer.classList.add(style.input__hint);
    hintContainer.append(hint);
    this.container.append(hintContainer);
    this.hint = hint;
    this.hintContainer = hintContainer;
  }

  private setAtributes({
    name,
    type,
    placeholder,
    labelText,
    value,
    required,
    disabled,
  }: Required<InputOptions>): void {
    const { label } = this;
    const { input } = this;

    if (labelText) {
      label.textContent = labelText;
      this.container.prepend(this.label);
    }

    ([
      ['type', type],
      ['placeholder', placeholder],
      ['name', name],
      ['value', value],
    ] as [string, string][]).forEach((a) => {
      if (a[1] !== '') {
        input.setAttribute(a[0], a[1]);
      }
    });

    input.required = required;
    input.disabled = disabled;
  }
}

export { Input };

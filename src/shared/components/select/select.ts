import { defaultSelectOptions, SelectOptions } from './config';

class Select {
  public select: HTMLSelectElement;

  public label: HTMLLabelElement;

  public container: HTMLDivElement;

  constructor(options?: SelectOptions) {
    const configs = { ...defaultSelectOptions, ...options };
    this.container = document.createElement('div');
    this.label = document.createElement('label');
    this.select = document.createElement('select');
    this.container.append(this.select);
    // this.container.classList.add(style.select);

    this.setAtributes(configs);
    this.addOptions(configs.options);
  }

  private setAtributes({
    name,
    form,
    labelText,
    size,
    multiple,
    required,
    disabled,
  }: Required<SelectOptions>): void {
    const { label } = this;
    const { select } = this;

    if (labelText) {
      label.textContent = labelText;
      this.container.prepend(this.label);
    }

    ([
      ['name', name],
      ['form', form],
    ] as [string, string][]).forEach((a) => {
      if (a[1] !== '') {
        select.setAttribute(a[0], a[1]);
      }
    });

    select.size = size;
    select.required = required;
    select.disabled = disabled;
    select.multiple = multiple;
  }

  public addOptions(selectOptions: string[]) {
    selectOptions.forEach((o) => {
      const optionElem = document.createElement('option');
      optionElem.value = o;
      optionElem.textContent = o;
      this.select.append(optionElem);
    });
  }
}

export { Select };

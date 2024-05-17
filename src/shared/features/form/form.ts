import { Input, Button, PasswordInput, Select } from '@shared';
import { defaultFormOptions, FormOptions } from './config';

type InputsOptionsWithRule = NonNullable<FormOptions['inputsOptions']>;

class Form {
  public container: HTMLElement;

  public inputArr: (Input | Select)[];

  public form: HTMLFormElement;

  public button: HTMLButtonElement;

  constructor(options: FormOptions) {
    const configs = { ...defaultFormOptions, ...options };
    const form = document.createElement('form');
    this.container = form;
    this.form = form;
    if (configs.hasFieldset) {
      const fieldset = document.createElement('fieldset');
      form.append(fieldset);
      this.container = fieldset;
    }

    this.inputArr = [];
    if (configs.inputsOptions.length > 0 && configs.inputsOptions) {
      this.addInputs(configs.inputsOptions);
    }

    const button = new Button(configs.buttonOptions);
    this.button = button.button;
    this.form.append(button.button);

    this.validityListener();

    if (configs.id) {
      this.form.id = configs.id;
    }
  }

  private addInputs(arr: InputsOptionsWithRule): void {
    const { container } = this;
    arr.forEach((i) => {
      let input;
      if (i.type === 'password') {
        input = new PasswordInput(i.options);
      } else if (i.type === 'select') {
        input = new Select(i.options);
      } else {
        input = new Input(i.options);
      }
      container.append(input.container);
      this.inputArr.push(input);

      if (i.rule && input instanceof Input) {
        i.rule.setRules(input);
      }
    });
  }

  private validityListener(): void {
    this.form.addEventListener('input', () => {
      const isValid = !this.inputArr.some((i) => {
        if (i instanceof Input) {
          return i.input.validity.valid === false || i.input.value.length === 0;
        }
        return false;
      });
      this.button.disabled = !isValid;
    });
  }
}

export { Form };

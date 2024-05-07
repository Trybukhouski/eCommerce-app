import { Input, Button } from '@shared/components';

class Form {
  public container: HTMLElement;

  public inputArr: Input[];

  public form: HTMLFormElement;

  public button: HTMLButtonElement;

  constructor({ hasFieldset = false, inputsOptions = [], buttonOptions = {} } = {} as FormOptions) {
    const form = document.createElement('form');
    this.container = form;
    this.form = form;
    if (hasFieldset) {
      const fieldset = document.createElement('fieldset');
      form.append(fieldset);
      this.container = fieldset;
    }

    this.inputArr = [];
    if (inputsOptions.length > 0) {
      this.addInputs(inputsOptions);
    }

    const button = new Button(buttonOptions);
    this.button = button.button;
    this.form.append(button.button);

    this.validityListener();
  }

  private addInputs(arr: InputsOptionsWithRule[]) {
    const { container } = this;
    arr.forEach((i) => {
      const input = new Input(i.options);
      container.append(input.container);
      this.inputArr.push(input);

      if (i.rule) {
        i.rule.setRules(input);
      }
    });
  }

  private validityListener() {
    this.form.addEventListener('input', () => {
      const isValid = !this.inputArr.some((i) => i.input.validity.valid === false);
      this.button.disabled = !isValid;
    });
  }
}

export default Form;

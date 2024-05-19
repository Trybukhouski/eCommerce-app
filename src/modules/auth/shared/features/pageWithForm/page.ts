import { Input, Form } from '@shared';
import * as style from './style.module.scss';
import { InputUnion, InputElements, FormPageOptions } from './config';

class FormPageUI {
  public section: HTMLElement;

  public container: HTMLDivElement;

  public inputArr: InputUnion[];

  public submitButton: HTMLButtonElement;

  public form: HTMLFormElement;

  public inputElements: InputElements = {};

  private formClass: Form;

  public subGroups: {
    [id: string]: {
      fieldset: HTMLElement;
      inputElements: InputUnion[];
    };
  } = {};

  constructor(formOptions: FormPageOptions, headerText: string) {
    this.section = document.createElement('section');
    this.container = document.createElement('div');

    const header = document.createElement('h2');
    header.textContent = headerText;
    this.section.append(header);

    const form = new Form(formOptions);

    this.submitButton = form.button;
    this.form = form.form;
    this.formClass = form;

    this.section.append(this.container);
    this.container.append(this.form);

    this.section.classList.add(style['form-page']);

    if (formOptions.subGroups) {
      this.addGroups(formOptions.subGroups);
    }

    this.inputArr = form.inputArr;

    this.addInputElements();
  }

  private addInputElements() {
    this.inputArr.forEach((i) => {
      const key = i instanceof Input ? i.input.name : i.select.name;
      this.inputElements[key] = i;
    });
  }

  private addGroups(subGroups: NonNullable<FormPageOptions['subGroups']>) {
    subGroups.forEach((g) => {
      const fieldset = document.createElement('fieldset');
      fieldset.id = g.id;
      const legend = document.createElement('legend');
      legend.textContent = g.legend;
      fieldset.append(legend);

      const inputs = this.formClass.addInputs(g.inputOptions);
      inputs.forEach((i) => {
        const elem = i.container;
        elem.remove();
        fieldset.append(elem);
      });
      this.submitButton.before(fieldset);

      this.subGroups[g.id] = {
        inputElements: inputs,
        fieldset,
      };
    });
  }

  public toggleButtonDisabled() {
    const isDisabled = this.submitButton.disabled;
    this.submitButton.disabled = !isDisabled;
  }
}

export { FormPageUI };

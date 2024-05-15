import { Input, Form, FormOptions, Select } from '@shared';
import * as style from './style.module.scss';

class FormPageUI {
  public section: HTMLElement;

  public container: HTMLDivElement;

  public inputArr: (Input | Select)[];

  public submitButton: HTMLButtonElement;

  public form: HTMLFormElement;

  constructor(formOptions: FormOptions, headerText: string) {
    this.section = document.createElement('section');
    this.container = document.createElement('div');

    const header = document.createElement('h2');
    header.textContent = headerText;
    this.section.append(header);

    const form = new Form(formOptions);

    this.inputArr = form.inputArr;
    this.submitButton = form.button;
    this.form = form.form;

    this.section.append(this.container);
    this.container.append(this.form);

    this.section.classList.add(style['form-page']);
  }
}

export { FormPageUI };

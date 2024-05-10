import Form from '@shared/compositeСomponents/form/form';
import { Input } from '@shared/components';
import * as style from './style.module.scss';
import formOptions from './config';

class LoginPageUI {
  public readonly section: HTMLElement;

  public readonly container: HTMLDivElement;

  public readonly inputArr: Input[];

  public readonly submitButton: HTMLButtonElement;

  public readonly form: HTMLFormElement;

  constructor() {
    this.section = document.createElement('section');
    this.container = document.createElement('div');

    const header = document.createElement('h2');
    header.textContent = 'Create account';
    this.section.append(header);

    const form = new Form(formOptions);

    this.inputArr = form.inputArr;
    this.submitButton = form.button;
    this.form = form.form;

    this.section.append(this.container);
    this.container.append(this.form);

    this.section.classList.add(style['login-page']);
  }
}

const loginPageUI = new LoginPageUI();

export default loginPageUI;

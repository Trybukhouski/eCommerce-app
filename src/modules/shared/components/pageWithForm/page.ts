import { Input, Form } from '@shared/index';
import * as style from './style.module.scss';

class FormPageUI {
  public section: HTMLElement;

  public container: HTMLDivElement;

  public messageContainer: HTMLDivElement;

  public inputArr: Input[];

  public submitButton: HTMLButtonElement;

  public form: HTMLFormElement;

  public emailError: HTMLDivElement;

  public passwordError: HTMLDivElement;

  public successMessage: HTMLDivElement;

  constructor(formOptions: FormOptions, headerText: string) {
    this.section = document.createElement('section');
    this.container = document.createElement('div');
    this.messageContainer = document.createElement('div');
    this.messageContainer.className = style['message-container'];

    const header = document.createElement('h2');
    header.textContent = headerText;
    this.section.append(header);

    const form = new Form(formOptions);
    this.inputArr = form.inputArr;
    this.submitButton = form.button;
    this.submitButton.type = 'submit';
    this.form = form.form;

    this.emailError = document.createElement('div');
    this.emailError.id = 'email-error';
    this.emailError.className = style['error-message'];

    this.passwordError = document.createElement('div');
    this.passwordError.id = 'password-error';
    this.passwordError.className = style['error-message'];

    this.successMessage = document.createElement('div');
    this.successMessage.id = 'success-message';
    this.successMessage.className = style['success-message'];

    this.messageContainer.append(this.emailError, this.passwordError, this.successMessage);
    this.container.append(this.messageContainer, this.form);

    this.section.append(this.container);
    this.section.classList.add(style['login-page']);
  }
}

export { FormPageUI };

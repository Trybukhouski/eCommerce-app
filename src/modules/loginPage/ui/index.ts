import Form from '@shared/compositeСomponents/form/form';
import { Input } from '@shared/components';
import { emailValidation, passwordValidation } from '@shared/validationRules';
import './style.scss';

const emailInputOptions = {
  labelText: 'Email:',
  placeholder: 'example@gmail.com',
  name: 'email',
  hasHint: true,
  type: 'email',
};

const passwordInputOptions = {
  labelText: 'Password:',
  placeholder: '2333Wd#sQ',
  name: 'passeard',
  hasHint: true,
  type: 'password',
};

const formOptions = {
  hasFieldset: true,
  inputsOptions: [
    {
      options: emailInputOptions,
      rule: emailValidation,
    },
    {
      options: passwordInputOptions,
      rule: passwordValidation,
    },
  ],
  buttonOptions: {
    text: 'Login',
    type: 'submit' as const,
    disabled: true,
  },
};

class LoginPageUI {
  public section: HTMLElement;

  public container: HTMLDivElement;

  public inputArr: Input[];

  public loginButt: HTMLButtonElement;

  public form: HTMLFormElement;

  constructor() {
    this.section = document.createElement('section');
    this.container = document.createElement('div');

    const h = document.createElement('h2');
    h.textContent = 'Create account';
    this.section.append(h);

    const form = new Form(formOptions);

    this.inputArr = form.inputArr;
    this.loginButt = form.button;
    this.form = form.form;

    this.section.append(this.container);
    this.container.append(this.form);

    this.section.classList.add('login-page');
  }
}

const loginPageUI = new LoginPageUI();

export default loginPageUI;

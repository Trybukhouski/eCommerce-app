import Input from '@shared/components/input/input';
import { emailValidation, passwordValidation } from '@shared/validationRules';

class LoginPage {
  public container: HTMLDivElement;

  constructor() {
    this.container = document.createElement('div');

    const input1 = new Input({
      labelText: 'Email:',
      placeholder: 'example.com',
      name: 'email',
      hasHint: true,
      type: 'email',
    });
    emailValidation.setRules(input1);

    const input2 = new Input({
      labelText: 'Password:',
      placeholder: 'asdASD321!$',
      name: 'passeard',
      hasHint: true,
      type: 'password',
    });
    passwordValidation.setRules(input2);

    this.container.append(input1.container);
    this.container.append(input2.container);
  }
}

export default LoginPage;

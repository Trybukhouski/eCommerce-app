import Input from '@shared/components/input/input';
import emailValidation from '@shared/validationRules/emailRule';

class LoginPage {
  public container: HTMLDivElement;

  constructor() {
    this.container = document.createElement('div');
    const input = new Input({
      labelText: 'Email:',
      placeholder: 'example.com',
      name: 'email',
      hasHint: true,
      type: 'email',
    });

    this.container.append(input.container);
    emailValidation.setRules(input);
  }
}

export default LoginPage;

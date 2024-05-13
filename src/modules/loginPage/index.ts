import { loginPageUI } from '@modules/loginPage/ui';
import { AuthService } from '@services/AuthService';
import { NotificationService } from '@services/NotificationService';

class LoginPage {
  public elem = loginPageUI.section;

  public uiApi = loginPageUI;

  private emailInput: HTMLInputElement | null = null;

  private passwordInput: HTMLInputElement | null = null;

  constructor() {
    if (document.readyState === 'complete' || document.readyState === 'interactive') {
      this.initialize();
    } else {
      document.addEventListener('DOMContentLoaded', this.initialize.bind(this));
    }
  }

  private initialize(): void {
    this.emailInput = this.elem.querySelector('input[name="email"]');
    this.passwordInput = this.elem.querySelector('input[name="password"]');
    const { form } = this.uiApi;
    if (form) {
      form.addEventListener('submit', this.handleLogin.bind(this));
    }
  }

  private async handleLogin(event: Event): Promise<void> {
    event.preventDefault();
    if (!(this.emailInput && this.passwordInput)) {
      NotificationService.displayError('Email or password input not found');
      return;
    }

    try {
      const data = await AuthService.login(this.emailInput.value, this.passwordInput.value);
      NotificationService.displaySuccess('Logged in successfully!');
      console.log('Authentication successful:', data);
      setTimeout(() => {
        window.location.href = '/main.html';
      }, 2000);
    } catch (error) {
      NotificationService.displayError(error instanceof Error ? error.message : 'Login error');
    }
  }
}

export default LoginPage;

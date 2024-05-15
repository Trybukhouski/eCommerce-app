import { loginPageUI } from './ui';
import { AuthService } from '@services/AuthService';
import { NotificationService } from '@services/NotificationService';

class LoginPage {
  public elem = loginPageUI.section;

  public uiApi = loginPageUI;

  private emailInput: HTMLInputElement | null = null;

  private passwordInput: HTMLInputElement | null = null;

  public submitButton: HTMLButtonElement | null = null;

  constructor() {
    if (document.readyState === 'complete' || document.readyState === 'interactive') {
      setTimeout(this.initialize.bind(this), 0);
    } else {
      document.addEventListener('DOMContentLoaded', this.initialize.bind(this));
    }
  }

  private initialize(): void {
    this.emailInput = this.elem.querySelector('input[name="email"]');
    this.passwordInput = this.elem.querySelector('input[name="password"]');
    const submitButtonElement = this.elem.querySelector('button[type="submit"]');

    if (submitButtonElement instanceof HTMLButtonElement) {
      this.submitButton = submitButtonElement;
      this.submitButton.addEventListener('click', this.handleLogin.bind(this));
      this.submitButton.focus();
    } else {
      // console.error('Submit button not found or is not a button element');
    }

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
      // console.log('Response data:', data);
      if (data.access_token) {
        localStorage.setItem('accessToken', data.access_token);
        NotificationService.displaySuccess('Logged in successfully!');
        // console.log('Authentication successful:', data);

        setTimeout(() => {
          window.location.href = '/main.html';
        }, 2000);
      } else {
        throw new Error('Access Token is missing');
      }
    } catch (error) {
      NotificationService.displayError(error instanceof Error ? error.message : 'Login error');
    }
  }
}

export { LoginPage };

import { handleResponse } from '@shared/utils/errorHandling';
import { loginPageUI } from '@modules/loginPage/ui';
import { clientCredentials } from '../../config';

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

    if (!this.emailInput || !(this.emailInput instanceof HTMLInputElement)) {
      console.error('Email input not found or is not an input element.');
      return;
    }

    if (!this.passwordInput || !(this.passwordInput instanceof HTMLInputElement)) {
      console.error('Password input not found or is not an input element.');
      return;
    }

    const { form } = this.uiApi;
    if (form) {
      form.addEventListener('submit', this.handleLogin.bind(this));
    } else {
      console.error('Form not found.');
    }
  }

  private async handleLogin(event: Event): Promise<void> {
    event.preventDefault();
    if (!(this.emailInput && this.passwordInput)) {
      console.error('Email or password input not found');
      return;
    }

    const url = `${clientCredentials.authUrl}/oauth/ecommerce2024/customers/token`;
    const body = new URLSearchParams({
      grant_type: 'password',
      username: this.emailInput.value,
      password: this.passwordInput.value,
    }).toString();

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Authorization: `Basic ${btoa(
            `${clientCredentials.clientId}:${clientCredentials.clientSecret}`
          )}`,
        },
        body,
      });
      const data = await handleResponse(response);
      console.log('Authentication successful:', data);
      this.showSuccess('Logged in successfully!');
      setTimeout(() => {
        window.location.href = '/main.html';
      }, 2000);
    } catch (error) {
      console.error('Login failed:', error);
      if (error instanceof Error) {
        this.showError(error.message);
      }
    }
  }

  private showError(message: string) {
    this.uiApi.emailError.textContent = message;
    this.uiApi.passwordError.textContent = '';
    this.emailInput!.classList.add('input-error');
    this.passwordInput!.classList.add('input-error');

    setTimeout(() => {
      this.uiApi.emailError.textContent = '';
      this.uiApi.passwordError.textContent = '';
      this.emailInput!.classList.remove('input-error');
      this.passwordInput!.classList.remove('input-error');
    }, 5000);
  }

  private showSuccess(message: string) {
    this.uiApi.successMessage.textContent = message;
    this.uiApi.successMessage.style.display = 'block';
  }
}
export default LoginPage;

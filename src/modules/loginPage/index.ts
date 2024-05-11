import { handleResponse } from '@shared/utils/errorHandling';
import { loginPageUI } from '@modules/loginPage/ui';
import { LoginData } from '@modules/loginPage/interfaces';
import { clientCredentials } from '../../config';

class LoginPage {
  public elem = loginPageUI.section;

  public uiApi = loginPageUI;

  private emailInput: HTMLInputElement | null = null;

  private passwordInput: HTMLInputElement | null = null;

  constructor() {
    document.addEventListener('DOMContentLoaded', () => {
      this.emailInput = this.elem.querySelector('input[name="email"]') as HTMLInputElement;
      this.passwordInput = this.elem.querySelector('input[name="password"]') as HTMLInputElement;
      loginPageUI.form.addEventListener('submit', this.handleLogin.bind(this));
    });
  }

  private async handleLogin(event: Event): Promise<void> {
    event.preventDefault();
    if (!this.emailInput || !this.passwordInput) {
      console.error('Email or password input not found');
      return;
    }
    const loginData: LoginData = {
      email: this.emailInput.value,
      password: this.passwordInput.value,
    };
    const url = `${clientCredentials.authUrl}/oauth/ecommerce2024/customers/token`;
    const body = new URLSearchParams({
      grant_type: 'password',
      username: loginData.email,
      password: loginData.password,
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
      alert('Logged in successfully!');
      window.location.href = '/main.html';
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message);
      } else {
        console.error('Unexpected error', error);
      }
    }
  }
}
export default LoginPage;

import { loginPageUI } from '@modules/loginPage/ui';
import { AuthService } from '@service/AuthService';

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
      console.error('Email or password input not found');
      return;
    }

    try {
      const data = await AuthService.login(this.emailInput.value, this.passwordInput.value);
      console.log('Authentication successful:', data);
      this.showSuccess('Logged in successfully!');
      setTimeout(() => {
        window.location.href = '/main.html';
      }, 2000);
    } catch (error) {
      console.error('Login failed:', error);
      this.showError(error instanceof Error ? error.message : 'Login error');
    }
  }

  private showError(message: string): void {
    this.uiApi.emailError.textContent = message;
    this.emailInput!.classList.add('input-error');
    this.passwordInput!.classList.add('input-error');
    setTimeout(() => {
      this.uiApi.emailError.textContent = '';
      this.emailInput!.classList.remove('input-error');
      this.passwordInput!.classList.remove('input-error');
    }, 5000);
  }

  private showSuccess(message: string): void {
    this.uiApi.successMessage.textContent = message;
    this.uiApi.successMessage.style.display = 'block';
  }
}

export default LoginPage;

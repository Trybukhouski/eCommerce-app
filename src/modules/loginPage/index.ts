import loginPageUI from './ui';

export const clientCredentials = {
  clientId: 'P7AHNZvx7l7ATvqkj10zbEQa',
  clientSecret: 'z7kCZZoMPb5UmBBl_0g70ROn-vEmvGLn',
  scope: 'introspect_oauth_tokens:ecommerce2024 manage_my_profile:ecommerce2024 manage_api_clients:ecommerce2024 manage_customers:ecommerce2024 create_anonymous_token:ecommerce2024',
  apiUrl: 'https://api.us-central1.gcp.commercetools.com',
  authUrl: 'https://auth.us-central1.gcp.commercetools.com'
};

interface LoginData {
  email: string;
  password: string;
}
class LoginPage {
  public elem = loginPageUI.section;
  public uiApi = loginPageUI;

  private emailInput: HTMLInputElement | null = null;
  private passwordInput: HTMLInputElement | null = null;

  constructor() {
    // Назначаем обработчик события загрузки страницы
    document.addEventListener('DOMContentLoaded', () => {
      // Находим поля для ввода email и пароля
      this.emailInput = this.elem.querySelector('input[name="email"]') as HTMLInputElement;
      this.passwordInput = this.elem.querySelector('input[name="password"]') as HTMLInputElement;

      // Назначаем обработчик события отправки формы
      loginPageUI.form.addEventListener('submit', this.handleLogin.bind(this));
    });
  }

  private async handleLogin(event: Event): Promise<void> {
    event.preventDefault();

    // Проверяем, что поля были найдены
    if (!this.emailInput || !this.passwordInput) {
      console.error('Email or password input not found');
      return;
    }

    const loginData: LoginData = {
      email: this.emailInput.value,
      password: this.passwordInput.value
    };

    const url = `${clientCredentials.authUrl}/oauth/ecommerce2024/customers/token`;
    const body = new URLSearchParams({
      'grant_type': 'password',
      'username': loginData.email,
      'password': loginData.password
    }).toString();

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': 'Basic ' + btoa(`${clientCredentials.clientId}:${clientCredentials.clientSecret}`)
        },
        body: body
      });

      if (!response.ok) {
        throw new Error('Authentication failed');
      }

      const data = await response.json();
      console.log('Authentication successful:', data);
      alert('Logged in successfully!');
      window.location.href = '/main.html';
    } catch (error) {
      console.error('Authentication error:', error);
      alert('Failed to login!');
    }

  }}

export default LoginPage;



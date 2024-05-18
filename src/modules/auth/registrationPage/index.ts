import './ui/config';
import { AuthService } from '@services/AuthService';
import { NotificationService } from '@services/NotificationService';
import { Input } from '@shared';
import { registrPageUI } from './ui';

class RegistrPage {
  public elem = registrPageUI.section;

  public uiApi = registrPageUI;

  public submitButton: HTMLButtonElement;

  constructor() {
    if (document.readyState === 'complete' || document.readyState === 'interactive') {
      setTimeout(this.addSubmitListeners.bind(this), 0);
    } else {
      document.addEventListener('DOMContentLoaded', this.addSubmitListeners.bind(this));
    }

    this.submitButton = this.uiApi.submitButton;
  }

  private addSubmitListeners(): void {
    this.submitButton.addEventListener('click', this.handleRegistration.bind(this));
    this.submitButton.focus();

    const { form } = this.uiApi;
    form.addEventListener('submit', this.handleRegistration.bind(this));
  }

  private collectUserData() {
    let isFailed = false;
    const obj = Object.fromEntries(
      [
        'email',
        'first-name',
        'last-name',
        'password',
        'birth-date',
        'delivery-country',
        'delivery-city',
        'delivery-street',
        'delivery-index',
      ].map((key) => {
        const field = this.uiApi.inputElements[key];
        if (field === undefined) {
          isFailed = true;
          NotificationService.displayError('One or more input fields are not found');
          return ['', ''];
        }
        if (field instanceof Input && field.input.validity.valid === false) {
          isFailed = true;
          NotificationService.displayError('Invalid inputs values');
          return ['', ''];
        }
        const value = this.uiApi.getValue(field);
        return [key, value];
      })
    );
    if (isFailed) {
      return undefined;
    }
    return obj;
  }

  private async handleRegistration(event: Event): Promise<void> {
    event.preventDefault();

    const userData = this.collectUserData();
    if (!userData) {
      return;
    }
    const properUserData = {
      email: userData['email']?.toString(),
      firstName: userData['first-name']?.toString(),
      lastName: userData['last-name']?.toString(),
      password: userData['password']?.toString(),
      birthDate: userData['birth-date']?.toString(),
      country: userData['delivery-country']?.toString(),
      city: userData['delivery-city']?.toString(),
      street: userData['delivery-street']?.toString(),
      postalCode: userData['delivery-index']?.toString(),
    };

    try {
      await AuthService.getToken();
      await AuthService.register(properUserData);
      // console.log(userData);
      NotificationService.displaySuccess('Account created successfully!');
    } catch (error) {
      NotificationService.displayError(
        error instanceof Error ? error.message : 'Registration error'
      );
    }
  }
}

export { RegistrPage };

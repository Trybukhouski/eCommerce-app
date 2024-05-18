import './ui/config';
import { AuthService } from '@services/AuthService';
import { NotificationService } from '@services/NotificationService';
import { registrPageUI } from './ui';

class RegistrPage {
  public elem = registrPageUI.section;

  public uiApi = registrPageUI;

  private emailInput: HTMLInputElement | null = null;

  private passwordInput: HTMLInputElement | null = null;

  private firstNameInput: HTMLInputElement | null = null;

  private lastNameInput: HTMLInputElement | null = null;

  private birthDateInput: HTMLInputElement | null = null;

  private countryInput: HTMLSelectElement | null = null;

  private cityInput: HTMLInputElement | null = null;

  private streetInput: HTMLInputElement | null = null;

  private postalCodeInput: HTMLInputElement | null = null;

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
    this.firstNameInput = this.elem.querySelector('input[name="first-name"]');
    this.lastNameInput = this.elem.querySelector('input[name="last-name"]');
    this.birthDateInput = this.elem.querySelector('input[name="birth-date"]');
    this.countryInput = this.elem.querySelector('select[name="country"]');
    this.cityInput = this.elem.querySelector('input[name="city"]');
    this.streetInput = this.elem.querySelector('input[name="street"]');
    this.postalCodeInput = this.elem.querySelector('input[name="index"]');
    const submitButtonElement = this.elem.querySelector('button[type="submit"]');

    if (submitButtonElement instanceof HTMLButtonElement) {
      this.submitButton = submitButtonElement;
      this.submitButton.addEventListener('click', this.handleRegistration.bind(this));
      this.submitButton.focus();
    } else {
      NotificationService.displayError('Submit button not found or is not a button element');
    }

    const { form } = this.uiApi;
    if (form) {
      form.addEventListener('submit', this.handleRegistration.bind(this));
    }
  }

  private areInputsValid(): boolean {
    const inputs = [
      this.emailInput,
      this.passwordInput,
      this.firstNameInput,
      this.lastNameInput,
      this.birthDateInput,
      this.countryInput,
      this.cityInput,
      this.streetInput,
      this.postalCodeInput,
    ];

    return inputs.every((input) => input !== null);
  }

  private collectUserData() {
    return {
      email: this.emailInput!.value,
      firstName: this.firstNameInput!.value,
      lastName: this.lastNameInput!.value,
      password: this.passwordInput!.value,
      birthDate: this.birthDateInput!.value,
      country: this.countryInput!.value,
      city: this.cityInput!.value,
      street: this.streetInput!.value,
      postalCode: this.postalCodeInput!.value,
    };
  }

  private async handleRegistration(event: Event): Promise<void> {
    event.preventDefault();

    if (!this.areInputsValid()) {
      NotificationService.displayError('One or more input fields are not found');
      return;
    }

    const userData = this.collectUserData();

    try {
      await AuthService.getToken();
      await AuthService.register(userData);
      NotificationService.displaySuccess('Account created successfully!');
    } catch (error) {
      NotificationService.displayError(
        error instanceof Error ? error.message : 'Registration error'
      );
    }
  }
}

export { RegistrPage };

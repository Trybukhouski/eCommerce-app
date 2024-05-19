import './ui/config';
import { AuthService } from '@services/AuthService';
import { NotificationService } from '@services/NotificationService';
import { Input } from '@shared';
import { registrPageUI } from './ui';

interface UserData {
  email?: string;
  firstName?: string;
  lastName?: string;
  password?: string;
  birthDate?: string;
  addresses: {
    key?: string;
    country?: string;
    city?: string;
    streetName?: string;
    postalCode?: string;
  }[];
}

type Adress = NonNullable<UserData['addresses']>[number];

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

  private getInputValue(key: string) {
    const field = this.uiApi.inputElements[key];
    if (field === undefined) {
      NotificationService.displayError('One or more input fields are not found');
      return undefined;
    }
    if (field instanceof Input && field.input.validity.valid === false) {
      NotificationService.displayError('Invalid inputs values');
      return undefined;
    }
    const value = this.uiApi.getValue(field);
    return value.toString();
  }

  private collectUserData() {
    const userData: UserData = {
      email: this.getInputValue('email'),
      firstName: this.getInputValue('first-name'),
      lastName: this.getInputValue('last-name'),
      password: this.getInputValue('password'),
      birthDate: this.getInputValue('birth-date'),
      addresses: [
        {
          key: 'delivery',
          country: this.getInputValue('delivery-country'),
          city: this.getInputValue('delivery-city'),
          streetName: this.getInputValue('delivery-street'),
          postalCode: this.getInputValue('delivery-index'),
        },
      ],
    };
    if (this.getInputValue('adress-match') !== 'true') {
      const billsAdress: Adress = {
        key: 'bills',
        country: this.getInputValue('bills-country'),
        city: this.getInputValue('bills-city'),
        streetName: this.getInputValue('bills-street'),
        postalCode: this.getInputValue('bills-index'),
      };
      if (Object.values(billsAdress).some((v) => v === undefined || v === '')) {
        NotificationService.displayError(
          'Some of the fields of the bills address were filled in incorrectly'
        );
        return undefined;
      }
      userData.addresses.push(billsAdress);
    }
    return userData;
  }

  private async handleRegistration(event: Event): Promise<void> {
    event.preventDefault();

    const userData = this.collectUserData();
    if (userData === undefined || Object.values(userData).some((v) => v === undefined)) {
      return;
    }
    this.uiApi.toggleButtonDisabled();
    try {
      await AuthService.getToken();
      const response = await AuthService.register(userData);
      console.log(response);
      NotificationService.displaySuccess('Account created successfully!');
      this.uiApi.toggleButtonDisabled();
    } catch (error) {
      NotificationService.displayError(
        error instanceof Error ? error.message : 'Registration error'
      );
      this.uiApi.toggleButtonDisabled();
    }
  }
}

export { RegistrPage };

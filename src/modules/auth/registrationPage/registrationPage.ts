import {
  NotificationService,
  AuthService,
  RegistrationResponse,
  Address,
  AddressAction,
  UserData,
} from '@services';
import { Input, Form } from '@shared';
import { registrPageUI } from './ui';

interface CreateActionsObjectsOptions extends Address {
  dontCheckDefault?: 'true' | 'false';
}

class RegistrPage {
  public elem = registrPageUI.section;

  public uiApi = registrPageUI;

  public submitButton: HTMLButtonElement;

  private readonly addressKeysObj = {
    delivery: {
      prefix: 'delivery-',
      defaultActionName: 'setDefaultShippingAddress',
      setIdActionName: 'addShippingAddressId',
    },
    bills: {
      prefix: 'bills-',
      defaultActionName: 'setDefaultBillingAddress',
      setIdActionName: 'addBillingAddressId',
    },
  };

  constructor() {
    if (document.readyState === 'complete' || document.readyState === 'interactive') {
      setTimeout(this.addSubmitListeners.bind(this), 0);
    } else {
      document.addEventListener('DOMContentLoaded', this.addSubmitListeners.bind(this));
    }

    this.submitButton = this.uiApi.submitButton;

    this.uiApi.addLinkToOppositePage({
      linkText: 'Log in',
      textBeforeLink: `Do you already have a page? `,
      textAfterLink: ` here!`,
    });
    this.uiApi.setLinkHref('#login');
  }

  private redirectToMain(): void {
    window.location.hash = '#main';
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
    if (this.getInputValue('address-match') !== 'true') {
      const billsAddress: Address = {
        key: 'bills',
        country: this.getInputValue('bills-country'),
        city: this.getInputValue('bills-city'),
        streetName: this.getInputValue('bills-street'),
        postalCode: this.getInputValue('bills-index'),
      };
      if (Object.values(billsAddress).some((v) => v === undefined || v === '')) {
        NotificationService.displayError(
          'Some of the fields of the bills address were filled in incorrectly'
        );
        return undefined;
      }
      userData.addresses.push(billsAddress);
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
      await this.setAddressesAndBirthday(response, userData.birthDate);
      NotificationService.displaySuccess('Account created successfully!');
      this.elem.dispatchEvent(
        new CustomEvent('logined', {
          bubbles: true,
          detail: {
            logined: true,
          },
        })
      );
      this.redirectToMain();
      this.uiApi.toggleButtonDisabled();
    } catch (error) {
      NotificationService.displayError(
        error instanceof Error ? error.message : 'Registration error'
      );
      this.uiApi.toggleButtonDisabled();
    }
  }

  private createActionsObjects(a: CreateActionsObjectsOptions) {
    let config: typeof this.addressKeysObj.delivery;
    if (a.key === 'delivery') {
      config = this.addressKeysObj.delivery;
    } else {
      config = this.addressKeysObj.bills;
    }

    let isDefault: string | undefined;
    if (a.dontCheckDefault === 'true') {
      isDefault = 'true';
    } else {
      isDefault = this.getInputValue(`${config.prefix}default`);
    }

    return [
      isDefault,
      {
        action: config.setIdActionName,
        addressId: a.id,
      },
      {
        action: config.defaultActionName,
        addressId: a.id,
      },
    ] as [string | undefined, AddressAction, AddressAction];
  }

  private async setAddressesAndBirthday(response: RegistrationResponse, birthDate?: string) {
    const customerId = response.customer.id;
    const { addresses } = response.customer;
    if (!addresses || !customerId) return;

    if (addresses.length === 1) {
      const billsAddress: CreateActionsObjectsOptions = {};
      Object.assign(billsAddress, addresses[0] as Address, {
        key: 'bills',
        dontCheckDefault: this.getInputValue('delivery-default'),
      });
      addresses.push(billsAddress);
    }

    const actionsArr: AddressAction[] = [];
    addresses.forEach((a) => {
      const actions: AddressAction[] = [];

      const [isDefault, addAddressIdAction, setDefaultAddressAction] = this.createActionsObjects(a);
      if (!isDefault) return;

      actions.push(addAddressIdAction);
      if (isDefault === 'true') {
        actions.push(setDefaultAddressAction);
      }
      actionsArr.push(...actions);
    });
    if (birthDate) {
      actionsArr.push({ action: 'setDateOfBirth', dateOfBirth: Form.rotateBirthDate(birthDate) });
    }

    try {
      AuthService.sendAddressAndBirthdayActions(customerId, actionsArr);
    } catch (error) {
      NotificationService.displayError(
        error instanceof Error ? error.message : 'Error fetching customer version'
      );
    }
  }
}

export { RegistrPage };

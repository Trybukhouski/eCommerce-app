import './ui/config';
import { NotificationService, AuthService, RegistrationResponse } from '@services';
import { Input } from '@shared';
import { Address, AddressAction } from '@root/services/interfaces';
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
      const billsAdress: Address = {
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
      this.setAddresses(response);
      NotificationService.displaySuccess('Account created successfully!');
      this.uiApi.toggleButtonDisabled();
    } catch (error) {
      NotificationService.displayError(
        error instanceof Error ? error.message : 'Registration error'
      );
      this.uiApi.toggleButtonDisabled();
    }
  }

  private addressKeysObj = {
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

  private createActionsObjects(a: Address) {
    let config;
    if (a.key === 'delivery') {
      config = this.addressKeysObj.delivery;
    } else {
      config = this.addressKeysObj.bills;
    }

    const isDeafault = this.getInputValue(`${config.prefix}default`);

    return [
      isDeafault,
      {
        action: config.setIdActionName,
        addressKey: a.key,
      },
      {
        action: config.defaultActionName,
        addressKey: a.key,
      },
    ] as [string | undefined, AddressAction, AddressAction];
  }

  private setAddresses(response: RegistrationResponse) {
    const customerId = response.customer.id;
    const { addresses } = response.customer;
    if (!addresses || !customerId) {
      return;
    }

    if (addresses.length === 1) {
      const billsAdress: Address = {};
      Object.assign(billsAdress, addresses[0] as Address, { key: 'bills' });
      addresses.push(billsAdress);
    }

    addresses.forEach(async (a) => {
      const actions: AddressAction[] = [];

      const [isDeafault, addAddressIdAction, setdefaultAddressAction] = this.createActionsObjects(
        a
      );
      if (!isDeafault) {
        return;
      }

      actions.push(addAddressIdAction);
      if (isDeafault === 'true') {
        actions.push(setdefaultAddressAction);
      }

      /* const r = */ await AuthService.sendAddressActions(customerId, actions);
      // console.log(r);
    });
  }
}

export { RegistrPage };

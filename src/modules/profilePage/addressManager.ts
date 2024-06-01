import { Form, FormInputs } from '@shared';
import { Customer } from '@services';
import { ProfilePageUI } from './ui';
import { fillingFieldsSettingsObject } from './config';
import { ProfileService } from './services';

type ChangedInputsWithValues = (readonly [FormInputs, string | boolean])[];

type AddressKeys = typeof ProfilePageUI.formTypes[2] | typeof ProfilePageUI.formTypes[3];

interface AddressAction {
  [key: string]: string | boolean | null;
  action: string;
}

class AddressManager {
  private fillingFieldsSettingsObject = fillingFieldsSettingsObject;

  private addressIdAttribute = 'data-address-id';

  private uiApi: ProfilePageUI;

  constructor(uiApi: ProfilePageUI) {
    this.uiApi = uiApi;
  }

  public getAddressId(formKey: AddressKeys) {
    return this.uiApi.forms[formKey].form.form.getAttribute(this.addressIdAttribute);
  }

  public async chooseAddOrUpdateAddress(
    formKey: AddressKeys,
    changed: ChangedInputsWithValues
  ): Promise<() => void> {
    const { formTypes } = ProfilePageUI;
    const secondKey = formKey === formTypes[2] ? formTypes[3] : formTypes[2];
    const [firstId, secondId] = [formKey, secondKey].map((k) => this.getAddressId(k));
    const isIdMatch = firstId === secondId;
    const input = this.uiApi.getFormInputByName(formKey, 'address-match');
    const useAlsoValue = input ? this.uiApi.getInputValue(input) : undefined;
    if (useAlsoValue === undefined || !input || !firstId || !secondId) {
      return () => {};
    }

    let actions: AddressAction[] | undefined;
    if ((isIdMatch && useAlsoValue) || (!isIdMatch && !useAlsoValue)) {
      actions = this.createChangeAddressAction(formKey, changed);
    } else if (!isIdMatch && useAlsoValue) {
      actions = [
        ...(this.createAddOrRemoveAddressAction({
          formKey: secondKey,
          prevId: secondId,
          nextId: firstId,
        }) ?? []),
        ...(this.createChangeAddressAction(formKey, changed) ?? []),
      ];
    } else if (isIdMatch && !useAlsoValue) {
      const addAction = this.createChangeAddressAction(formKey, changed, true);
      const response = await (addAction ? ProfileService.sendActions(addAction) : undefined);
      actions = this.createAddOrRemoveAddressAction({
        formKey,
        customer: response,
        prevId: secondId,
      });
    }
    if (!actions) {
      return () => {};
    }
    return ProfileService.sendActions.bind(null, actions);
  }

  public createAddOrRemoveAddressAction(options: {
    formKey: AddressKeys;
    customer?: Customer;
    prevId?: string | null;
    nextId?: string | null;
  }): AddressAction[] | undefined {
    const addresses = options.customer ? options.customer.addresses : undefined;
    let id = options.nextId ? options.nextId : undefined;
    if (!id) {
      id = addresses ? addresses[addresses.length - 1]?.id : undefined;
    }
    if (!id || !options.prevId) {
      return undefined;
    }

    let addAddressAction: string;
    let removeAddressAction: string;
    if (options.formKey === ProfilePageUI.formTypes[2]) {
      addAddressAction = 'addShippingAddressId';
      removeAddressAction = 'removeShippingAddressId';
    } else {
      addAddressAction = 'addBillingAddressId';
      removeAddressAction = 'removeBillingAddressId';
    }
    return [
      {
        action: addAddressAction,
        addressId: id,
      },
      {
        action: removeAddressAction,
        addressId: options.prevId,
      },
    ];
  }

  public createChangeAddressAction(
    formKey: AddressKeys,
    changed: ChangedInputsWithValues,
    isAdd = false
  ): AddressAction[] | undefined {
    const settings = this.fillingFieldsSettingsObject[formKey].fields;
    const addressKeys: {
      [key: string]: string;
    }[] = [];
    settings.forEach((s) => {
      const input = this.uiApi.getFormInputByName(formKey, s.inputName);
      const value = input ? this.uiApi.getInputValue(input) : undefined;
      if (!input || !value) {
        addressKeys.push({ [s.dataKey]: '' });
      } else {
        addressKeys.push({ [s.dataKey]: `${value}` });
      }
    });
    const address = Object.assign({}, ...addressKeys);
    const addressId = this.uiApi.forms[formKey].form.form.getAttribute(this.addressIdAttribute);
    if (addressId === null) return undefined;
    const actionsArr: AddressAction[] = [
      {
        action: isAdd ? 'addAddress' : 'changeAddress',
        addressId: `${addressId}`,
        address,
      },
    ];
    if (isAdd && actionsArr[0]) {
      delete actionsArr[0]['addressId'];
    }
    const defaultAction = this.createDefaultAddressAction(formKey, changed, addressId);
    if (defaultAction) {
      actionsArr.push(defaultAction);
    }
    return actionsArr;
  }

  public createDefaultAddressAction(
    formKey: AddressKeys,
    changed: ChangedInputsWithValues,
    addressId: string
  ): AddressAction | undefined {
    const checkboxSettings = this.fillingFieldsSettingsObject[formKey].defaultCheckbox;
    const checkboxInputAndValue = changed.find(
      (pair) => Form.getInputElement(pair[0]).name === checkboxSettings.inputName
    );
    if (!checkboxInputAndValue) {
      return undefined;
    }
    return {
      action: 'setDefaultShippingAddress',
      addressId: checkboxInputAndValue[1] ? addressId : null,
    };
  }
}

export { AddressManager, ChangedInputsWithValues };

import { Form, FormInputs } from '@shared';
import { Customer } from '@services';
import { ProfilePageUI } from './ui';
import { fillingFieldsSettingsObject } from './config';
import { ProfileService, handleResponse } from './services';

type ChangedInputsWithValues = (readonly [FormInputs, string | boolean])[];

type AddressKeys = typeof ProfilePageUI.formTypes[2] | typeof ProfilePageUI.formTypes[3];

interface AddressAction {
  [key: string]: string | boolean | null;
  action: string;
}

class AddressManager {
  public addressIdAttribute = 'data-address-id';

  private fillingFieldsSettingsObject = fillingFieldsSettingsObject;

  private uiApi: ProfilePageUI;

  constructor(uiApi: ProfilePageUI) {
    this.uiApi = uiApi;
  }

  public async chooseAddOrUpdateAddress(
    formKey: AddressKeys,
    changed: ChangedInputsWithValues
  ): Promise<() => void> {
    const { formTypes } = ProfilePageUI;
    const secondKey = formKey === formTypes[2] ? formTypes[3] : formTypes[2];
    const [firstId, secondId] = [formKey, secondKey].map((k) => this.getAddressId(k));
    const isIdMatch = firstId === secondId;
    const useAlsoValue = this.uiApi.getInputValueByName(formKey, 'address-match');
    if (useAlsoValue === undefined || !firstId || !secondId || typeof useAlsoValue === 'string') {
      return () => {};
    }
    const actions = await this.getActions({
      changed,
      formKey,
      secondKey,
      firstId,
      secondId,
      isIdMatch,
      useAlsoValue,
    });
    if (!actions || actions.length === 0) {
      return () => {};
    }
    return ProfileService.sendActions.bind(null, actions);
  }

  private async getActions(options: {
    changed: ChangedInputsWithValues;
    formKey: AddressKeys;
    secondKey: AddressKeys;
    firstId: string;
    secondId: string;
    isIdMatch: boolean;
    useAlsoValue: string | boolean;
  }) {
    const { changed, formKey, firstId, secondId, isIdMatch, useAlsoValue, secondKey } = options;
    let actions: AddressAction[] | undefined;
    if ((isIdMatch && useAlsoValue) || (!isIdMatch && !useAlsoValue)) {
      actions = this.createChangeAddressAction(formKey, changed);
    } else if (!isIdMatch && useAlsoValue) {
      actions = [
        ...(this.createAddAndRemoveAddressAction({
          formKey: secondKey,
          prevId: secondId,
          nextId: firstId,
        }) ?? []),
        ...(this.createChangeAddressAction(formKey, changed) ?? []),
      ];
    } else if (isIdMatch && !useAlsoValue) {
      const addAction = this.createChangeAddressAction(formKey, changed, true);
      if (addAction) {
        const response = await handleResponse(ProfileService.sendActions(addAction));
        actions = response
          ? this.createAddAndRemoveAddressAction({
              formKey,
              customer: response,
              prevId: secondId,
            })
          : [];
      }
    }
    return actions;
  }

  private getAddressId(formKey: AddressKeys): string | null {
    return this.uiApi.forms[formKey].form.form.getAttribute(this.addressIdAttribute);
  }

  private createAddAndRemoveAddressAction(options: {
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

  private createChangeAddressAction(
    formKey: AddressKeys,
    changed: ChangedInputsWithValues,
    isAdd = false
  ): AddressAction[] | undefined {
    const settings = this.fillingFieldsSettingsObject[formKey].fields;
    const addressKeys: {
      [key: string]: string;
    }[] = [];
    settings.forEach((s) => {
      const value = this.uiApi.getInputValueByName(formKey, s.inputName);
      if (!value) {
        addressKeys.push({ [s.dataKey]: '' });
      } else {
        addressKeys.push({ [s.dataKey]: `${value}` });
      }
    });
    const address = Object.assign({}, ...addressKeys);
    const addressId = this.getAddressId(formKey);
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

  private createDefaultAddressAction(
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

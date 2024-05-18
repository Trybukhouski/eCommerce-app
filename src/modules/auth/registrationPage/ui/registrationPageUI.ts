import { FormPageUI, FormPageOptions } from '@modules/auth/shared';
import { Input, FormInputs } from '@shared';
import * as style from './style.module.scss';

class RegistrationPageUI extends FormPageUI {
  public invisibleClass = 'hidden';

  constructor(formOptions: FormPageOptions, headerText: string) {
    super(formOptions, headerText);

    this.insertCheckboxInContainer();
    this.toggleVisibilityBillsAdress();
  }

  private insertCheckboxInContainer() {
    const fieldset = this.subGroups['delivery']?.fieldset;
    const checkboxContainer = document.createElement('div');

    ['delivery-default', 'adress-match'].forEach((s) => {
      const checkbox = this.inputElements[s];
      if (!checkbox) {
        return;
      }
      const element = checkbox.container;
      element.remove();
      checkboxContainer.append(element);
    });
    fieldset?.append(checkboxContainer);

    checkboxContainer.classList.add(style['checkbox-container']);
  }

  private toggleVisibilityBillsAdress() {
    const checkbox = this.inputElements['adress-match'];
    if (!checkbox || !(checkbox instanceof Input)) {
      return;
    }

    checkbox.input.addEventListener('input', () => {
      const fieldset = this.subGroups['bills']?.fieldset;
      if (!fieldset) return;
      fieldset.classList.add(style.fieldset);

      const className = this.invisibleClass;
      if (fieldset.classList.contains(className)) {
        fieldset.classList.remove(className);
      } else {
        fieldset.classList.add(className);
      }
    });
  }

  public getValue(input: FormInputs) {
    let inputElement;
    if (input instanceof Input) {
      inputElement = input.input;
      if (inputElement.type === 'checkbox') {
        return inputElement.checked;
      }
      return inputElement.value;
    }
    return input.select.value;
  }
}

export { RegistrationPageUI };

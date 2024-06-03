import editIcon from '@assets/sprites/edit/edit-clipboard.svg';
import { Form, Button, FormInputs } from '@shared';
import * as style from './style.module.scss';
import { profilePageOptions, profilePageOptionsKeys } from './config';

type KeyOfProfileForms = typeof profilePageOptionsKeys[number];

class ProfilePageUI {
  static readonly formTypes = profilePageOptionsKeys;

  public section: HTMLElement;

  public elem: HTMLElement;

  public readonly editButtonClassName = 'edit-form';

  public readonly editableClass = 'editable';

  private editButtonProto = this.createEditButtonProto();

  public forms = {
    [ProfilePageUI.formTypes[0]]: {
      form: new Form(profilePageOptions.basic),
      editButton: this.editButtonProto.cloneNode(true),
      legendText: 'Profile information',
    },
    [ProfilePageUI.formTypes[1]]: {
      form: new Form(profilePageOptions.password),
      editButton: this.editButtonProto.cloneNode(true),
      legendText: 'Password',
    },
    [ProfilePageUI.formTypes[2]]: {
      form: new Form(profilePageOptions.delivery),
      editButton: this.editButtonProto.cloneNode(true),
      legendText: 'Delivery address',
    },
    [ProfilePageUI.formTypes[3]]: {
      form: new Form(profilePageOptions.bills),
      editButton: this.editButtonProto.cloneNode(true),
      legendText: 'Bills address',
    },
  };

  constructor() {
    const section = document.createElement('section');
    section.classList.add(style['profile']);
    this.section = section;
    this.elem = section;
    const formElements = ProfilePageUI.formTypes.map((k) => this.forms[k].form.form);
    this.elem.append(...formElements);

    this.setInitialFormsSettings();
    this.addDecorativeElements();
  }

  public toggleDisableEditButton(formkey: KeyOfProfileForms, disable?: boolean): void {
    const button = this.forms[formkey].editButton as HTMLButtonElement;
    console.log(button);
    console.log(button.disabled);
    button.disabled = disable ?? !button.disabled;
  }

  public getInputValueByName(
    formkey: KeyOfProfileForms,
    name: string
  ): string | boolean | undefined {
    const input = this.getFormInputByName(formkey, name);
    return input ? this.getInputValue(input) : undefined;
  }

  public getInputElementByName(
    formkey: KeyOfProfileForms,
    name: string
  ): HTMLInputElement | HTMLSelectElement | undefined {
    const input = this.getFormInputByName(formkey, name);
    return input ? Form.getInputElement(input) : undefined;
  }

  public getFormInputByName(formkey: KeyOfProfileForms, name: string): FormInputs | undefined {
    const form = this.forms[formkey];
    return form.form.inputArr.find((i) => Form.getInputElement(i).name === name);
  }

  public getInputValue(i: FormInputs): string | boolean {
    const inputElement = Form.getInputElement(i);
    if (inputElement.type === 'checkbox' && inputElement instanceof HTMLInputElement) {
      return inputElement.checked;
    }
    return inputElement.value;
  }

  public toggleFormEditing(formkey: KeyOfProfileForms, isDisabled: boolean): void {
    const { form } = this.forms[formkey].form;
    form.classList.toggle(this.editableClass);

    this.changeRequired(formkey, !!isDisabled);
    this.disableFieldset(formkey, !isDisabled);
  }

  private changeRequired(formkey: KeyOfProfileForms, isRequired: boolean): void {
    const form = this.forms[formkey];
    form.form.inputArr.forEach((i) => {
      const elem = Form.getInputElement(i);
      if (elem.type !== 'checkbox') {
        elem.required = isRequired;
      }
    });
  }

  private disableFieldset(formkey: KeyOfProfileForms, isDisabled: boolean): void {
    const form = this.forms[formkey];
    const fieldset = form.form.fieldsetElement;
    if (!fieldset) {
      return;
    }
    fieldset.disabled = isDisabled;
  }

  private addDecorativeElements(): void {
    const heading = document.createElement('h2');
    heading.textContent = 'Profile';
    this.section.prepend(heading);

    ProfilePageUI.formTypes.forEach((key) => {
      const form = this.forms[key];
      const { legendText } = form;
      const fieldset = form.form.fieldsetElement;
      if (!fieldset) {
        return;
      }
      const legend = document.createElement('legend');
      legend.textContent = legendText;
      fieldset.prepend(legend);
    });
  }

  private createEditButtonProto(): HTMLButtonElement {
    const { button } = new Button({
      className: 'edit-icon',
      type: 'button',
      icon: {
        sprite: editIcon,
        towhere: 'start',
      },
    });
    button.classList.add(this.editButtonClassName);
    return button;
  }

  private setInitialFormsSettings(): void {
    (Object.keys(this.forms) as KeyOfProfileForms[]).forEach((k) => {
      this.changeRequired(k, false);
      this.disableFieldset(k, true);

      const form = this.forms[k];
      form.form.form.prepend(form.editButton);
    });
  }
}

export { ProfilePageUI, KeyOfProfileForms as FormTypes };

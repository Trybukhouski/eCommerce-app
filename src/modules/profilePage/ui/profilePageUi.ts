import editIcon from '@assets/sprites/edit/edit-clipboard.svg';
import { Form, Button } from '@shared';
import * as style from './style.module.scss';
import { profilePageOptions } from './config';

type KeyOfProfileForms = keyof typeof profilePageOptions;
const formTypes: KeyOfProfileForms[] = ['basic', 'password', 'delivery', 'bills'];

class ProfilePageUI {
  public section: HTMLElement;

  public elem: HTMLElement;

  public readonly editButtonClassName = 'edit-form';

  public readonly editableClass = 'editable';

  private editButtonProto = this.createEditButtonProto();

  public forms = {
    basic: {
      form: new Form(profilePageOptions.basic),
      editButton: this.editButtonProto.cloneNode(true),
      legendText: 'Profile information',
    },
    password: {
      form: new Form(profilePageOptions.password),
      editButton: this.editButtonProto.cloneNode(true),
      legendText: 'Password',
    },
    delivery: {
      form: new Form(profilePageOptions.delivery),
      editButton: this.editButtonProto.cloneNode(true),
      legendText: 'Delivery address',
    },
    bills: {
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
    const formElements = formTypes.map((k) => this.forms[k].form.form);
    this.elem.append(...formElements);

    this.setInitialFormsSettings();
    this.addDecorativeElements();
  }

  public changeRequired(formkey: KeyOfProfileForms, isRequired: boolean): void {
    const form = this.forms[formkey];
    form.form.inputArr.forEach((i) => {
      const elem = Form.getInputElement(i);
      if (elem.type !== 'checkbox') {
        elem.required = isRequired;
      }
    });
  }

  public disableFieldset(formkey: KeyOfProfileForms, isDisabled: boolean): void {
    const form = this.forms[formkey];
    const fieldset = form.form.fieldsetElement;
    if (!fieldset) {
      return;
    }
    fieldset.disabled = isDisabled;
  }

  public toggleFormEditing(formkey: KeyOfProfileForms): void {
    const { form } = this.forms[formkey].form;
    form.classList.toggle(this.editableClass);
  }

  private addDecorativeElements(): void {
    const heading = document.createElement('h2');
    heading.textContent = 'Profile';
    this.section.prepend(heading);

    formTypes.forEach((key) => {
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

export { ProfilePageUI, formTypes };

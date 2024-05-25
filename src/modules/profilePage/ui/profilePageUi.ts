import './style.scss';
import editIcon from '@assets/sprites/edit/edit-clipboard.svg';
import { Form, Button } from '@shared';
import { profilePageOptions } from './config';

type KeyOfProfileForms = keyof typeof profilePageOptions;
const formTypes: KeyOfProfileForms[] = ['basic', 'password', 'delivery', 'bills'];

class ProfilePageUI {
  public elem: HTMLElement;

  public editButtonClassName = 'edit-form';

  private createEditButtonProto() {
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

  private editButtonProto = this.createEditButtonProto();

  public forms = {
    basic: {
      form: new Form(profilePageOptions.basic),
      editButton: this.editButtonProto.cloneNode(true),
    },
    password: {
      form: new Form(profilePageOptions.password),
      editButton: this.editButtonProto.cloneNode(true),
    },
    delivery: {
      form: new Form(profilePageOptions.delivery),
      editButton: this.editButtonProto.cloneNode(true),
    },
    bills: {
      form: new Form(profilePageOptions.bills),
      editButton: this.editButtonProto.cloneNode(true),
    },
  };

  constructor() {
    const section = document.createElement('section');
    this.elem = section;
    const formElements = formTypes.map((k) => this.forms[k].form.form);
    this.elem.append(...formElements);

    this.setInitialFormsSettings();
  }

  private setInitialFormsSettings(): void {
    (Object.keys(this.forms) as KeyOfProfileForms[]).forEach((k) => {
      this.changeRequired(k, false);
      this.disableFieldset(k, true);

      const form = this.forms[k];
      form.form.form.prepend(form.editButton);
    });
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
    const isEditable = form.classList.contains('editable');
    if (isEditable) {
      form.classList.remove('editable');
    } else {
      form.classList.add('editable');
    }
  }
}

export { ProfilePageUI, formTypes };

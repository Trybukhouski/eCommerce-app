import { Customer } from '@services';
import { Form } from '@shared';
import { ProfilePageUI } from './ui';
import { ProfileService } from './services';

type SettingsInnerFields = {
  fields: {
    inputName: string;
    dataKey: keyof Customer;
  }[];
};
type Settings = Record<typeof ProfilePageUI.prototype.formTypes[number], SettingsInnerFields>;

export class ProfilePage {
  public elem: HTMLElement;

  private uiApi = new ProfilePageUI();

  private serverService = ProfileService;

  private readonly fillingFieldsSettingsObject: Settings = {
    [this.uiApi.formTypes[0]]: {
      fields: [
        {
          inputName: 'first-name',
          dataKey: 'firstName',
        },
        {
          inputName: 'last-name',
          dataKey: 'lastName',
        },
        {
          inputName: 'email',
          dataKey: 'email',
        },
        {
          inputName: 'birth-date',
          dataKey: 'dateOfBirth',
        },
      ],
    },
    [this.uiApi.formTypes[1]]: {
      fields: [],
    },
    [this.uiApi.formTypes[2]]: {
      fields: [],
    },
    [this.uiApi.formTypes[3]]: {
      fields: [],
    },
  };

  constructor() {
    this.elem = this.uiApi.elem;

    this.addEditClickListener();
  }

  private addEditClickListener(): void {
    this.elem.addEventListener('click', (event) => {
      const { target } = event;
      const button = (target as HTMLElement | null)?.closest('button');
      const isEditButton = button?.classList.contains(this.uiApi.editButtonClassName);
      const formEntry = Object.entries(this.uiApi.forms).find(
        (entry) => entry[1].editButton === button
      );
      const formKey = this.uiApi.formTypes.find((k) => (formEntry ? formEntry[0] === k : false));

      if (!target || !button || !isEditButton || !formEntry || !formKey) {
        return;
      }

      const isDisabled = this.uiApi.forms[formKey].form.fieldsetElement?.disabled;
      this.uiApi.changeRequired(formKey, !!isDisabled);
      this.uiApi.disableFieldset(formKey, !isDisabled);
      this.uiApi.toggleFormEditing(formKey);

      this.displayUserData(); // TODO: убрать, когда закончу разработку
    });
  }

  public async displayUserData(): Promise<void> {
    const response = await this.serverService.getCustomer();
    this.addBasicUserData(response);
  }

  private addBasicUserData(data: Customer): void {
    const formKey = this.uiApi.formTypes[0];
    const fieldsSettingsForFilling = this.fillingFieldsSettingsObject[formKey];
    const { fields } = fieldsSettingsForFilling;
    fields.forEach((field) => {
      const input = this.uiApi.getFormInputByName(formKey, field.inputName);
      let value = data[field.dataKey];
      if (!input || !value) {
        return;
      }
      if (field.dataKey === 'dateOfBirth' && typeof value === 'string') {
        value = Form.rotateBirthDate(value);
      }
      Form.getInputElement(input).value = (value ?? '').toString();
    });
  }
}

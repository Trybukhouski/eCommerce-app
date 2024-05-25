import { ProfilePageUI, formTypes } from './ui';

export class ProfilePage {
  public elem: HTMLElement;

  private uiApi: ProfilePageUI;

  constructor() {
    this.uiApi = new ProfilePageUI();
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
      const formKey = formTypes.find((k) => (formEntry ? formEntry[0] === k : false));

      if (!target || !button || !isEditButton || !formEntry || !formKey) {
        return;
      }

      const isDisabled = this.uiApi.forms[formKey].form.fieldsetElement?.disabled;
      this.uiApi.changeRequired(formKey, !!isDisabled);
      this.uiApi.disableFieldset(formKey, !isDisabled);
      this.uiApi.toggleFormEditing(formKey);
    });
  }
}

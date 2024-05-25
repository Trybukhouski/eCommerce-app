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
      if (!target || !button || !isEditButton) {
        return;
      }

      const formEntry = Object.entries(this.uiApi.forms).find(
        (entry) => entry[1].editButton === button
      );
      if (!formEntry) {
        return;
      }
      const formKey = formTypes.find((k) => formEntry[0] === k);
      if (!formKey) {
        return;
      }
      const isDisabled = this.uiApi.forms[formKey].form.fieldsetElement?.disabled;
      this.uiApi.changeRequired(formKey, !!isDisabled);
      this.uiApi.disableFieldset(formKey, !isDisabled);
      this.uiApi.toggleFormEditing(formKey);
    });
  }
}

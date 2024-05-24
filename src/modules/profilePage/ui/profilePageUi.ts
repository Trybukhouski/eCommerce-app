import { FormPageUI } from '@shared';
import { formOptions } from './config';

class ProfilePageUI {
  public elem: HTMLElement;

  constructor() {
    this.elem = new FormPageUI(formOptions, '').section;
  }
}

export { ProfilePageUI };

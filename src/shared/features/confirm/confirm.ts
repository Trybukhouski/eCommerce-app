import * as style from './style.module.scss';

class Confirm {
  public container: HTMLElement;

  constructor(message: string, callback?: (a: boolean) => void) {
    this.container = document.createElement('div');
    const prompt = document.createElement('div');
    const paragraph = document.createElement('p');
    paragraph.textContent = message;
    const ok = document.createElement('button');
    const cancel = document.createElement('button');
    ok.textContent = 'ok';
    cancel.textContent = 'cancel';
    this.container.append(prompt);
    this.container.classList.add(style['confirm']);
    prompt.append(paragraph, ok, cancel);

    const f = (event: Event) => {
      const { target } = event;
      const button = (target as HTMLElement).closest('button');
      if (!target || !button) {
        return;
      }

      if (callback) {
        if (button === ok) {
          callback(true);
        } else if (button === cancel) {
          callback(false);
        }
      }

      this.container.remove();
      prompt.removeEventListener('click', f);
    };

    prompt.addEventListener('click', f);
  }
}

export { Confirm };

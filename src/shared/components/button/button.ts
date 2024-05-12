import * as style from './style.module.scss';
import { defaultButtonOptions, ButtonOptions } from './config';

type location = NonNullable<ButtonOptions['icon']>['towhere']; // "start" | "end"

class Button {
  public button: HTMLButtonElement;

  constructor(options?: ButtonOptions) {
    const configs = { ...defaultButtonOptions, ...options };
    const button = document.createElement('button');
    this.button = button;
    button.textContent = configs.text;
    button.classList.add(style['simple-button']);

    if (configs.disabled) {
      button.disabled = true;
    }

    if (configs.isLink) {
      button.classList.add('link');
      button.setAttribute('data-href', configs.href);
    }

    button.type = configs.type;

    if (configs.icon.sprite) {
      this.addIcon(configs.icon.sprite, configs.icon.towhere);
    }
  }

  private addIcon(sprite: BrowserSpriteSymbol, where: location): void {
    const svg = `
    <svg viewBox="${sprite.viewBox}" width="50" height="50">
      <use xlink:href="#${sprite.id}"/>
    </svg>`;
    this.button.insertAdjacentHTML(where === 'start' ? 'afterbegin' : 'beforeend', svg);
  }
}

export { Button };

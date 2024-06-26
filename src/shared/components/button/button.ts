import * as style from './style.module.scss';
import { defaultButtonOptions, ButtonOptions } from './config';

type Location = NonNullable<ButtonOptions['icon']>['towhere']; // "start" | "end"

class Button {
  public button: HTMLButtonElement;

  constructor(options?: ButtonOptions) {
    const configs = { ...defaultButtonOptions, ...options };
    const button = document.createElement('button');
    this.button = button;
    button.textContent = configs.text;
    this.setClassName(configs.className);

    if (configs.disabled) {
      button.disabled = true;
    }

    if (configs.isLink) {
      button.classList.add('link');
      button.setAttribute('data-href', configs.href);

      if (configs.href !== '') {
        this.addLinkListener();
      }
    }

    button.type = configs.type;

    if (configs.icon.sprite) {
      this.addIcon(configs.icon.sprite, configs.icon.towhere);
    }

    if (configs.customColor) {
      this.button.setAttribute('data-customColor', configs.customColor);
    }
  }

  private addLinkListener(): void {
    this.button.addEventListener('click', () => {
      const hash = this.button.getAttribute('data-href');
      if (hash) {
        window.location.hash = hash;
      }
    });
  }

  private setClassName(className: typeof defaultButtonOptions['className']) {
    this.button.classList.add(style[className]);
  }

  private addIcon(sprite: BrowserSpriteSymbol, where: Location): void {
    const svg = `
    <svg viewBox="${sprite.viewBox}" width="50" height="50">
      <use xlink:href="#${sprite.id}"/>
    </svg>`;
    this.button.insertAdjacentHTML(where === 'start' ? 'afterbegin' : 'beforeend', svg);
  }
}

export { Button };

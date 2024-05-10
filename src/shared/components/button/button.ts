import * as style from './style.module.scss';

type location = NonNullable<ButtonOptions['icon']>['towhere']; // "start" | "end"

class Button {
  public button: HTMLButtonElement;

  constructor({
    text = '',
    type = 'button',
    icon = {
      towhere: 'start',
    },
    disabled = false,
    isLink = false,
    href = '',
  }: ButtonOptions = {}) {
    const button = document.createElement('button');
    this.button = button;
    button.textContent = text;
    button.classList.add(style['simple-button']);

    if (disabled) {
      button.disabled = true;
    }

    if (isLink) {
      button.classList.add('link');
      button.setAttribute('data-href', href);
    }

    button.type = type;

    if (icon.sprite) {
      this.addIcon(icon.sprite, icon.towhere);
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

export default Button;

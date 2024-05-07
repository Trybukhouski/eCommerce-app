import './style.scss';

class Button {
  public button: HTMLButtonElement;

  constructor({
    text = '',
    type = 'button' as 'submit' | 'reset' | 'button',
    icon = {
      sprite: undefined as BrowserSpriteSymbol | undefined,
      towhere: 'start' as 'start' | 'end',
    },
    disabled = false,
    isLink = false,
    href = '',
  } = {}) {
    const button = document.createElement('button');
    this.button = button;
    button.textContent = text;

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

  private addIcon(sprite: BrowserSpriteSymbol, where: 'start' | 'end'): void {
    const svg = `
    <svg viewBox="${sprite.viewBox}" width="50" height="50">
      <use xlink:href="#${sprite.id}"/>
    </svg>`;
    this.button.insertAdjacentHTML(where === 'start' ? 'afterbegin' : 'beforeend', svg);
  }
}

export default Button;

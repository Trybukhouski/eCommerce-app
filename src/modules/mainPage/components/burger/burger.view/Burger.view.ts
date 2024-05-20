import * as styles from './styles.module.scss';

export class BurgerView {
  public root = document.createElement('div');

  public draw(): BurgerView {
    for (let i = 0; i < 3; i += 1) {
      const line = document.createElement('div');
      line.classList.add(styles.line);
      this.root.append(line);
    }
    this.root.classList.add(styles.container);
    this.root.setAttribute('data-opened', 'false');

    this.root.addEventListener('click', () => {
      this.changeStatus();
    });

    return this;
  }

  public changeStatus(): boolean {
    const newStatus = !JSON.parse(this.root.getAttribute('data-opened') as string);
    this.root.setAttribute('data-opened', `${newStatus}`);
    this.root.dispatchEvent(
      new CustomEvent('burger-status', {
        bubbles: true,
        detail: {
          isOpened: newStatus,
        },
      })
    );
    return newStatus;
  }

  public isOpened(): boolean {
    return JSON.parse(this.root.getAttribute('data-opened') as string);
  }
}

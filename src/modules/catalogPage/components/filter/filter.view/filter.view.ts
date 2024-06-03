import * as styles from './styles.module.scss';

export class FilterView {
  public root = document.createElement('div');

  constructor() {
    this.create();
  }

  private create(): void {
    this.root.classList.add(styles.filter);

    const title = document.createElement('h3');
    title.innerHTML = 'Filter';
    title.classList.add(styles.title);

    this.root.append(title);
  }
}

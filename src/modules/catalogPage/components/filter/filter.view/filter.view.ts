import * as styles from './styles.module.scss';

export class FilterView {
  public root = document.createElement('div');

  constructor() {
    this.create();
  }

  private create(): void {
    this.root.classList.add(styles.root);
  }
}

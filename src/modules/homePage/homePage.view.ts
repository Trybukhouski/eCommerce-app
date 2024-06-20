import * as styles from './styles.module.scss';

export class HomePageView {
  public root = document.createElement('section');

  constructor() {
    this.draw();
  }

  private draw(): void {
    this.root.classList.add(styles.root);
    const title = document.createElement('h2');
    title.innerHTML = 'Welcome to our shop!';
    title.classList.add(styles.title);
    const description = document.createElement('p');
    description.innerHTML = `Here you can find beautiful jewelry from world brands!`;
    description.classList.add(styles.description);
    this.root.append(title, description);
  }
}

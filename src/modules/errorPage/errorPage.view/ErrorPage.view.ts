import * as styles from './styles.module.scss';

class ErrorPageView {
  public elements: { backHomeBtn?: HTMLElement; root?: HTMLElement } = {};

  public create(): ErrorPageView {
    const container = document.createElement('div');
    container.classList.add(styles.container);

    const content = document.createElement('div');
    content.classList.add(styles.content);

    const title = document.createElement('h2');
    title.classList.add(styles.title);
    title.innerHTML = 'Page not found';

    const pic = document.createElement('p');
    pic.classList.add(styles.title);
    pic.innerHTML = '¯\\_(ツ)_/¯';

    const backHomeBtn = document.createElement('button');
    backHomeBtn.innerHTML = 'Main Page';
    this.elements.backHomeBtn = backHomeBtn;

    content.append(title);
    content.append(pic);
    content.append(backHomeBtn);
    container.append(content);

    this.elements.root = container;

    return this;
  }
}

export default ErrorPageView;

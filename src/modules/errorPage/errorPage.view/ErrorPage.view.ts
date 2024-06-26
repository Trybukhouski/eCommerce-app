import { Button } from '@shared';
import * as styles from './styles.module.scss';

export class ErrorPageView {
  public elements = {
    backHomeBtn: new Button({ text: 'Main Page' }).button,
    root: document.createElement('div'),
    content: document.createElement('div'),
  };

  public create(): ErrorPageView {
    const { content, backHomeBtn, root } = this.elements;

    root.classList.add(styles.container);
    content.classList.add(styles.content);

    const title = document.createElement('h2');
    title.classList.add(styles.title);
    title.innerHTML = 'Page not found';

    const emojiText = document.createElement('p');
    emojiText.classList.add(styles.title);
    emojiText.innerHTML = '¯\\_(ツ)_/¯';

    content.append(title);
    content.append(emojiText);
    content.append(backHomeBtn);
    root.append(content);

    backHomeBtn.addEventListener('click', () => {
      backHomeBtn.dispatchEvent(
        new CustomEvent('clickOnNav', {
          bubbles: true,
          detail: {
            redirection: 'main',
          },
        })
      );
    });

    return this;
  }
}

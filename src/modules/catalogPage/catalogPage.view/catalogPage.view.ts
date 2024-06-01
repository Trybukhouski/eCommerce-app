export class CatalogPageView {
  public root = document.createElement('section');

  constructor() {
    this.create();
  }

  protected create(): void {
    const card1 = document.createElement('p');
    card1.innerHTML = 'card1';
    card1.setAttribute('id', '1');
    this.root.append(card1);

    const card2 = document.createElement('p');
    card2.innerHTML = 'card2';
    card2.setAttribute('id', '2');
    this.root.append(card2);

    const card3 = document.createElement('p');
    card3.innerHTML = 'card3';
    card3.setAttribute('id', '3');
    this.root.append(card3);

    Array.from(this.root.children).forEach((el) => {
      el.addEventListener('click', () => {
        el.dispatchEvent(
          new CustomEvent('clickOnCard', {
            bubbles: true,
            detail: {
              id: el.getAttribute('id'),
            },
          })
        );
      });
    });
  }
}

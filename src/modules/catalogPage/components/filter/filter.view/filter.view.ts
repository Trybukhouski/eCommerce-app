import * as styles from './styles.module.scss';

export class FilterView {
  public root = document.createElement('div');

  private elements = {
    form: document.createElement('form'),
  };

  constructor() {
    this.draw();
  }

  private draw(): void {
    this.root.classList.add(styles.filter);

    const title = document.createElement('h3');
    title.innerHTML = 'Filter';
    title.classList.add(styles.title);

    this.elements.form.classList.add(styles.form);

    this.root.append(title, this.elements.form);
  }

  public update(attributesData: Map<string, Set<string>>): void {
    const atribute = Array.from(attributesData.keys());
    atribute.forEach((name) => {
      const values = attributesData.get(name);
      if (values) {
        const filterItemLabel = document.createElement('label');
        filterItemLabel.classList.add(styles.filterItemLabel);
        filterItemLabel.innerHTML = name;

        const filterItemcheckboxGroup = document.createElement('div');
        filterItemcheckboxGroup.classList.add(styles.checkboxGroup);

        const attributeValues = Array.from(values.keys());
        attributeValues.forEach((value) => {
          const checkboxLabel = document.createElement('label');
          checkboxLabel.classList.add(styles.checkboxLabel);
          checkboxLabel.innerHTML = value;
          const checkboxInput = document.createElement('input');
          checkboxLabel.prepend(checkboxInput);
          checkboxInput.type = 'checkbox';
          checkboxInput.value = value;
          checkboxInput.name = value;

          filterItemcheckboxGroup.append(checkboxLabel);
        });

        this.elements.form.append(filterItemLabel, filterItemcheckboxGroup);
      }
    });
  }
}

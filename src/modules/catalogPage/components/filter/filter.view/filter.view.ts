import { Button } from '@shared';

import * as styles from './styles.module.scss';

export class FilterView {
  public root = document.createElement('div');

  private elements = {
    form: document.createElement('form'),
    filterButton: new Button({ text: 'Filter' }).button,
    resetButton: new Button({ text: 'Reset' }).button,
  };

  constructor() {
    this.draw();
  }

  private draw(): void {
    const { form, filterButton, resetButton } = this.elements;
    this.root.classList.add(styles.filter);

    const title = document.createElement('h3');
    title.innerHTML = 'Filter';
    title.classList.add(styles.title);

    form.classList.add(styles.form);
    form.append(filterButton, resetButton);

    filterButton.type = 'submit';
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      this.handleSubmit();
    });

    this.root.append(title, form);
  }

  public update(attributesData: Map<string, Set<string>>): void {
    const attributes = Array.from(attributesData.keys());
    attributes.forEach((name) => {
      const values = attributesData.get(name);
      if (values) {
        const filterItemLabel = document.createElement('label');
        filterItemLabel.classList.add(styles.filterItemLabel);
        filterItemLabel.innerHTML = name;

        const filterItemCheckboxGroup = document.createElement('div');
        filterItemCheckboxGroup.classList.add(styles.checkboxGroup);

        values.forEach((value) => {
          const checkboxLabel = document.createElement('label');
          checkboxLabel.classList.add(styles.checkboxLabel);
          checkboxLabel.innerHTML = value;
          const checkboxInput = document.createElement('input');
          checkboxLabel.prepend(checkboxInput);
          checkboxInput.type = 'checkbox';
          checkboxInput.value = value;
          checkboxInput.name = name;
          checkboxInput.id = `${name}-${value}`;

          filterItemCheckboxGroup.appendChild(checkboxLabel);
        });

        this.elements.form.prepend(filterItemLabel, filterItemCheckboxGroup);
      }
    });
  }

  protected handleSubmit(): void {
    const formData = new FormData(this.elements.form);
    const filterConditions: Map<string, Set<string>> = new Map();
    formData.forEach((value, name) => {
      const filterValue = filterConditions.get(name) || new Set();
      filterValue.add(value.toString());
      filterConditions.set(name, filterValue);
    });

    const filterConditionsObject = Object.fromEntries(
      Array.from(filterConditions, ([key, valueSet]) => [key, Array.from(valueSet)])
    );

    this.root.dispatchEvent(
      new CustomEvent('filter', {
        bubbles: true,
        detail: {
          filterConditions: filterConditionsObject,
        },
      })
    );
  }
}

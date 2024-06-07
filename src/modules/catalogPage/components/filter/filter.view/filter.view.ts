import { PriceFilter } from '../../priceFilter/priceFilter';
import * as styles from './styles.module.scss';

export class FilterView {
  public root = document.createElement('div');

  public isActive = false;

  private elements = {
    form: document.createElement('form'),
    priceFilter: new PriceFilter(0, 12000).root,
  };

  constructor() {
    this.draw();
  }

  private draw(): void {
    const { form } = this.elements;
    this.root.classList.add(styles.filter);

    const title = document.createElement('h3');
    title.innerHTML = 'Filter';
    title.classList.add(styles.title);

    form.classList.add(styles.form);

    form.addEventListener('submit', (event) => {
      event.preventDefault();
      this.handleFilterChange();
    });

    this.root.append(title, this.elements.priceFilter, form);
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

          checkboxInput.addEventListener('change', () => this.handleFilterChange());

          const wrapperDiv = document.createElement('div');
          wrapperDiv.appendChild(checkboxLabel);

          filterItemCheckboxGroup.appendChild(wrapperDiv);
        });

        const wrapperDiv = document.createElement('div');
        wrapperDiv.append(filterItemLabel, filterItemCheckboxGroup);

        this.elements.form.prepend(wrapperDiv);
      }
    });
  }

  private handleFilterChange(): void {
    const formData = new FormData(this.elements.form);
    this.isActive = false;

    const filterConditions: Map<string, Set<string>> = new Map();
    formData.forEach((value, name) => {
      const filterValue = filterConditions.get(name) || new Set();
      filterValue.add(value.toString());
      filterConditions.set(name, filterValue);
      if (value.toString() !== '') {
        this.isActive = true;
      }
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

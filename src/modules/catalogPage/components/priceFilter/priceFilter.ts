import * as styles from './styles.module.scss';

export class PriceFilter {
  public root = document.createElement('div');

  private minRangeInput: HTMLInputElement;

  private maxRangeInput: HTMLInputElement;

  private minValueLabel: HTMLLabelElement;

  private maxValueLabel: HTMLLabelElement;

  constructor(minPrice = 0, maxPrice = 1000) {
    this.minRangeInput = this.createRangeInput(minPrice, minPrice, maxPrice);
    this.maxRangeInput = this.createRangeInput(maxPrice, minPrice, maxPrice);
    this.minValueLabel = this.createValueLabel(minPrice);
    this.maxValueLabel = this.createValueLabel(maxPrice);
    this.draw();
    this.addEventListeners();
  }

  private draw(): void {
    this.root.classList.add(styles.priceFilterForm);

    const title = document.createElement('h3');
    title.innerHTML = 'Price';
    title.classList.add(styles.title);

    const form = document.createElement('form');
    form.classList.add(styles.form);
    form.append(this.minValueLabel, this.minRangeInput, this.maxRangeInput, this.maxValueLabel);

    this.root.append(title, form);
  }

  private createValueLabel(value: number): HTMLLabelElement {
    const label = document.createElement('label');
    label.classList.add(styles.valueLabel);
    label.innerHTML = value.toString();
    return label;
  }

  private createRangeInput(value: number, min: number, max: number): HTMLInputElement {
    const input = document.createElement('input');
    input.type = 'range';
    input.min = min.toString();
    input.max = max.toString();
    input.value = value.toString();
    input.classList.add(styles.rangeInput);
    return input;
  }

  private addEventListeners(): void {
    this.minRangeInput.addEventListener('input', () => this.handleInputChange());
    this.maxRangeInput.addEventListener('input', () => this.handleInputChange());
  }

  private handleInputChange(): void {
    let minValue = parseFloat(this.minRangeInput.value);
    let maxValue = parseFloat(this.maxRangeInput.value);

    if (minValue > maxValue) {
      const temp = minValue;
      minValue = maxValue;
      maxValue = temp;
    }

    this.minValueLabel.innerHTML = minValue.toString();
    this.maxValueLabel.innerHTML = maxValue.toString();

    this.root.dispatchEvent(
      new CustomEvent('pricefilter', {
        bubbles: true,
        detail: {
          range: {
            minPrice: minValue,
            maxPrice: maxValue,
          },
        },
      })
    );
  }
}

interface Input {
  input: HTMLInputElement;
  label: HTMLLabelElement;
  container: HTMLDivElement;
  hint?: HTMLUListElement;
}

interface Hint {
  text: string;
  callback: (s: string) => boolean;
}

class ValidationRule {
  private minLength: number;

  private pattern: string;

  private titleText: string;

  private hints: Hint[] = [];

  private signedInputs: Input[] = [];

  constructor({ minLength = 0, pattern = '', titleText = '' } = {}) {
    this.minLength = minLength;
    this.pattern = pattern;
    this.titleText = titleText;
  }

  public setRules(input: Input): void {
    this.signedInputs.push(input);
    const inputElem = input.input;
    const hintElem = input.hint;

    if (this.pattern) {
      inputElem.setAttribute('pattern', this.pattern);
    }
    if (this.minLength > 0) {
      inputElem.setAttribute('minLength', this.minLength.toString());
    }
    if (this.titleText) {
      let minLengthStroke = '';
      if (this.minLength > 0) {
        minLengthStroke = `Minimum line length: ${this.minLength}. `;
      }

      const fullTitleText = `${minLengthStroke}${this.titleText}`;
      inputElem.setAttribute('title', fullTitleText);
    }
    if (this.hints.length > 0 && hintElem) {
      this.hints.forEach((h) => {
        const li = document.createElement('li');
        li.textContent = h.text;
        hintElem.append(li);
      });
    }

    inputElem.addEventListener('input', this.checkHint.bind(this));
  }

  private checkHint(e: Event): void {
    const { target } = e;
    if (!target) return;

    const targetInput = target as HTMLInputElement;
    const { value } = targetInput;
    const input = this.signedInputs.find((i) => i.input === targetInput);
    const liArr = input?.hint?.childNodes;
    if (!liArr) return;
    this.hints.forEach((h, i) => {
      const li = liArr[i] as HTMLElement;
      if (h.callback(value)) {
        li.setAttribute('data-correct', 'true');
      } else {
        li.setAttribute('data-correct', 'false');
      }
    });
  }

  public addHints(hints: Hint[]): void {
    this.hints.push(...hints);
  }
}

export { ValidationRule };

interface Input {
  input: HTMLInputElement;
  label: HTMLLabelElement;
  container: HTMLDivElement;
  hint: undefined | HTMLUListElement;
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
      const p = this.pattern;
      inputElem.setAttribute('pattern', p);
    }
    if (this.minLength > 0) {
      const minL = this.minLength;
      inputElem.setAttribute('minLength', minL.toString());
    }
    if (this.titleText) {
      let minLengthStroke = '';
      if (this.minLength > 0) {
        minLengthStroke = `Minimum line length: ${this.minLength}. `;
      }

      const inputTitle = `${minLengthStroke}${this.titleText}`;
      inputElem.setAttribute('title', inputTitle);
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
    if (!target || !(target instanceof HTMLInputElement)) return;

    const targetInput = target;
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

export default ValidationRule;

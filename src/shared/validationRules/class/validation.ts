import { Input } from '@shared';

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

  private hasCustomValidation: boolean;

  constructor({ minLength = 0, pattern = '', titleText = '', hasCustomValidation = false } = {}) {
    this.minLength = minLength;
    this.pattern = pattern;
    this.titleText = titleText;
    this.hasCustomValidation = hasCustomValidation;
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
    let hintHeight = 0;
    if (this.hints.length > 0 && hintElem) {
      this.hints.forEach((h) => {
        const li = document.createElement('li');
        li.textContent = h.text;
        hintHeight += this.countHintHeight(h.text);
        hintElem.append(li);
      });
    }
    input.hintContainer?.setAttribute('style', `--data-height: ${hintHeight}rem`);

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

    let errorMess = '';
    this.hints.forEach((h, i) => {
      const li = liArr[i] as HTMLElement;
      if (h.callback(value)) {
        li.setAttribute('data-correct', 'true');
      } else {
        li.setAttribute('data-correct', 'false');
        errorMess = h.text;
      }
    });
    if (this.hasCustomValidation) {
      input.input.setCustomValidity(errorMess);
    }
  }

  public addHints(hints: Hint[]): void {
    this.hints.push(...hints);
  }

  private countHintHeight(s: string): number {
    const lettersPerStroke = 30; // approximately 30 chars fits into line with a screen width of 320px
    return Math.ceil(s.length / lettersPerStroke);
  }
}

export { ValidationRule };

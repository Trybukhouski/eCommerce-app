import eyeHideSprite from '@assets/sprites/eye/eye-password-hide.svg';
import eyeShowSprite from '@assets/sprites/eye/eye-password-show.svg';
import { Input, InputOptions, addSprite } from '@shared';
import * as style from './style.module.scss';

type TupleOfTwoString = [string, string];
type TupleOfTwoSprites = [BrowserSpriteSymbol, BrowserSpriteSymbol];

const eyeSprites: TupleOfTwoSprites = [eyeShowSprite, eyeHideSprite];
const eyeSpritesIds: TupleOfTwoString = eyeSprites.map((s) => s.id) as TupleOfTwoString;

class PasswordInput extends Input {
  private inputTypes: TupleOfTwoString = ['password', 'text'];

  private eyeElement?: HTMLElement;

  constructor(options: InputOptions) {
    super(options);

    this.addEyeButton();
  }

  private addEyeButton(): void {
    const eyeElement = document.createElement('a');
    eyeElement.classList.add(style.eye);
    this.container.append(eyeElement);
    this.eyeElement = eyeElement;

    eyeSprites.forEach((s) => {
      eyeElement.insertAdjacentHTML('beforeend', addSprite(s, 25, 25));
    });
    eyeElement.classList.add(eyeSpritesIds[0]);

    eyeElement.addEventListener('click', (e: Event) => {
      e.preventDefault();
      this.switchInputType();
      this.switchEyeClass();
    });
  }

  private switchInputType(): void {
    const types = this.inputTypes;

    const { type } = this.input;
    const newType = type === types[0] ? types[1] : types[0];
    this.input.type = newType;
  }

  private switchEyeClass(): void {
    const eye = this.eyeElement;
    if (!eye) return;

    const classes = eyeSpritesIds;

    const currentClass = classes.find((c) => eye.classList.contains(c));
    if (!currentClass) return;
    const newClass = currentClass === classes[0] ? classes[1] : classes[0];
    eye.classList.remove(currentClass);
    eye.classList.add(newClass);
  }
}

export { PasswordInput };

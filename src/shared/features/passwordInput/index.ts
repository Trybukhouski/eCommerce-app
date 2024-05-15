import './style.scss';
import { Input, InputOptions } from '@shared';

type TupleOfTwoString = [string, string];

class PasswordInput extends Input {
  private eyeClasses: TupleOfTwoString = ['invisible', 'visible'];

  private inputTypes: TupleOfTwoString = ['password', 'text'];

  private eyeElement?: HTMLAnchorElement;

  constructor(options: InputOptions) {
    super(options);

    this.addEyeButton();
  }

  private addEyeButton(): void {
    const eye = document.createElement('a');
    eye.classList.add('eye');
    eye.classList.add(this.eyeClasses[0]);
    this.container.append(eye);
    this.eyeElement = eye;

    eye.addEventListener('click', (e: Event) => {
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

    const classes = this.eyeClasses;

    const currentClass = classes.find((c) => eye.classList.contains(c));
    if (!currentClass) return;
    const newClass = currentClass === classes[0] ? classes[1] : classes[0];
    eye.classList.remove(currentClass);
    eye.classList.add(newClass);
  }
}

export { PasswordInput };

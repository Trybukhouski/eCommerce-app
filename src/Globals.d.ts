declare module '*.module.css';
declare module '*.module.scss';

interface BrowserSpriteSymbol {
  readonly id: string;
  readonly viewBox: string;
  readonly content?: string;
  readonly node?: 'object';
}

declare module '*.svg' {
  const content: BrowserSpriteSymbol;
  export default content;
}

declare module '*.png' {
  const value: string;
  export default string;
}

declare module '*.jpg' {
  const value: string;
  export default string;
}

declare module '*.ico' {
  const value: string;
  export default string;
}

declare module '*.module.scss' {
  const classes: { [key: string]: string };
  export default classes;
}

// styles.d.ts
declare module '*.module.scss' {
  const classes: { [key: string]: string };
  export default classes;
}

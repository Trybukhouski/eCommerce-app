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

declare module '*.ico' {
  const value: string;
  export default string;
}

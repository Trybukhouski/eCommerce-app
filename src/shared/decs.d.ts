interface BrowserSpriteSymbol {
  id: string;
  viewBox: string;
  content?: string;
  node?: 'object';
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

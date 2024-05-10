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
declare namespace NodeJS {
  interface ProcessEnv {
    REACT_APP_CLIENT_ID: string;
    REACT_APP_CLIENT_SECRET: string;
    REACT_APP_API_URL: string;
    REACT_APP_AUTH_URL: string;
    REACT_APP_SCOPE: string;
  }
}

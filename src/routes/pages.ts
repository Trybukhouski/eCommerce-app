export const pages = [
  'errorPage',
  'registrationPage',
  'loginPage',
  'profilePage',
  'catalogPage',
  'aboutPage',
  'cardPage',
] as const;

export type Pages = typeof pages[number];

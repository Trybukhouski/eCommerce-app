export const pages = [
  'errorPage',
  'registrationPage',
  'loginPage',
  'profilePage',
  'catalogPage',
  'aboutPage',
] as const;

export type Pages = typeof pages[number];

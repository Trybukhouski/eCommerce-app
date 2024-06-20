export const pages = [
  'errorPage',
  'registrationPage',
  'loginPage',
  'profilePage',
  'catalogPage',
  'aboutPage',
  'cardPage',
  'basketPage',
  'homePage',
] as const;

export type Pages = typeof pages[number];

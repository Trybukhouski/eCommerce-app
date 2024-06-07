import { PagesDataModel } from './interfaces/pagesDataModel';

export const blockedPages = {
  forAuthorisedUsers: ['login', 'registration'],
  forUnAuthorisedUsers: ['profile', 'signOut'],
};

export const pagesData: PagesDataModel = {
  main: {
    name: 'main',
    hash: 'main',
    status: 'available',
    current: true,
    type: 'shop',
    ifBlocked: {
      redirectionPage: 'error',
    },
  },
  catalog: {
    name: 'catalog',
    hash: 'catalog',
    status: 'available',
    current: false,
    type: 'shop',
    ifBlocked: {
      redirectionPage: 'error',
    },
  },
  basket: {
    name: 'basket',
    hash: 'basket',
    status: 'available',
    current: false,
    type: 'shop',
    ifBlocked: {
      redirectionPage: 'error',
    },
  },
  card: {
    name: 'card',
    hash: 'card',
    status: 'available',
    current: false,
    type: 'shop',
    ifBlocked: {
      redirectionPage: 'error',
    },
  },
  about: {
    name: 'about',
    hash: 'about',
    status: 'available',
    current: false,
    type: 'shop',
    ifBlocked: {
      redirectionPage: 'error',
    },
  },
  registration: {
    name: 'registration',
    hash: 'registration',
    status: 'available',
    current: false,
    type: 'account',
    ifBlocked: {
      redirectionPage: 'main',
    },
  },
  login: {
    name: 'login',
    hash: 'login',
    status: 'available',
    current: false,
    type: 'account',
    ifBlocked: {
      redirectionPage: 'main',
    },
  },
  profile: {
    name: 'profile',
    hash: 'profile',
    status: 'available',
    current: false,
    type: 'account',
    ifBlocked: {
      redirectionPage: 'login',
    },
  },
  signOut: {
    name: 'sign out',
    hash: 'signOut',
    status: 'available',
    current: false,
    type: 'account',
    ifBlocked: {
      redirectionPage: 'login',
    },
  },
  error: {
    name: 'error',
    hash: 'error',
    status: 'available',
    current: false,
    type: 'system',
    ifBlocked: {
      redirectionPage: 'main',
    },
  },
};

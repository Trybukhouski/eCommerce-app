import { LoginPage } from './auth';
// import { RegistrPage } from './auth';

const lp = new LoginPage();
document.querySelector('body')?.append(lp.elem);

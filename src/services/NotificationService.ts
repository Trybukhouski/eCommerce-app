import * as style from './style.module.scss';

export class NotificationService {
  static displayMessage(message: string, type: 'success' | 'error' | 'info') {
    const notificationElement = document.createElement('div');
    notificationElement.textContent = message;
    notificationElement.className = `${style.notification} ${style[type]}`;
    document.body.appendChild(notificationElement);

    setTimeout(() => {
      document.body.removeChild(notificationElement);
    }, 5000);
  }

  static displayError(message: string) {
    this.displayMessage(message, 'error');
  }

  static displaySuccess(message: string) {
    this.displayMessage(message, 'success');
  }

  static displayInfo(message: string) {
    this.displayMessage(message, 'info');
  }
}

export class LocalStorageService {
  public static isUserAuthorised(): boolean {
    return !!localStorage.getItem('accessToken');
  }

  public static clearAuthorisedToken(): void {
    localStorage.removeItem('accessToken');
  }

  public static getAuthorisedToken(): string | null {
    return localStorage.getItem('accessToken');
  }

  public static setAuthorisedToken(token: string): void {
    localStorage.setItem('accessToken', token);
  }

  public static clearAnonymousAuthorisedToken(): void {
    localStorage.removeItem('accessAnonymousToken');
  }

  public static getAnonymousAuthorisedToken(): string | null {
    return localStorage.getItem('accessAnonymousToken');
  }

  public static setAnonymousAuthorisedToken(token: string): void {
    localStorage.setItem('accessAnonymousToken', token);
  }
}

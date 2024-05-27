export class LocalStorageService {
  public static setUserId(id: string): void {
    localStorage.setItem('userId', id);
  }

  public static clearUserId(): void {
    localStorage.removeItem('userId');
  }

  public static getUserId(): string | null {
    return localStorage.getItem('userId');
  }

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
}

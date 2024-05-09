class HeaderRouter {
  private routes: Set<string> = new Set(['login', 'registration', 'page1', 'page2', 'page3']);

  public observeHashChange(navigateTo: (hash: string) => void): void {
    window.addEventListener('hashchange', () => {
      const hash = location.hash.slice(1);
      if (this.routes.has(hash)) {
        navigateTo(hash);
      } else {
        navigateTo('error');
      }
    });
  }

  public setHash(hash: string): void {
    location.hash = `#${hash}`;
  }
}

export default HeaderRouter;

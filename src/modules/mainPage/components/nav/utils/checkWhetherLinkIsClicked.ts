export function checkWhetherLinkIsClicked(event: Event): HTMLElement | false {
  const { target } = event;
  let result: HTMLElement | false = false;
  if (target instanceof HTMLElement) {
    if (target.tagName === 'A') {
      result = target;
    } else if (document.getElementById('cart-link')?.contains(target)) {
      result = document.getElementById('cart-link') || false;
    }
  }
  return result;
}

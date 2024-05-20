export function checkWhetherLinkIsClicked(event: Event): HTMLElement | false {
  const { target } = event;
  return target instanceof HTMLElement && target.tagName === 'A' ? target : false;
}

export function handleMenuScroll(section: string): void {
  const element: HTMLElement | null = document.getElementById(section);
  if (element) {
    element.scrollIntoView({
      behavior: 'smooth',
      inline: 'start',
      block: 'start',
    });
  }
}

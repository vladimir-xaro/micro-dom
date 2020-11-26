export default function getEls<THTMLElement extends HTMLElement>(target: Element | Document, ...els: string[] | THTMLElement[]): THTMLElement[] {
  const arr: THTMLElement[] = [];

  for (const el of els) {
    if (typeof el === 'string') {
      const nodes = target.querySelectorAll(el) as unknown as THTMLElement[];
      arr.push(...nodes);
    } else if (el instanceof Element) {
      arr.push(el);
    }
  }

  return arr;
}
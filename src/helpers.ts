export default function getEls(target: Element | Document, ...els: string[] | Element[]): Element[] {
  const arr: Element[] = [];

  for (const el of els) {
    if (typeof el === 'string') {
      const nodes = target.querySelectorAll(el);
      arr.push(...nodes);
    } else if (el instanceof Element) {
      arr.push(el);
    }
  }

  return arr;
}
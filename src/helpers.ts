export default function getEls(...els): Element[] {
  const arr: Element[] = [];

  for (const el of els) {
    if (typeof el === 'string') {
      const nodes = document.querySelectorAll(el);
      arr.push(...nodes);
    } else if (el instanceof Element) {
      arr.push(el);
    }
  }

  return arr;
}
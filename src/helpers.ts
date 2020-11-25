import { I_MicroDOM } from "./types";

export default function getEls<T extends Element>(target: Element | Document, ...els: string[] | T[]): T[] {
  const arr: T[] = [];

  for (const el of els) {
    if (typeof el === 'string') {
      const nodes = target.querySelectorAll(el) as unknown as T[];
      arr.push(...nodes);
    } else if (el instanceof Element) {
      arr.push(el);
    }
  }

  return arr;
}
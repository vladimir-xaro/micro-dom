import { I_MicroDOM } from "./types";

export function getEls(target: Element | Document, ...els: Array<string | Element>): Element[] {
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

export function recursiveAppend<T extends Element = Element>(el: Element, ...content: Array<string | Element> | I_MicroDOM<T>) {
  for (const entity of content) {
    if (Array.isArray(entity)) {
      recursiveAppend(el, ...entity);
    } else {
      el.append(entity);
    }
  }
}
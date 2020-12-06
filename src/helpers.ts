import { I_MicroDOM } from "./types";

export function getEls<T extends Element = Element>(target: Element | Document, ...els: Array<string | Element>): T[] {
  const arr: T[] = [];

  for (const el of els) {
    if (typeof el === 'string') {
      const nodes: NodeListOf<T> = target.querySelectorAll(el);
      arr.push(...nodes);
    } else if (el instanceof Element) {
      arr.push(el as T);
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


export function nextTick(...cbs: Function[]): void {
  const arr = cbs;
  const current = cbs.shift();
  
  current && setTimeout(() => {
    current();

    if (arr.length) {
      this.nextTick(...arr);
    }
  }, 0);

  return this;
}
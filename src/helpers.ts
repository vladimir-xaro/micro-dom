import { I_MicroDOM } from "./types";

export function getEls<T extends Element = Element>(target: Element | Document, ...els: Array<string | T | I_MicroDOM<T>>): T[] {
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

export function recursiveAppend<T extends Element = Element>(el: Element, ...content: Array<string | Element | I_MicroDOM<T>>): void {
  for (const entity of content) {
    if (Array.isArray(entity)) {
      recursiveAppend(el, ...entity);
    } else {
      el.append(entity);
    }
  }
}

function tickHelper(cbs: Array<Function | [ Function, number? ]>, cb: Function, num: number = 0): void {
  setTimeout(() => {
    cb();
    if (cbs.length) {
      nextTick(...cbs);
    }
  }, num)
}

export function nextTick(...cbs: Array<Function | [ Function, number? ]>) {
  const current = cbs.shift();

  if (typeof current === 'function') {
    tickHelper(cbs, current);
  } else if (Array.isArray(current)) {
    tickHelper(cbs, current[0], current[1]);
  }

  return this;
}
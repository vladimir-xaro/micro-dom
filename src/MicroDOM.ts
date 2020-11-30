import { getEls, recursiveAppend } from "./helpers";
import { I_MicroDOM } from "./types";

export default class MicroDOM<T extends Element = Element> extends Array implements I_MicroDOM<T> {
  constructor(...args) {
    super(...args);
  }

  get(...args: Array<string | Element>): I_MicroDOM<T> {
    let newInstance = new MicroDOM;

    if (this.length) {
      for (const el of this) {
        newInstance.push(...getEls(el, ...args));
      }
    } else {
      newInstance.push(...getEls(document, ...args));
    }

    return newInstance;
  }

  create<TagName extends keyof HTMLElementTagNameMap>(...entities: Array<
    TagName |
    {
      tagName?: TagName,
      content?: string | Element | Array<string | Element> | I_MicroDOM<T>
    }
  >): I_MicroDOM<T> {
    let newInstance = new MicroDOM;

    for (const entity of entities) {
      if (typeof entity === 'string') {
        newInstance.push(document.createElement(entity));
      } else if (entity instanceof Object) {
        const el = document.createElement(entity.tagName || 'div');
        if (entity.content) {
          if (Array.isArray(entity.content)) {
            recursiveAppend<T>(el, ...entity.content)
          } else {
            recursiveAppend<T>(el, entity.content)
          }
        }
        newInstance.push(el)
      }
    }

    return newInstance;
  }

  empty(): I_MicroDOM<T> {
    for (const el of this) {
      el.innerHTML = '';
    }

    return this;
  }

  append(...append: Array<string | Element> | I_MicroDOM<T>): I_MicroDOM<T> {
    for (const el of this) {
      recursiveAppend(el, ...append);
    }

    return this;
  }

  addClass(...classes: string[]): I_MicroDOM<T> {
    for (const el of this) {
      el.classList.add(...classes);
    }

    return this;
  }

  removeClass(...classes: string[]): I_MicroDOM<T> {
    for (const el of this) {
      el.classList.remove(...classes);
    }

    return this;
  }

  toggleClass(classname: string): I_MicroDOM<T> {
    for (const el of this) {
      el.classList.toggle(classname);
    }

    return this;
  }

  hasClass(classname: string, reqtForAll: boolean = false): boolean {
    if (reqtForAll) { // The presence of a class for each element of the set
      let number = 0;
      for (const el of this) {
        if ((el as T).classList.contains(classname)) {
          number++;
        }
      }
      return number === this.length;
    } else {          // the presence of a class for at least one element of the set
      for (const el of this) {
        if ((el as T).classList.contains(classname)) {
          return true;
        }
      }
      return false;
    }
  }

  addEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): I_MicroDOM<T> {
    for (const el of this) {
      (el as T).addEventListener(type, listener, options);
    }

    return this;
  }

  removeEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): I_MicroDOM<T> {
    for (const el of this) {
      (el as T).removeEventListener(type, listener, options);
    }

    return this;
  }

  css(obj: object): I_MicroDOM<T> {
    for (const el of this) {
      for (const key in obj) {
        (el as HTMLElement).style[key] = obj[key];
      }
    }

    return this;
  }

  attr(obj: object): I_MicroDOM<T> {
    for (const el of this) {
      for (const key in obj) {
        el.setAttribute(key, obj[key]);
      }
    }

    return this;
  }
}
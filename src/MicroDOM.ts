import { getEls, nextTick, recursiveAppend } from "./helpers";
import { I_MicroDOM } from "./types";

function log(target: Object, key: string, descriptor: TypedPropertyDescriptor<any>) {
  // return {
  //   value(...args: any[]) {
  //     console.log(`[${target.constructor.name}] ${key}()`);
  //     console.log('[d]', target, key, descriptor, args);
  //     // const result = value.value.apply(this, args);
  //     return descriptor.value.apply(target, args);
  //     // return value.value.bind(this);
  //   }
  // }
  
  // descriptor.value = (...args: any[]) => {
  //   console.log(`[${target.constructor.name}] ${key}()`);

  //   // return descriptor.value.apply(target, args);
  //   // descriptor.value.apply(target, args);
  //   // return;
  // }

  return {
    value(...args: any[]): number {
      console.log(`[${target.constructor.name}] ${key}()`);
      // return descriptor.value.apply(target, args);
      let result = descriptor.value.call(target, args);
      console.log(result * 2)
      return 0;
    }
  }
}

function iterateDecorator<T extends Element = Element>(target: I_MicroDOM<T>, key: string, descriptor: TypedPropertyDescriptor<any>) {
  return {
    value(...args: any[]) {
      for (const el of this) {
        descriptor.value.call(target, args);
      }
      return descriptor.value.call(target, args);
    }
  }

  return
}

function iterate<T extends Element = Element>(target: I_MicroDOM, cb: Function) {
  
}

export default class MicroDOM<T extends Element = Element> extends Array<T> implements I_MicroDOM<T> {
  constructor(...args) {
    super(...args);
  }

  @log
  test(a: any): number {
    console.log('[test]');
    return 1;
  }

  get<U extends Element = Element>(...args: Array<string | Element>): I_MicroDOM<U> {
    let newInstance: I_MicroDOM<U> = new MicroDOM<U>();

    if (this.length) {
      for (const el of this) {
        newInstance.push(...getEls<U>(el, ...args));
      }
    } else {
      newInstance.push(...getEls<U>(document, ...args));
    }

    return newInstance;
  }

  create<U extends Element = Element>(...entities: Array<
    string |
    {
      tagName?: string,
      content?: string | Element | Array<string | Element> | I_MicroDOM<T>
    }
  >): I_MicroDOM<U> {
    let newInstance: I_MicroDOM<U> = new MicroDOM<U>();

    for (const entity of entities) {
      if (typeof entity === 'string') {
        newInstance.push(document.createElement(entity) as unknown as U);
      } else if (entity instanceof Object) {
        const el = document.createElement(entity.tagName || 'div') as unknown as U;
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
    // for (const el of this) {
    //   (el as Element).innerHTML = '';
    // }
    this.forEach(el => (el as Element).innerHTML = '');

    return this;
  }

  text(text?: string): I_MicroDOM<T> {
    // for (const el of this) {
    //   el.textContent = text || '';
    // }
    this.forEach(el => el.textContent = text || '');

    return this;
  }

  append(...append: Array<string | Element> | I_MicroDOM<T>): I_MicroDOM<T> {
    // for (const el of this) {
    //   recursiveAppend(el, ...append);
    // }
    this.forEach(el => recursiveAppend(el, ...append));

    return this;
  }

  addClass(...classes: string[]): I_MicroDOM<T> {
    // for (const el of this) {
    //   el.classList.add(...classes);
    // }
    this.forEach(el => el.classList.add(...classes));

    return this;
  }

  removeClass(...classes: string[]): I_MicroDOM<T> {
    // for (const el of this) {
    //   el.classList.remove(...classes);
    // }
    this.forEach(el => el.classList.remove(...classes));

    return this;
  }

  toggleClass(classname: string): I_MicroDOM<T> {
    // for (const el of this) {
    //   el.classList.toggle(classname);
    // }
    this.forEach(el => el.classList.toggle(classname));

    return this;
  }

  hasClass(classname: string, reqtForAll: boolean = false): boolean {
    if (reqtForAll) { // The presence of a class for each element of the set
      let number = 0;
      // for (const el of this) {
      //   if ((el as T).classList.contains(classname)) {
      //     number++;
      //   }
      // }
      this.forEach(el => {
        if ((el as T).classList.contains(classname)) {
          number++;
        }
      })
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
    // for (const el of this) {
    //   el.addEventListener(type, listener, options);
    // }
    this.forEach(el => el.addEventListener(type, listener, options));

    return this;
  }

  removeEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): I_MicroDOM<T> {
    // for (const el of this) {
    //   (el as T).removeEventListener(type, listener, options);
    // }
    this.forEach(el => el.removeEventListener(type, listener, options));

    return this;
  }

  css(obj: object): I_MicroDOM<T> {
    // for (const el of this) {
    //   for (const key in obj) {
    //     (el as unknown as HTMLElement).style[key] = obj[key];
    //   }
    // }
    this.forEach(el => Object.keys(obj).forEach(key => (el as unknown as HTMLElement).style[key] = obj[key]));

    return this;
  }

  attr(obj: object): I_MicroDOM<T> {
    // for (const el of this) {
    //   for (const key in obj) {
    //     el.setAttribute(key, obj[key]);
    //   }
    // }
    this.forEach(el => Object.keys(obj).forEach(key => el.setAttribute(key, obj[key])));

    return this;
  }

  nextTick(...cbs: Function[]): I_MicroDOM<T> {
    nextTick(...cbs);

    return this;
  }
}
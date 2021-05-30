import { getEls, nextTick, recursiveAppend } from "./helpers";
import { I_MicroDOM } from "./types";

export default class MicroDOM<T extends Element = Element> extends Array<T> implements I_MicroDOM<T> {
  constructor(...args) {
    super(...args);
  }


  /**
   * Returns a new instance containing the elements with the passed selectors and elements (or from the document if the current instance is empty)
   */
  get<U extends Element = Element>(...args: Array<string | U | I_MicroDOM<U>>): I_MicroDOM<U> {
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


  /**
   * Returns a new instance with new created elements according to the passed parameters
   */
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


  /**
   * Clears the contents of each element in the set and returns the instance itself
   */
  empty(): I_MicroDOM<T> {
    this.forEach(el => (el as Element).innerHTML = '');

    return this;
  }


  /**
   * Sets the textContent property for each collection item and returns an instance
   */
  text(text?: string): I_MicroDOM<T> {
    this.forEach(el => el.textContent = text || '');

    return this;
  }


  /**
   * Inserts a set of Node objects or DOMString objects after the last child of each array element
   */
  append(...append: Array<string | Element> | I_MicroDOM<T>): I_MicroDOM<T> {
    this.forEach(el => recursiveAppend(el, ...append));

    return this;
  }


  /**
   * Adds a class or classes to all array elements
   */
  addClass(...classes: string[]): I_MicroDOM<T> {
    this.forEach(el => el.classList.add(...classes));

    return this;
  }


  /**
   * Removes a class or classes from all array elements
   */
  removeClass(...classes: string[]): I_MicroDOM<T> {
    this.forEach(el => el.classList.remove(...classes));

    return this;
  }


  /**
   * Adds or removes a class for each element of the array, depending on its presence
   */
  toggleClass(classname: string): I_MicroDOM<T> {
    this.forEach(el => el.classList.toggle(classname));

    return this;
  }


  /**
   * Determine if any of the agreed members are assigned to this class. Or, if you pass "true" as the second argument, then each element (default: reqtForAll = false)
   */
  hasClass(classname: string, reqtForAll: boolean = false): boolean {
    if (reqtForAll) { // The presence of a class for each element of the set
      let number = 0;
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


  /**
   * Calls the "addEventListener" method for each set item
   */
  addEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): I_MicroDOM<T> {
    this.forEach(el => el.addEventListener(type, listener, options));

    return this;
  }


  /**
   * Calls the "removeEventListener" method for each set item
   */
  removeEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): I_MicroDOM<T> {
    this.forEach(el => el.removeEventListener(type, listener, options));

    return this;
  }


  /**
   * Calls dispatchEvent with an event of the specified type for each item in the set
   */
  fireEvent(type: string): I_MicroDOM<T> {
    this.forEach(el => el.dispatchEvent(new Event(type)));

    return this;
  }


  /**
   * Sets the style attribute property passed in the object by key
   */
  css(obj: object): I_MicroDOM<T> {
    this.forEach(el => Object.keys(obj).forEach(key => (el as unknown as HTMLElement).style[key] = obj[key]));

    return this;
  }


  /**
   * Sets the attribute property passed in the object by key
   */
  attr(obj: object): I_MicroDOM<T> {
    this.forEach(el => Object.keys(obj).forEach(key => el.setAttribute(key, obj[key])));

    return this;
  }


  /**
   * Recursively calls each passed function in a new setTimeout(() => {}, 0)
   */
  nextTick(...cbs: Function[]): I_MicroDOM<T> {
    nextTick(...cbs);

    return this;
  }
}
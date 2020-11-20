import { I_MicroDOM } from "./types";

export default class MicroDOM extends Array implements I_MicroDOM {
  constructor(...args) {
    super(...args);
  }

  addClass(...classes: string[]): I_MicroDOM {
    for (const el of this) {
      el.classList.add(...classes);
    }

    return this;
  }

  removeClass(...classes: string[]): I_MicroDOM {
    for (const el of this) {
      el.classList.remove(...classes);
    }

    return this;
  }

  toggleClass(classname: string): I_MicroDOM {
    for (const el of this) {
      el.classList.toggle(classname);
    }

    return this;
  }

  css(obj: object): I_MicroDOM {
    for (const el of this) {
      for (const key in obj) {
        (el as HTMLElement).style[key] = obj[key];
      }
    }

    return this;
  }

  attr(obj: object): I_MicroDOM {
    for (const el of this) {
      for (const key in obj) {
        el.setAttribute(key, obj[key]);
      }
    }

    return this;
  }
}
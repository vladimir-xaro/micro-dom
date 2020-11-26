import getEls from "./helpers";
import { I_MicroDOM } from "./types";

export default class MicroDOM<THTMLElement extends HTMLElement = HTMLElement> extends Array<THTMLElement> implements I_MicroDOM<THTMLElement> {
  constructor(...args) {
    super(...args);
  }

  get(...args: string[] | THTMLElement[]): I_MicroDOM<THTMLElement> {
    let newInstance: I_MicroDOM<THTMLElement> = new MicroDOM<THTMLElement>();

    if (this.length) {
      for (const el of this) {
        newInstance.push(...getEls(el, ...args));
      }
    } else {
      newInstance.push(...getEls(document, ...args));
    }

    return newInstance;
  }

  create(...tagNames: string[]): I_MicroDOM<THTMLElement> {
    for (const tagName of tagNames) {
      this.push(document.createElement(tagName) as unknown as THTMLElement);
    }

    return this;
  }

  append(...append: THTMLElement[] | string[] | I_MicroDOM<THTMLElement>): I_MicroDOM<THTMLElement> {
    for (const el of this) {
      for (const entity of append) {
        if (Array.isArray(entity)) {
          this.append(...entity);
        } else {
          el.append(entity);
        }
      }
    }

    return this;
  }

  addClass(...classes: string[]): I_MicroDOM<THTMLElement> {
    for (const el of this) {
      el.classList.add(...classes);
    }

    return this;
  }

  removeClass(...classes: string[]): I_MicroDOM<THTMLElement> {
    for (const el of this) {
      el.classList.remove(...classes);
    }

    return this;
  }

  toggleClass(classname: string): I_MicroDOM<THTMLElement> {
    for (const el of this) {
      el.classList.toggle(classname);
    }

    return this;
  }

  css(obj: object): I_MicroDOM<THTMLElement> {
    for (const el of this) {
      for (const key in obj) {
        el.style[key] = obj[key];
      }
    }

    return this;
  }

  attr(obj: object): I_MicroDOM<THTMLElement> {
    for (const el of this) {
      for (const key in obj) {
        el.setAttribute(key, obj[key]);
      }
    }

    return this;
  }
}
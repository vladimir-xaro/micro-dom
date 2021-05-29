import { getEls } from "./helpers";
import MicroDOM from "./MicroDOM";
import { I_MicroDOM } from "./types";

export default function _<T extends Element = Element>(...args: Array<string | Element> | I_MicroDOM<T>): I_MicroDOM<T> {
  if (args instanceof MicroDOM) {
    return args;
  }

  return new MicroDOM<T>(...getEls<T>(document, ...args));
}
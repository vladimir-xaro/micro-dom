import getEls from "./helpers";
import MicroDOM from "./MicroDOM";

export default function _(...args) {
  if (args instanceof MicroDOM) {
    return args;
  }

  return new MicroDOM(...getEls(document, ...args));
}
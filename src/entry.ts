import getEls from "./helpers";
import I_MicroDOM from "./MicroDOM";

export default function _(...args) {
  if (args instanceof I_MicroDOM) {
    return args;
  }

  return new I_MicroDOM(...getEls(...args));
}
import getEls from "./helpers";
import I_MicroDOM from "./MicroDOM";

export default function dom(...args) {
  if (args instanceof I_MicroDOM) {
    return args;
  }

  return new I_MicroDOM(...getEls(...args));
}
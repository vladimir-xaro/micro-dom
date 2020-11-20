export interface I_MicroDOM extends Array<Element> {
  addClass(...classes: string[]): I_MicroDOM;
  removeClass(...classes: string[]): I_MicroDOM;
  toggleClass(classname: string): I_MicroDOM;
  css(obj: object): I_MicroDOM;
  attr(obj: object): I_MicroDOM;
}
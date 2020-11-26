export interface I_MicroDOM<THTMLElement extends HTMLElement = HTMLElement> extends Array<THTMLElement> {
  get(...args: string[] | THTMLElement[]): I_MicroDOM<THTMLElement>;                                    // Returns a new instance with new elements from each element in the array (or from the document if the array is empty)
  create(content, tagName: string): I_MicroDOM<THTMLElement>;                                           // Creates a new element and returns an array of the existing element including the new one
  empty(): I_MicroDOM<THTMLElement>;                                                                    // Remove all child nodes of the set of matched elements from the DOM
  append(...append: THTMLElement[] | string[] | I_MicroDOM<THTMLElement>[]): I_MicroDOM<THTMLElement>;  // Inserts a set of Node objects or DOMString objects after the last child of each array element
  addClass(...classes: string[]): I_MicroDOM<THTMLElement>;                                             // Adds a class or classes to all array elements
  removeClass(...classes: string[]): I_MicroDOM<THTMLElement>;                                          // Removes a class or classes from all array elements
  toggleClass(classname: string): I_MicroDOM<THTMLElement>;                                             // Adds or removes a class for each element of the array, depending on its presence
  css(obj: object): I_MicroDOM<THTMLElement>;                                                           // Sets the style attribute property passed in the object by key
  attr(obj: object): I_MicroDOM<THTMLElement>;                                                          // Sets the attribute property passed in the object by key
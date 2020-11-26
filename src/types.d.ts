export interface I_MicroDOM extends Array<Element> {
  get(...args: string[] | Element[]): I_MicroDOM;                   // Returns a new instance with new elements from each element in the array (or from the document if the array is empty)
  create(content, tagName: string): I_MicroDOM;                     // Creates a new element and returns an array of the existing element including the new one
  empty(): I_MicroDOM;                                              // Remove all child nodes of the set of matched elements from the DOM
  append(...append: Element[] | string[] | I_MicroDOM): I_MicroDOM; // Inserts a set of Node objects or DOMString objects after the last child of each array element
  addClass(...classes: string[]): I_MicroDOM;                       // Adds a class or classes to all array elements
  removeClass(...classes: string[]): I_MicroDOM;                    // Removes a class or classes from all array elements
  toggleClass(classname: string): I_MicroDOM;                       // Adds or removes a class for each element of the array, depending on its presence
  css(obj: object): I_MicroDOM;                                     // Sets the style attribute property passed in the object by key
  attr(obj: object): I_MicroDOM;                                    // Sets the attribute property passed in the object by key
}
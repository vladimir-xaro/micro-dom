export interface I_MicroDOM<T extends Element = Element> extends Array<Element> {
  get(...args: string[] | T[]): I_MicroDOM<T>;                      // Returns a new instance with new elements from each element in the array (or from the document if the array is empty)
  create(content, tagName: string): I_MicroDOM<T>;                        // Creates a new element and returns an array of the existing element including the new one
  append(...append: T[] | string[] | I_MicroDOM<T>): I_MicroDOM<T>; // Inserts a set of Node objects or DOMString objects after the last child of each array element
  addClass(...classes: string[]): I_MicroDOM<T>;                          // Adds a class or classes to all array elements
  removeClass(...classes: string[]): I_MicroDOM<T>;                       // Removes a class or classes from all array elements
  toggleClass(classname: string): I_MicroDOM<T>;                          // Adds or removes a class for each element of the array, depending on its presence
  css(obj: object): I_MicroDOM<T>;                                        // Sets the style attribute property passed in the object by key
  attr(obj: object): I_MicroDOM<T>;                                       // Sets the attribute property passed in the object by key
}
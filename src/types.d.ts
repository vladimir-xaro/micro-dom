export interface I_MicroDOM<T extends Element = Element> extends Array<Element> {
  get(...args: string[] | Element[]): I_MicroDOM<T>;                      // Returns a new instance with elements from each element of the current instance (or from the document if the current instance is empty)
  create<TagName extends keyof HTMLElementTagNameMap>(
    ...entities: TagName[] |
    {
      tagName?: TagName,
      content?: Element | Element[] | string | string[] | I_MicroDOM<T>
    }[]): I_MicroDOM<T>                                                   // Creates and returns a new instance with new created items
  empty(): I_MicroDOM<T>;                                                 // Remove all child nodes of the set of matched elements from the DOM
  append(...append: Element[] | string[] | I_MicroDOM<T>): I_MicroDOM<T>; // Inserts a set of Node objects or DOMString objects after the last child of each array element
  addClass(...classes: string[]): I_MicroDOM<T>;                          // Adds a class or classes to all array elements
  removeClass(...classes: string[]): I_MicroDOM<T>;                       // Removes a class or classes from all array elements
  toggleClass(classname: string): I_MicroDOM<T>;                          // Adds or removes a class for each element of the array, depending on its presence
  css(obj: object): I_MicroDOM<T>;                                        // Sets the style attribute property passed in the object by key
  attr(obj: object): I_MicroDOM<T>;                                       // Sets the attribute property passed in the object by key
}
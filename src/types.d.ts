export interface I_MicroDOM<T extends Element = Element> extends Array<T> {
  get<U extends Element = Element>(...args: Array<string | U | I_MicroDOM<U>>): I_MicroDOM<U>;  // Returns a new instance containing the elements with the passed selectors and elements (or from the document if the current instance is empty)
  create<U extends Element = Element>(...entities: Array<
    string |
    {
      tagName?: string,
      content?: string | U | Array<string | U> | I_MicroDOM<U>
    }
  >): I_MicroDOM<U>;                                                                            // Returns a new instance with new created elements according to the passed parameters
  empty(): I_MicroDOM<T>;                                                                       // Clears the contents of each element in the set
  text(text?: string): I_MicroDOM<T>;                                                           // Sets the textContent property for each collection item
  append(...append: Array<string | T> | I_MicroDOM<T>): I_MicroDOM<T>;                          // Inserts a set of Node objects or DOMString objects after the last child of each array element
  addClass(...classes: string[]): I_MicroDOM<T>;                                                // Adds a class or classes to all array elements
  removeClass(...classes: string[]): I_MicroDOM<T>;                                             // Removes a class or classes from all array elements
  toggleClass(classname: string): I_MicroDOM<T>;                                                // Adds or removes a class for each element of the array, depending on its presence
  hasClass(classname: string, reqtForAll?: boolean): boolean;                                   // Determine if any of the agreed members are assigned to this class. Or, if you pass "true" as the second argument, then each element (default: reqtForAll = false)
  addEventListener<K extends keyof HTMLElementEventMap>(
    type:     K,
    listener: EventListenerOrEventListenerObject,
    options?: boolean | AddEventListenerOptions
  ): I_MicroDOM<T>;                                                                             // Calls the "addEventListener" method for each set item
  removeEventListener<K extends keyof HTMLElementEventMap>(
    type:     K,
    listener: EventListenerOrEventListenerObject,
    options?: boolean | EventListenerOptions
  ): I_MicroDOM <T>;                                                                            // Calls the "removeEventListener" method for each set item
  fireEvent(type: string): I_MicroDOM<T>;                                                       // Calls dispatchEvent with an event of the specified type for each item in the set
  css(obj: object): I_MicroDOM<T>;                                                              // Sets the style attribute property passed in the object by key
  attr(obj: object): I_MicroDOM<T>;                                                             // Sets the attribute property passed in the object by key
  nextTick(...cbs: Function[]): I_MicroDOM<T>;                                                  // Recursively calls each passed function in a new setTimeout(() => {}, 0)
}
export default function _<T extends Element = Element>(...args: Array<string | Element> | MicroDOM<T>): MicroDOM<T>;

export class MicroDOM<T extends Element = Element> extends Array<T> {
  get<U extends Element = Element>(...args: Array<string | Element>): MicroDOM<U>;  // Returns a new instance containing the elements with the passed selectors and elements (or from the document if the current instance is empty)
  create<U extends Element = Element>(...entities: Array<
    string |
    {
      tagName?: string,
      content?: string | Element | Array<string | Element> | MicroDOM<T>
    }
  >): MicroDOM<U>                                                                   // Returns a new instance with new created elements according to the passed parameters
  empty(): MicroDOM<T>;                                                             // Clears the contents of each element in the set
  text(text?: string): MicroDOM<T>;                                                 // Sets the textContent property for each collection item
  append(...append: Array<string | Element> | MicroDOM<T>): MicroDOM<T>;            // Inserts a set of Node objects or DOMString objects after the last child of each array element
  addClass(...classes: string[]): MicroDOM<T>;                                      // Adds a class or classes to all array elements
  removeClass(...classes: string[]): MicroDOM<T>;                                   // Removes a class or classes from all array elements
  toggleClass(classname: string): MicroDOM<T>;                                      // Adds or removes a class for each element of the array, depending on its presence
  hasClass(classname: string, reqtForAll?: boolean): boolean;                       // Determine if any of the agreed members are assigned to this class. Or, if you pass "true" as the second argument, then each element (default: reqtForAll = false)
  addEventListener<K extends keyof HTMLElementEventMap>(
    type:     K,
    listener: EventListenerOrEventListenerObject,
    options?: boolean | AddEventListenerOptions
  ): MicroDOM<T>;                                                                   // Calls the "addEventListener" method for each set item
  removeEventListener<K extends keyof HTMLElementEventMap>(
    type:     K,
    listener: EventListenerOrEventListenerObject,
    options?: boolean | EventListenerOptions
  ): MicroDOM <T>;                                                                  // Calls the "removeEventListener" method for each set item
  fireEvent(type: string): MicroDOM<T>;                                             // Calls dispatchEvent with an event of the specified type for each item in the set
  css(obj: object): MicroDOM<T>;                                                    // Sets the style attribute property passed in the object by key
  attr(obj: object): MicroDOM<T>;                                                   // Sets the attribute property passed in the object by key
  nextTick(...cbs: Function[]): MicroDOM<T>;                                        // Recursively calls each passed function in a new setTimeout(() => {}, 0)
}

export function nextTick(...cbs: Function[]): void;
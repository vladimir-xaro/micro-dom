# @xaro/micro-dom

The DOM control micro-library has several functions for manipulating the classes, styles, and attributes of elements. (See all methods below)

Also has all the array functions and actually inherits from it

## Install

```sh
$ npm install @xaro/micro-dom
```

## Usage

```ts
import _ from '@xaro/micro-dom';

const els = _('.test-1', document.querySelector('.test-2'), ...document.querySelectorAll('.test-3') /* ... */);

els.addClass('class-A', 'class-B' /* ... */)
  .removeClass('class-A', 'class-B' /* ... */)
  .toggleClass('class-A')
  .css({
    color: 'red',
    'font-size': '15px',
    backgroundColor: 'blue'
    /* ... */
  })
  .attr({
    'data-test-1': 'test-1',
    'data-test-2': 'test-2',
    /* ... */
  })
  .append('content');
```
###### Other methods description see below in the section Interface

## Additional features

The **nextTick** method for sequential execution of functions through setTimeout with a delay of 0, like Vue's $nextTick, but for an array of functions.
Useful for adding or removing classes when you need to wait for the browser to render, like in the example below:
```ts
import _ from '@xaro/micro-dom';

const els = _('.test');

const cbs = [
  () => els.addClass('class-A'),
  () => els.addClass('class-B')
];

els.nextTick(...cbs);

// Result:
// In setTimeout, the first passed callback function is started, and a new setTimeout for the next function, and so on until all functions are executed
```

## Interface

*types.d.ts*
```ts
export interface I_MicroDOM<T extends Element = Element> extends Array<Element> {
  get(...args: Array<string | Element>): I_MicroDOM<T>;                      // Returns a new instance with elements from each element of the current instance (or from the document if the current instance is empty)
  create<TagName extends keyof HTMLElementTagNameMap>(...entities: Array<
    TagName |
    {
      tagName?: TagName,
      content?: string | Element | Array<string | Element> | I_MicroDOM<T>
    }
  >): I_MicroDOM<T>                                                           // Creates and returns a new instance with new created items
  empty(): I_MicroDOM<T>;                                                     // Remove all child nodes of the set of matched elements from the DOM
  append(...append: Array<string | Element> | I_MicroDOM<T>): I_MicroDOM<T>;  // Inserts a set of Node objects or DOMString objects after the last child of each array element
  addClass(...classes: string[]): I_MicroDOM<T>;                              // Adds a class or classes to all array elements
  removeClass(...classes: string[]): I_MicroDOM<T>;                           // Removes a class or classes from all array elements
  toggleClass(classname: string): I_MicroDOM<T>;                              // Adds or removes a class for each element of the array, depending on its presence
  hasClass(classname: string, reqtForAll?: boolean): boolean;                 // Determine if any of the agreed members are assigned to this class. Or, if you pass "true" as the second argument, then each element (default: reqtForAll = false)
  addEventListener<K extends keyof HTMLElementEventMap>(
    type: K,
    listener: EventListenerOrEventListenerObject,
    options?: boolean | AddEventListenerOptions): I_MicroDOM<T>;              // Calls the "addEventListener" method for each set item
  removeEventListener<K extends keyof HTMLElementEventMap>(
    type: K,
    listener: EventListenerOrEventListenerObject,
    options ?: boolean | EventListenerOptions): I_MicroDOM < T >;             // Calls the "removeEventListener" method for each set item
  css(obj: object): I_MicroDOM<T>;                                            // Sets the style attribute property passed in the object by key
  attr(obj: object): I_MicroDOM<T>;                                           // Sets the attribute property passed in the object by key
  nextTick(...cbs: Function[]): I_MicroDOM<T>;                                // Recursively calls each passed function in a new setTimeout(() => {}, 0)
}
```

## License
[MIT](LICENSE)
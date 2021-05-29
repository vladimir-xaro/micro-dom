[![DeepScan grade](https://deepscan.io/api/teams/11657/projects/14878/branches/287086/badge/grade.svg)](https://deepscan.io/dashboard#view=project&tid=11657&pid=14878&bid=287086)

# @xaro/micro-dom

The DOM control micro-library has several functions for manipulating the classes, styles, and attributes of elements. (See all methods below)

Also has all the array functions and actually inherits from it

## Install

```sh
$ npm install @xaro/micro-dom
```

## Usage

```ts
import _, { I_MicroDOM } from '@xaro/micro-dom';

const els: I_MicroDOM = _('.test-1', document.querySelector('.test-2'), ...document.querySelectorAll('.test-3') /* ... */);

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

Also, you can only import the nextTick function, which returns void, but also not tied to the MicroDOM instance.

```ts
import { nextTick } from '@xaro/micro-dom';

nextTick(() => console.log('I\'m call in setTimeout(cb, 0);'));
```

## Files
### Sources
- src/MicroDOM.ts
  > Main class
- src/entry.ts
  > Entry function: _(...)
- src/helpers.ts
  > nextTick(...cb: Function[]) helper: setTimeout wrap with recursive feature (every next callback run in new timer)

### Bundles
- micro-dom.**es**.js
  > export entry function, MicroDOM class and nextTick helper
- micro-dom.js & micro-dom.**umd**.js
  > export only entry function: _(...);




## Interface

*types.d.ts*
```ts
// Entry function that returns MicroDOM object
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
```

## License
[MIT](LICENSE)
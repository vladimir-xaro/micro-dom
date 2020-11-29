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
    .html('content');
```

## Interface

*types.d.ts*
```ts
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
  hasClaass(classname: string, reqtForAll: boolean): boolean;                 // Determine if any of the agreed members are assigned to this class. Or, if you pass "true" as the second argument, then each element (default: reqtForAll = false)
  css(obj: object): I_MicroDOM<T>;                                        // Sets the style attribute property passed in the object by key
  attr(obj: object): I_MicroDOM<T>;                                       // Sets the attribute property passed in the object by key
}
```

## License
[MIT](LICENSE)
# @xaro/micro-dom

The DOM Control micro-library has several functions for manipulating classes, styles and attributes of elements. Also has all the functions of an array and in fact inherits from it

## Install

```sh
$ npm install @xaro/micro-dom
```

## Usage

```ts
import _ from '@xaro/micro-dom';

const els = dom('.test-1', document.querySelector('.test-2'), ...document.querySelectorAll('.test-3') /* ... */);

 _.addClass('class-A', 'class-B' /* ... */)
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
export interface I_MicroDOM extends Array<Element> {
  get(...args: string[] | Element[]): I_MicroDOM;                   // Returns a new instance with new elements from each element in the array (or from the document if the array is empty)
  create(content, tagName: string): I_MicroDOM;                     // Creates a new element and returns an array of the existing element including the new one
  append(...append: Element[] | string[] | I_MicroDOM): I_MicroDOM; // Inserts a set of Node objects or DOMString objects after the last child of each array element
  addClass(...classes: string[]): I_MicroDOM;                       // Adds a class or classes to all array elements
  removeClass(...classes: string[]): I_MicroDOM;                    // Removes a class or classes from all array elements
  toggleClass(classname: string): I_MicroDOM;                       // Adds or removes a class for each element of the array, depending on its presence
  css(obj: object): I_MicroDOM;                                     // Sets the style attribute property passed in the object by key
  attr(obj: object): I_MicroDOM;                                    // Sets the attribute property passed in the object by key
}
```

## License
[MIT](LICENSE)
# @xaro/micro-dom

The DOM Control micro-library has several functions for manipulating classes, styles and attributes of elements. Also has all the functions of an array and in fact inherits from it

## Install

```sh
$ npm install @xaro/micro-dom
```

## Usage

```ts
import dom from '@xaro/micro-dom';

const els = dom('html', document.querySelector('title'));

 dom.addClass('class-A', 'class-B' /* ... */)
    .removeClass('class-A', 'class-B' /* ... */)
    .toggleClass('class-A')
    .css({
      color: 'red',
      'font-size': '15px',
      /* ... */
    })
    .attr({
      'data-test-1': 'test-1',
      'data-test-2': 'test-2',
      /* ... */
    })
```

## Interface

*types.d.ts*
```ts
export interface I_MicroDOM extends Array<Element> {
  addClass(...classes: string[]): I_MicroDOM;
  removeClass(...classes: string[]): I_MicroDOM;
  toggleClass(classname: string): I_MicroDOM;
  css(obj: object): I_MicroDOM;
  attr(obj: object): I_MicroDOM;
}
```

## License
[MIT](LICENSE)
var MicroDOM;MicroDOM =
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ 867:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => /* binding */ src
});

;// CONCATENATED MODULE: ./src/helpers.ts
function getEls(...els) {
    const arr = [];
    for (const el of els) {
        if (typeof el === 'string') {
            const nodes = document.querySelectorAll(el);
            arr.push(...nodes);
        }
        else if (el instanceof Element) {
            arr.push(el);
        }
    }
    return arr;
}

;// CONCATENATED MODULE: ./src/MicroDOM.ts
class MicroDOM extends Array {
    constructor(...args) {
        super(...args);
    }
    create(content, tagName = 'div') {
        const el = document.createElement(tagName);
        el.innerHTML = content;
        return el;
    }
    addClass(...classes) {
        for (const el of this) {
            el.classList.add(...classes);
        }
        return this;
    }
    removeClass(...classes) {
        for (const el of this) {
            el.classList.remove(...classes);
        }
        return this;
    }
    toggleClass(classname) {
        for (const el of this) {
            el.classList.toggle(classname);
        }
        return this;
    }
    css(obj) {
        for (const el of this) {
            for (const key in obj) {
                el.style[key] = obj[key];
            }
        }
        return this;
    }
    attr(obj) {
        for (const el of this) {
            for (const key in obj) {
                el.setAttribute(key, obj[key]);
            }
        }
        return this;
    }
}

;// CONCATENATED MODULE: ./src/entry.ts


function dom(...args) {
    if (args instanceof MicroDOM) {
        return args;
    }
    return new MicroDOM(...getEls(...args));
}

;// CONCATENATED MODULE: ./src/index.ts

/* harmony default export */ const src = (dom);


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => Object.prototype.hasOwnProperty.call(obj, prop)
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	// module exports must be returned from runtime so entry inlining is disabled
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(867);
/******/ })()
;
//# sourceMappingURL=MicroDOM.js.map
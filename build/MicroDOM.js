(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("MicroDOM", [], factory);
	else if(typeof exports === 'object')
		exports["MicroDOM"] = factory();
	else
		root["MicroDOM"] = factory();
})(self, function() {
return /******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ 867:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => /* binding */ src
});

// UNUSED EXPORTS: MicroDOM, nextTick

;// CONCATENATED MODULE: ./src/helpers.ts
function getEls(target, ...els) {
    const arr = [];
    for (const el of els) {
        if (typeof el === 'string') {
            const nodes = target.querySelectorAll(el);
            arr.push(...nodes);
        }
        else if (el instanceof Element) {
            arr.push(el);
        }
    }
    return arr;
}
function recursiveAppend(el, ...content) {
    for (const entity of content) {
        if (Array.isArray(entity)) {
            recursiveAppend(el, ...entity);
        }
        else {
            el.append(entity);
        }
    }
}
function nextTick(...cbs) {
    const arr = cbs;
    const current = cbs.shift();
    current && setTimeout(() => {
        current();
        if (arr.length) {
            nextTick(...arr);
        }
    }, 0);
    return this;
}

;// CONCATENATED MODULE: ./src/MicroDOM.ts

class MicroDOM extends Array {
    constructor(...args) {
        super(...args);
    }
    get(...args) {
        let newInstance = new MicroDOM();
        if (this.length) {
            for (const el of this) {
                newInstance.push(...getEls(el, ...args));
            }
        }
        else {
            newInstance.push(...getEls(document, ...args));
        }
        return newInstance;
    }
    create(...entities) {
        let newInstance = new MicroDOM();
        for (const entity of entities) {
            if (typeof entity === 'string') {
                newInstance.push(document.createElement(entity));
            }
            else if (entity instanceof Object) {
                const el = document.createElement(entity.tagName || 'div');
                if (entity.content) {
                    if (Array.isArray(entity.content)) {
                        recursiveAppend(el, ...entity.content);
                    }
                    else {
                        recursiveAppend(el, entity.content);
                    }
                }
                newInstance.push(el);
            }
        }
        return newInstance;
    }
    empty() {
        for (const el of this) {
            el.innerHTML = '';
        }
        return this;
    }
    text(text) {
        for (const el of this) {
            el.textContent = text || '';
        }
        return this;
    }
    append(...append) {
        for (const el of this) {
            recursiveAppend(el, ...append);
        }
        return this;
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
    hasClass(classname, reqtForAll = false) {
        if (reqtForAll) { // The presence of a class for each element of the set
            let number = 0;
            for (const el of this) {
                if (el.classList.contains(classname)) {
                    number++;
                }
            }
            return number === this.length;
        }
        else { // the presence of a class for at least one element of the set
            for (const el of this) {
                if (el.classList.contains(classname)) {
                    return true;
                }
            }
            return false;
        }
    }
    addEventListener(type, listener, options) {
        for (const el of this) {
            el.addEventListener(type, listener, options);
        }
        return this;
    }
    removeEventListener(type, listener, options) {
        for (const el of this) {
            el.removeEventListener(type, listener, options);
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
    nextTick(...cbs) {
        nextTick(...cbs);
        return this;
    }
}

;// CONCATENATED MODULE: ./src/entry.ts


function _(...args) {
    if (args instanceof MicroDOM) {
        return args;
    }
    return new MicroDOM(...getEls(document, ...args));
}

;// CONCATENATED MODULE: ./src/index.ts

/* harmony default export */ const src = (_);
// ===





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
/************************************************************************/
/******/ 	// module exports must be returned from runtime so entry inlining is disabled
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(867);
/******/ })()
.default;
});
//# sourceMappingURL=MicroDOM.js.map
function getEls(target, ...els) {
    const arr = [];
    for (const el of els) if ("string" == typeof el) {
        const nodes = target.querySelectorAll(el);
        arr.push(...nodes);
    } else el instanceof Element && arr.push(el);
    return arr;
}

function recursiveAppend(el, ...content) {
    for (const entity of content) Array.isArray(entity) ? recursiveAppend(el, ...entity) : el.append(entity);
}

function tickHelper(cbs, cb, num = 0) {
    setTimeout((() => {
        cb(), cbs.length && nextTick(...cbs);
    }), num);
}

function nextTick(...cbs) {
    const current = cbs.shift();
    return "function" == typeof current ? tickHelper(cbs, current) : Array.isArray(current) && tickHelper(cbs, current[0], current[1]), 
    this;
}

class MicroDOM extends Array {
    constructor(...args) {
        super(...args);
    }
    /**
     * Returns a new instance containing the elements with the passed selectors and elements (or from the document if the current instance is empty)
     */    get(...args) {
        let newInstance = new MicroDOM;
        if (this.length) for (const el of this) newInstance.push(...getEls(el, ...args)); else newInstance.push(...getEls(document, ...args));
        return newInstance;
    }
    /**
     * Returns a new instance with new created elements according to the passed parameters
     */    create(...entities) {
        let newInstance = new MicroDOM;
        for (const entity of entities) if ("string" == typeof entity) newInstance.push(document.createElement(entity)); else if (entity instanceof Object) {
            const el = document.createElement(entity.tagName || "div");
            entity.content && (Array.isArray(entity.content) ? recursiveAppend(el, ...entity.content) : recursiveAppend(el, entity.content)), 
            newInstance.push(el);
        }
        return newInstance;
    }
    /**
     * Clears the contents of each element in the set and returns the instance itself
     */    empty() {
        return this.forEach((el => el.innerHTML = "")), this;
    }
    /**
     * Sets the textContent property for each collection item and returns an instance
     */    text(text) {
        return this.forEach((el => el.textContent = text || "")), this;
    }
    /**
     * Inserts a set of Node objects or DOMString objects after the last child of each array element
     */    append(...append) {
        return this.forEach((el => recursiveAppend(el, ...append))), this;
    }
    /**
     * Adds a class or classes to all array elements
     */    addClass(...classes) {
        return this.forEach((el => el.classList.add(...classes))), this;
    }
    /**
     * Removes a class or classes from all array elements
     */    removeClass(...classes) {
        return this.forEach((el => el.classList.remove(...classes))), this;
    }
    /**
     * Adds or removes a class for each element of the array, depending on its presence
     */    toggleClass(classname) {
        return this.forEach((el => el.classList.toggle(classname))), this;
    }
    /**
     * Determine if any of the agreed members are assigned to this class. Or, if you pass "true" as the second argument, then each element (default: reqtForAll = false)
     */    hasClass(classname, reqtForAll = !1) {
        let newInstance = new MicroDOM;
        if (reqtForAll) // The presence of a class for each element of the set
        return this.forEach((el => {
            el.classList.contains(classname) && newInstance.push(el);
        })), newInstance;
        // the presence of a class for at least one element of the set
        for (const el of this) el.classList.contains(classname) && newInstance.push(el);
        return newInstance;
    }
    /**
     * Calls the "addEventListener" method for each set item
     */    addEventListener(type, listener, options) {
        return this.forEach((el => el.addEventListener(type, listener, options))), this;
    }
    /**
     * Calls the "removeEventListener" method for each set item
     */    removeEventListener(type, listener, options) {
        return this.forEach((el => el.removeEventListener(type, listener, options))), this;
    }
    /**
     * Calls dispatchEvent with an event of the specified type for each item in the set
     */    fireEvent(type) {
        return this.forEach((el => el.dispatchEvent(new Event(type)))), this;
    }
    /**
     * Sets the style attribute property passed in the object by key
     */    css(obj) {
        return this.forEach((el => Object.keys(obj).forEach((key => el.style[key] = obj[key])))), 
        this;
    }
    /**
     * Sets the attribute property passed in the object by key
     */    attr(obj) {
        return this.forEach((el => Object.keys(obj).forEach((key => el.setAttribute(key, obj[key]))))), 
        this;
    }
    /**
     * Recursively calls each passed function in a new setTimeout(() => {}, 0)
     */    nextTick(...cbs) {
        return nextTick(...cbs), this;
    }
}

function _(...args) {
    return args instanceof MicroDOM ? args : new MicroDOM(...getEls(document, ...args));
}

export default _;

export { MicroDOM, nextTick };
//# sourceMappingURL=micro-dom.es.js.map

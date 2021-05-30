function t(t, ...e) {
    const s = [];
    for (const r of e) if ("string" == typeof r) {
        const e = t.querySelectorAll(r);
        s.push(...e);
    } else r instanceof Element && s.push(r);
    return s;
}

function e(t, ...s) {
    for (const r of s) Array.isArray(r) ? e(t, ...r) : t.append(r);
}

function s(...t) {
    const e = t, r = t.shift();
    return r && setTimeout((() => {
        r(), e.length && s(...e);
    }), 0), this;
}

class r extends Array {
    constructor(...t) {
        super(...t);
    }
    /**
     * Returns a new instance containing the elements with the passed selectors and elements (or from the document if the current instance is empty)
     */    get(...e) {
        let s = new r;
        if (this.length) for (const r of this) s.push(...t(r, ...e)); else s.push(...t(document, ...e));
        return s;
    }
    /**
     * Returns a new instance with new created elements according to the passed parameters
     */    create(...t) {
        let s = new r;
        for (const r of t) if ("string" == typeof r) s.push(document.createElement(r)); else if (r instanceof Object) {
            const t = document.createElement(r.tagName || "div");
            r.content && (Array.isArray(r.content) ? e(t, ...r.content) : e(t, r.content)), 
            s.push(t);
        }
        return s;
    }
    /**
     * Clears the contents of each element in the set and returns the instance itself
     */    empty() {
        return this.forEach((t => t.innerHTML = "")), this;
    }
    /**
     * Sets the textContent property for each collection item and returns an instance
     */    text(t) {
        return this.forEach((e => e.textContent = t || "")), this;
    }
    /**
     * Inserts a set of Node objects or DOMString objects after the last child of each array element
     */    append(...t) {
        return this.forEach((s => e(s, ...t))), this;
    }
    /**
     * Adds a class or classes to all array elements
     */    addClass(...t) {
        return this.forEach((e => e.classList.add(...t))), this;
    }
    /**
     * Removes a class or classes from all array elements
     */    removeClass(...t) {
        return this.forEach((e => e.classList.remove(...t))), this;
    }
    /**
     * Adds or removes a class for each element of the array, depending on its presence
     */    toggleClass(t) {
        return this.forEach((e => e.classList.toggle(t))), this;
    }
    /**
     * Determine if any of the agreed members are assigned to this class. Or, if you pass "true" as the second argument, then each element (default: reqtForAll = false)
     */    hasClass(t, e = !1) {
        let s = new r;
        if (e) // The presence of a class for each element of the set
        return this.forEach((e => {
            e.classList.contains(t) && s.push(e);
        })), s;
        // the presence of a class for at least one element of the set
        for (const e of this) e.classList.contains(t) && s.push(e);
        return s;
    }
    /**
     * Calls the "addEventListener" method for each set item
     */    addEventListener(t, e, s) {
        return this.forEach((r => r.addEventListener(t, e, s))), this;
    }
    /**
     * Calls the "removeEventListener" method for each set item
     */    removeEventListener(t, e, s) {
        return this.forEach((r => r.removeEventListener(t, e, s))), this;
    }
    /**
     * Calls dispatchEvent with an event of the specified type for each item in the set
     */    fireEvent(t) {
        return this.forEach((e => e.dispatchEvent(new Event(t)))), this;
    }
    /**
     * Sets the style attribute property passed in the object by key
     */    css(t) {
        return this.forEach((e => Object.keys(t).forEach((s => e.style[s] = t[s])))), this;
    }
    /**
     * Sets the attribute property passed in the object by key
     */    attr(t) {
        return this.forEach((e => Object.keys(t).forEach((s => e.setAttribute(s, t[s]))))), 
        this;
    }
    /**
     * Recursively calls each passed function in a new setTimeout(() => {}, 0)
     */    nextTick(...t) {
        return s(...t), this;
    }
}

function n(...e) {
    return e instanceof r ? e : new r(...t(document, ...e));
}

export default n;

export { r as MicroDOM, s as nextTick };
//# sourceMappingURL=micro-dom.es.js.map

!function(t, e) {
    "object" == typeof exports && "undefined" != typeof module ? module.exports = e() : "function" == typeof define && define.amd ? define(e) : (t = "undefined" != typeof globalThis ? globalThis : t || self).MicroDOM = e();
}(this, (function() {
    "use strict";
    function t(t, ...e) {
        const s = [];
        for (const n of e) if ("string" == typeof n) {
            const e = t.querySelectorAll(n);
            s.push(...e);
        } else n instanceof Element && s.push(n);
        return s;
    }
    function e(t, ...s) {
        for (const n of s) Array.isArray(n) ? e(t, ...n) : t.append(n);
    }
    function s(...t) {
        const e = t, n = t.shift();
        return n && setTimeout((() => {
            n(), e.length && s(...e);
        }), 0), this;
    }
    class n extends Array {
        constructor(...t) {
            super(...t);
        }
        /**
         * Returns a new instance containing the elements with the passed selectors and elements (or from the document if the current instance is empty)
         */        get(...e) {
            let s = new n;
            if (this.length) for (const n of this) s.push(...t(n, ...e)); else s.push(...t(document, ...e));
            return s;
        }
        /**
         * Returns a new instance with new created elements according to the passed parameters
         */        create(...t) {
            let s = new n;
            for (const n of t) if ("string" == typeof n) s.push(document.createElement(n)); else if (n instanceof Object) {
                const t = document.createElement(n.tagName || "div");
                n.content && (Array.isArray(n.content) ? e(t, ...n.content) : e(t, n.content)), 
                s.push(t);
            }
            return s;
        }
        /**
         * Clears the contents of each element in the set and returns the instance itself
         */        empty() {
            return this.forEach((t => t.innerHTML = "")), this;
        }
        /**
         * Sets the textContent property for each collection item and returns an instance
         */        text(t) {
            return this.forEach((e => e.textContent = t || "")), this;
        }
        /**
         * Inserts a set of Node objects or DOMString objects after the last child of each array element
         */        append(...t) {
            return this.forEach((s => e(s, ...t))), this;
        }
        /**
         * Adds a class or classes to all array elements
         */        addClass(...t) {
            return this.forEach((e => e.classList.add(...t))), this;
        }
        /**
         * Removes a class or classes from all array elements
         */        removeClass(...t) {
            return this.forEach((e => e.classList.remove(...t))), this;
        }
        /**
         * Adds or removes a class for each element of the array, depending on its presence
         */        toggleClass(t) {
            return this.forEach((e => e.classList.toggle(t))), this;
        }
        /**
         * Determine if any of the agreed members are assigned to this class. Or, if you pass "true" as the second argument, then each element (default: reqtForAll = false)
         */        hasClass(t, e = !1) {
            if (e) {
                // The presence of a class for each element of the set
                let e = 0;
                return this.forEach((s => {
                    s.classList.contains(t) && e++;
                })), e === this.length;
            }
            // the presence of a class for at least one element of the set
            for (const e of this) if (e.classList.contains(t)) return !0;
            return !1;
        }
        /**
         * Calls the "addEventListener" method for each set item
         */        addEventListener(t, e, s) {
            return this.forEach((n => n.addEventListener(t, e, s))), this;
        }
        /**
         * Calls the "removeEventListener" method for each set item
         */        removeEventListener(t, e, s) {
            return this.forEach((n => n.removeEventListener(t, e, s))), this;
        }
        /**
         * Calls dispatchEvent with an event of the specified type for each item in the set
         */        fireEvent(t) {
            return this.forEach((e => e.dispatchEvent(new Event(t)))), this;
        }
        /**
         * Sets the style attribute property passed in the object by key
         */        css(t) {
            return this.forEach((e => Object.keys(t).forEach((s => e.style[s] = t[s])))), this;
        }
        /**
         * Sets the attribute property passed in the object by key
         */        attr(t) {
            return this.forEach((e => Object.keys(t).forEach((s => e.setAttribute(s, t[s]))))), 
            this;
        }
        /**
         * Recursively calls each passed function in a new setTimeout(() => {}, 0)
         */        nextTick(...t) {
            return s(...t), this;
        }
    }
    return function(...e) {
        return e instanceof n ? e : new n(...t(document, ...e));
    };
}));
//# sourceMappingURL=micro-dom.umd.js.map

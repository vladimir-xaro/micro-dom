!function(t, e) {
    "object" == typeof exports && "undefined" != typeof module ? module.exports = e() : "function" == typeof define && define.amd ? define(e) : (t = "undefined" != typeof globalThis ? globalThis : t || self).MicroDOM = e();
}(this, (function() {
    "use strict";
    function t(t, ...e) {
        const n = [];
        for (const s of e) if ("string" == typeof s) {
            const e = t.querySelectorAll(s);
            n.push(...e);
        } else s instanceof Element && n.push(s);
        return n;
    }
    function e(t, ...n) {
        for (const s of n) Array.isArray(s) ? e(t, ...s) : t.append(s);
    }
    function n(t, e, n = 0) {
        setTimeout((() => {
            e(), t.length && s(...t);
        }), n);
    }
    function s(...t) {
        const e = t.shift();
        return "function" == typeof e ? n(t, e) : Array.isArray(e) && n(t, e[0], e[1]), 
        this;
    }
    class r extends Array {
        constructor(...t) {
            super(...t);
        }
        get(...e) {
            let n = new r;
            if (this.length) for (const s of this) n.push(...t(s, ...e)); else n.push(...t(document, ...e));
            return n;
        }
        create(...t) {
            let n = new r;
            for (const s of t) if ("string" == typeof s) n.push(document.createElement(s)); else if (s instanceof Object) {
                const t = document.createElement(s.tagName || "div");
                s.content && (Array.isArray(s.content) ? e(t, ...s.content) : e(t, s.content)), 
                n.push(t);
            }
            return n;
        }
        empty() {
            return this.forEach((t => t.innerHTML = "")), this;
        }
        text(t) {
            return this.forEach((e => e.textContent = t || "")), this;
        }
        append(...t) {
            return this.forEach((n => e(n, ...t))), this;
        }
        addClass(...t) {
            return this.forEach((e => e.classList.add(...t))), this;
        }
        removeClass(...t) {
            return this.forEach((e => e.classList.remove(...t))), this;
        }
        toggleClass(t) {
            return this.forEach((e => e.classList.toggle(t))), this;
        }
        hasClass(t, e = !1) {
            let n = new r;
            if (e) return this.forEach((e => {
                e.classList.contains(t) && n.push(e);
            })), n;
            for (const e of this) e.classList.contains(t) && n.push(e);
            return n;
        }
        addEventListener(t, e, n) {
            return this.forEach((s => s.addEventListener(t, e, n))), this;
        }
        removeEventListener(t, e, n) {
            return this.forEach((s => s.removeEventListener(t, e, n))), this;
        }
        fireEvent(t) {
            return this.forEach((e => e.dispatchEvent(new Event(t)))), this;
        }
        css(t) {
            return this.forEach((e => Object.keys(t).forEach((n => e.style[n] = t[n])))), this;
        }
        attr(t) {
            return this.forEach((e => Object.keys(t).forEach((n => e.setAttribute(n, t[n]))))), 
            this;
        }
        nextTick(...t) {
            return s(...t), this;
        }
    }
    return function(...e) {
        return e instanceof r ? e : new r(...t(document, ...e));
    };
}));
//# sourceMappingURL=micro-dom.umd.js.map

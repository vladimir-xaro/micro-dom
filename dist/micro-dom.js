var MicroDOM = function() {
    "use strict";
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
    function s(t, e, s = 0) {
        setTimeout((() => {
            e(), t.length && r(...t);
        }), s);
    }
    function r(...t) {
        const e = t.shift();
        return "function" == typeof e ? s(t, e) : Array.isArray(e) && s(t, e[0], e[1]), 
        this;
    }
    class n extends Array {
        constructor(...t) {
            super(...t);
        }
        get(...e) {
            let s = new n;
            if (this.length) for (const r of this) s.push(...t(r, ...e)); else s.push(...t(document, ...e));
            return s;
        }
        create(...t) {
            let s = new n;
            for (const r of t) if ("string" == typeof r) s.push(document.createElement(r)); else if (r instanceof Object) {
                const t = document.createElement(r.tagName || "div");
                r.content && (Array.isArray(r.content) ? e(t, ...r.content) : e(t, r.content)), 
                s.push(t);
            }
            return s;
        }
        empty() {
            return this.forEach((t => t.innerHTML = "")), this;
        }
        text(t) {
            return this.forEach((e => e.textContent = t || "")), this;
        }
        append(...t) {
            return this.forEach((s => e(s, ...t))), this;
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
            let s = new n;
            if (e) return this.forEach((e => {
                e.classList.contains(t) && s.push(e);
            })), s;
            for (const e of this) e.classList.contains(t) && s.push(e);
            return s;
        }
        addEventListener(t, e, s) {
            return this.forEach((r => r.addEventListener(t, e, s))), this;
        }
        removeEventListener(t, e, s) {
            return this.forEach((r => r.removeEventListener(t, e, s))), this;
        }
        fireEvent(t) {
            return this.forEach((e => e.dispatchEvent(new Event(t)))), this;
        }
        css(t) {
            return this.forEach((e => Object.keys(t).forEach((s => e.style[s] = t[s])))), this;
        }
        attr(t) {
            return this.forEach((e => Object.keys(t).forEach((s => e.setAttribute(s, t[s]))))), 
            this;
        }
        nextTick(...t) {
            return r(...t), this;
        }
    }
    return function(...e) {
        return e instanceof n ? e : new n(...t(document, ...e));
    };
}();
//# sourceMappingURL=micro-dom.js.map

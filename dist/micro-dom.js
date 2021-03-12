var _ = (function () {
    'use strict';

    var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    function __extends(d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    }
    function __values(o) {
        var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
        if (m) return m.call(o);
        if (o && typeof o.length === "number") return {
            next: function () {
                if (o && i >= o.length) o = void 0;
                return { value: o && o[i++], done: !o };
            }
        };
        throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
    }
    function __read(o, n) {
        var m = typeof Symbol === "function" && o[Symbol.iterator];
        if (!m) return o;
        var i = m.call(o), r, ar = [], e;
        try {
            while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
        }
        catch (error) { e = { error: error }; }
        finally {
            try {
                if (r && !r.done && (m = i["return"])) m.call(i);
            }
            finally { if (e) throw e.error; }
        }
        return ar;
    }
    function __spreadArray(to, from) {
        for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
            to[j] = from[i];
        return to;
    }

    function getEls(target) {
        var e_1, _a;
        var els = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            els[_i - 1] = arguments[_i];
        }
        var arr = [];
        try {
            for (var els_1 = __values(els), els_1_1 = els_1.next(); !els_1_1.done; els_1_1 = els_1.next()) {
                var el = els_1_1.value;
                if (typeof el === 'string') {
                    var nodes = target.querySelectorAll(el);
                    arr.push.apply(arr, __spreadArray([], __read(nodes)));
                }
                else if (el instanceof Element) {
                    arr.push(el);
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (els_1_1 && !els_1_1.done && (_a = els_1.return)) _a.call(els_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
        return arr;
    }
    function recursiveAppend(el) {
        var e_2, _a;
        var content = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            content[_i - 1] = arguments[_i];
        }
        try {
            for (var content_1 = __values(content), content_1_1 = content_1.next(); !content_1_1.done; content_1_1 = content_1.next()) {
                var entity = content_1_1.value;
                if (Array.isArray(entity)) {
                    recursiveAppend.apply(void 0, __spreadArray([el], __read(entity)));
                }
                else {
                    el.append(entity);
                }
            }
        }
        catch (e_2_1) { e_2 = { error: e_2_1 }; }
        finally {
            try {
                if (content_1_1 && !content_1_1.done && (_a = content_1.return)) _a.call(content_1);
            }
            finally { if (e_2) throw e_2.error; }
        }
    }
    function nextTick() {
        var cbs = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            cbs[_i] = arguments[_i];
        }
        var arr = cbs;
        var current = cbs.shift();
        current && setTimeout(function () {
            current();
            if (arr.length) {
                nextTick.apply(void 0, __spreadArray([], __read(arr)));
            }
        }, 0);
        return this;
    }

    var MicroDOM = /** @class */ (function (_super) {
        __extends(MicroDOM, _super);
        function MicroDOM() {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            return _super.apply(this, __spreadArray([], __read(args))) || this;
        }
        /**
         * Returns a new instance containing the elements with the passed selectors and elements (or from the document if the current instance is empty)
         */
        MicroDOM.prototype.get = function () {
            var e_1, _a;
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            var newInstance = new MicroDOM();
            if (this.length) {
                try {
                    for (var _b = __values(this), _c = _b.next(); !_c.done; _c = _b.next()) {
                        var el = _c.value;
                        newInstance.push.apply(newInstance, __spreadArray([], __read(getEls.apply(void 0, __spreadArray([el], __read(args))))));
                    }
                }
                catch (e_1_1) { e_1 = { error: e_1_1 }; }
                finally {
                    try {
                        if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                    }
                    finally { if (e_1) throw e_1.error; }
                }
            }
            else {
                newInstance.push.apply(newInstance, __spreadArray([], __read(getEls.apply(void 0, __spreadArray([document], __read(args))))));
            }
            return newInstance;
        };
        /**
         * Returns a new instance with new created elements according to the passed parameters
         */
        MicroDOM.prototype.create = function () {
            var e_2, _a;
            var entities = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                entities[_i] = arguments[_i];
            }
            var newInstance = new MicroDOM();
            try {
                for (var entities_1 = __values(entities), entities_1_1 = entities_1.next(); !entities_1_1.done; entities_1_1 = entities_1.next()) {
                    var entity = entities_1_1.value;
                    if (typeof entity === 'string') {
                        newInstance.push(document.createElement(entity));
                    }
                    else if (entity instanceof Object) {
                        var el = document.createElement(entity.tagName || 'div');
                        if (entity.content) {
                            if (Array.isArray(entity.content)) {
                                recursiveAppend.apply(void 0, __spreadArray([el], __read(entity.content)));
                            }
                            else {
                                recursiveAppend(el, entity.content);
                            }
                        }
                        newInstance.push(el);
                    }
                }
            }
            catch (e_2_1) { e_2 = { error: e_2_1 }; }
            finally {
                try {
                    if (entities_1_1 && !entities_1_1.done && (_a = entities_1.return)) _a.call(entities_1);
                }
                finally { if (e_2) throw e_2.error; }
            }
            return newInstance;
        };
        /**
         * Clears the contents of each element in the set and returns the instance itself
         */
        MicroDOM.prototype.empty = function () {
            this.forEach(function (el) { return el.innerHTML = ''; });
            return this;
        };
        /**
         * Sets the textContent property for each collection item and returns an instance
         */
        MicroDOM.prototype.text = function (text) {
            this.forEach(function (el) { return el.textContent = text || ''; });
            return this;
        };
        /**
         * Inserts a set of Node objects or DOMString objects after the last child of each array element
         */
        MicroDOM.prototype.append = function () {
            var append = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                append[_i] = arguments[_i];
            }
            this.forEach(function (el) { return recursiveAppend.apply(void 0, __spreadArray([el], __read(append))); });
            return this;
        };
        /**
         * Adds a class or classes to all array elements
         */
        MicroDOM.prototype.addClass = function () {
            var classes = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                classes[_i] = arguments[_i];
            }
            this.forEach(function (el) {
                var _a;
                return (_a = el.classList).add.apply(_a, __spreadArray([], __read(classes)));
            });
            return this;
        };
        /**
         * Removes a class or classes from all array elements
         */
        MicroDOM.prototype.removeClass = function () {
            var classes = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                classes[_i] = arguments[_i];
            }
            this.forEach(function (el) {
                var _a;
                return (_a = el.classList).remove.apply(_a, __spreadArray([], __read(classes)));
            });
            return this;
        };
        /**
         * Adds or removes a class for each element of the array, depending on its presence
         */
        MicroDOM.prototype.toggleClass = function (classname) {
            this.forEach(function (el) { return el.classList.toggle(classname); });
            return this;
        };
        /**
         * Determine if any of the agreed members are assigned to this class. Or, if you pass "true" as the second argument, then each element (default: reqtForAll = false)
         */
        MicroDOM.prototype.hasClass = function (classname, reqtForAll) {
            var e_3, _a;
            if (reqtForAll === void 0) { reqtForAll = false; }
            if (reqtForAll) { // The presence of a class for each element of the set
                var number_1 = 0;
                this.forEach(function (el) {
                    if (el.classList.contains(classname)) {
                        number_1++;
                    }
                });
                return number_1 === this.length;
            }
            else { // the presence of a class for at least one element of the set
                try {
                    for (var _b = __values(this), _c = _b.next(); !_c.done; _c = _b.next()) {
                        var el = _c.value;
                        if (el.classList.contains(classname)) {
                            return true;
                        }
                    }
                }
                catch (e_3_1) { e_3 = { error: e_3_1 }; }
                finally {
                    try {
                        if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                    }
                    finally { if (e_3) throw e_3.error; }
                }
                return false;
            }
        };
        /**
         * Calls the "addEventListener" method for each set item
         */
        MicroDOM.prototype.addEventListener = function (type, listener, options) {
            this.forEach(function (el) { return el.addEventListener(type, listener, options); });
            return this;
        };
        /**
         * Calls the "removeEventListener" method for each set item
         */
        MicroDOM.prototype.removeEventListener = function (type, listener, options) {
            this.forEach(function (el) { return el.removeEventListener(type, listener, options); });
            return this;
        };
        /**
         * Calls dispatchEvent with an event of the specified type for each item in the set
         */
        MicroDOM.prototype.fireEvent = function (type) {
            this.forEach(function (el) { return el.dispatchEvent(new Event(type)); });
            return this;
        };
        /**
         * Sets the style attribute property passed in the object by key
         */
        MicroDOM.prototype.css = function (obj) {
            this.forEach(function (el) { return Object.keys(obj).forEach(function (key) { return el.style[key] = obj[key]; }); });
            return this;
        };
        /**
         * Sets the attribute property passed in the object by key
         */
        MicroDOM.prototype.attr = function (obj) {
            this.forEach(function (el) { return Object.keys(obj).forEach(function (key) { return el.setAttribute(key, obj[key]); }); });
            return this;
        };
        /**
         * Recursively calls each passed function in a new setTimeout(() => {}, 0)
         */
        MicroDOM.prototype.nextTick = function () {
            var cbs = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                cbs[_i] = arguments[_i];
            }
            nextTick.apply(void 0, __spreadArray([], __read(cbs)));
            return this;
        };
        return MicroDOM;
    }(Array));

    function _() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        if (args instanceof MicroDOM) {
            return args;
        }
        return new (MicroDOM.bind.apply(MicroDOM, __spreadArray([void 0], __read(getEls.apply(void 0, __spreadArray([document], __read(args)))))))();
    }

    return _;

}());
//# sourceMappingURL=micro-dom.js.map

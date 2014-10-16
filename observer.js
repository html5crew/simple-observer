/*jshint devel: true
 */
(function (exports) {
    'use strict';

    exports.Observer = Class.extend({
        on: function (event, listener) {
            var events = [].concat(event);
            for (var i = 0, l = events.length; i < l; i++) {
                this.addListener.apply(this, [events[i], listener]);
            }

            return this;
        },
        addListener: function (event, listener) {
            var listeners = this.getListeners(event);
            listeners.push(listener);
            return this;
        },
        once: function (event, listener) {
            if (!listener) {
                return ;
            }
            var self = this;
            var onetimeListener = function () {
                self.off(event, onetimeListener);
                listener.apply(this, arguments);
            };
            listener.__onetime_listener = onetimeListener;
            this.on(event, onetimeListener);
        },
        emit: function (event) {
            var events = [].concat(event);
            var args = [].slice.call(arguments, 1);
            for (var i = 0, l = events.length; i < l; i++) {
                this._emit(events[i], args);
            }

            return this;
        },
        _emit: function (event, args) {
            var cloneListeners = this.getListeners(event).slice(0);
            if (typeof cloneListeners !== 'undefined') {
                for (var i = 0, len = cloneListeners.length; i < len; i++) {
                    try {
                        cloneListeners[i].apply(this, args);
                    } catch (e) {
                        if (typeof console !== 'undefined') {
                            console.error('failed on while "' + event + '" event, caused by\r\n > ' + e);
                        }
                        throw e;
                    }
                }
            }
        },
        getListeners: function (event) {
            this.listeners = this.listeners || {};
            this.listeners[event] = this.listeners[event] || [];
            return this.listeners[event];
        },
        off: function (event, listener) {
            var events = [].concat(event);
            if (listener && typeof listener.__onetime_listener === 'function') {
                listener = listener.__onetime_listener;
            }

            for (var i = 0, l = events.length; i < l; i++) {
                this.removeListener.apply(this, [events[i], listener]);
            }

            if (listener && typeof listener.__onetime_listener === 'function') {
                delete listener.__onetime_listener;
            }
            return this;
        },
        removeListener: function (event, listener) {
            var listeners = this.getListeners(event);
            if (typeof listeners !== 'undefined') {
                for (var i = 0, len = listeners.length; i < len; i++) {
                    if (listeners[i] === listener || listeners[i].__original__ === listener) {
                        listeners.splice(i, 1);
                        break;
                    }
                }
            }
            return this;
        },
        destroy: function () {
            this.listeners = null;
        }
    });
})(this);
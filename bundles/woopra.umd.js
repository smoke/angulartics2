(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('angulartics2')) :
	typeof define === 'function' && define.amd ? define(['exports', '@angular/core', 'angulartics2'], factory) :
	(factory((global.angulartics2 = global.angulartics2 || {}, global.angulartics2.woopra = {}),global.ng.core,global.angulartics2));
}(this, (function (exports,core,angulartics2) { 'use strict';

var Angulartics2Woopra = /** @class */ (function () {
    function Angulartics2Woopra(angulartics2$$1) {
        var _this = this;
        this.angulartics2 = angulartics2$$1;
        if (typeof (woopra) === 'undefined') {
            console.warn('Woopra not found');
        }
        this.angulartics2.pageTrack.subscribe(function (x) { return _this.pageTrack(x.path, x.location); });
        this.angulartics2.eventTrack.subscribe(function (x) { return _this.eventTrack(x.action, x.properties); });
        this.angulartics2.setUserProperties.subscribe(function (x) { return _this.setUserProperties(x); });
    }
    Angulartics2Woopra.prototype.pageTrack = function (path, location) {
        try {
            woopra.track('pv', {
                url: path
            });
        }
        catch (e) {
            if (!(e instanceof ReferenceError)) {
                throw e;
            }
        }
    };
    Angulartics2Woopra.prototype.eventTrack = function (action, properties) {
        try {
            woopra.track(action, properties);
        }
        catch (e) {
            if (!(e instanceof ReferenceError)) {
                throw e;
            }
        }
    };
    Angulartics2Woopra.prototype.setUserProperties = function (properties) {
        try {
            if (properties.email) {
                woopra.identify(properties);
            }
        }
        catch (e) {
            if (!(e instanceof ReferenceError)) {
                throw e;
            }
        }
    };
    Angulartics2Woopra.decorators = [
        { type: core.Injectable },
    ];
    /** @nocollapse */
    Angulartics2Woopra.ctorParameters = function () { return [
        { type: angulartics2.Angulartics2, },
    ]; };
    return Angulartics2Woopra;
}());

/**
 * Generated bundle index. Do not edit.
 */

exports.Angulartics2Woopra = Angulartics2Woopra;

Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=woopra.umd.js.map

(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/platform-browser'), require('angulartics2')) :
	typeof define === 'function' && define.amd ? define(['exports', '@angular/core', '@angular/platform-browser', 'angulartics2'], factory) :
	(factory((global.angulartics2 = global.angulartics2 || {}, global.angulartics2.clicky = {}),global.ng.core,global.ng.platformBrowser,global.angulartics2));
}(this, (function (exports,core,platformBrowser,angulartics2) { 'use strict';

var Angulartics2Clicky = /** @class */ (function () {
    function Angulartics2Clicky(angulartics2$$1, titleService) {
        var _this = this;
        this.angulartics2 = angulartics2$$1;
        this.titleService = titleService;
        if (typeof clicky === 'undefined') {
            console.warn('Angulartics 2 Clicky Plugin: clicky global not found');
        }
        this.angulartics2.pageTrack.subscribe(function (x) { return _this.pageTrack(x.path); });
        this.angulartics2.eventTrack.subscribe(function (x) {
            return _this.eventOrGoalTrack(x.action, x.properties);
        });
    }
    /**
     * Track Page in Clicky
     *
     * @param path location
     *
     * @link https://clicky.com/help/custom/manual#log
     */
    Angulartics2Clicky.prototype.pageTrack = function (path) {
        var title = this.titleService.getTitle();
        clicky.log(path, title, 'pageview');
    };
    /**
     * Track Event Or Goal in Clicky
     *
     * @param action Action name
     * @param properties Definition of 'properties.goal' determines goal vs event tracking
     *
     * @link https://clicky.com/help/custom/manual#log
     * @link https://clicky.com/help/custom/manual#goal
     */
    Angulartics2Clicky.prototype.eventOrGoalTrack = function (action, properties) {
        if (typeof properties.goal === 'undefined') {
            var title = properties.title || null;
            var type = properties.type != null ? this.validateType(properties.type) : null;
            clicky.log(action, title, type);
        }
        else {
            var goalId = properties.goal;
            var revenue = properties.revenue;
            clicky.goal(goalId, revenue, !!properties.noQueue);
        }
    };
    Angulartics2Clicky.prototype.validateType = function (type) {
        var EventType = ['pageview', 'click', 'download', 'outbound'];
        return EventType.indexOf(type) > -1 ? type : 'pageview';
    };
    Angulartics2Clicky.decorators = [
        { type: core.Injectable },
    ];
    /** @nocollapse */
    Angulartics2Clicky.ctorParameters = function () { return [
        { type: angulartics2.Angulartics2, },
        { type: platformBrowser.Title, },
    ]; };
    return Angulartics2Clicky;
}());

/**
 * Generated bundle index. Do not edit.
 */

exports.Angulartics2Clicky = Angulartics2Clicky;

Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=clicky.umd.js.map

(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/common'), require('@angular/core'), require('@angular/router'), require('rxjs/operators'), require('rxjs/ReplaySubject'), require('@angular/platform-browser')) :
	typeof define === 'function' && define.amd ? define(['exports', '@angular/common', '@angular/core', '@angular/router', 'rxjs/operators', 'rxjs/ReplaySubject', '@angular/platform-browser'], factory) :
	(factory((global.angulartics2 = {}),global.ng.common,global.ng.core,global.ng.router,global.Rx.Observable,global.Rx,global.ng.platformBrowser));
}(this, (function (exports,common,core,router,operators,ReplaySubject,platformBrowser) { 'use strict';

var DefaultConfig = (function () {
    function DefaultConfig() {
        this.pageTracking = {
            autoTrackVirtualPages: true,
            basePath: '',
            excludedRoutes: [],
            clearIds: false,
        };
        this.developerMode = false;
        this.ga = {};
        this.appInsights = {};
        this.gtm = {};
    }
    return DefaultConfig;
}());

var ANGULARTICS2_TOKEN = new core.InjectionToken('ANGULARTICS2');

var __assign = (undefined && undefined.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var Angulartics2 = (function () {
    function Angulartics2(location, router$$1, setup) {
        this.pageTrack = new ReplaySubject.ReplaySubject(10);
        this.eventTrack = new ReplaySubject.ReplaySubject(10);
        this.exceptionTrack = new ReplaySubject.ReplaySubject(10);
        this.setAlias = new ReplaySubject.ReplaySubject(10);
        this.setUsername = new ReplaySubject.ReplaySubject(10);
        this.setUserProperties = new ReplaySubject.ReplaySubject(10);
        this.setUserPropertiesOnce = new ReplaySubject.ReplaySubject(10);
        this.setSuperProperties = new ReplaySubject.ReplaySubject(10);
        this.setSuperPropertiesOnce = new ReplaySubject.ReplaySubject(10);
        this.userTimings = new ReplaySubject.ReplaySubject(10);
        var defaultConfig = new DefaultConfig;
        this.settings = __assign({}, defaultConfig, setup.settings);
        this.settings.pageTracking = __assign({}, defaultConfig.pageTracking, setup.settings.pageTracking);
        this.trackLocation(location, router$$1);
    }
    Angulartics2.prototype.trackLocation = function (location, router$$1) {
        var _this = this;
        router$$1.events.pipe(operators.filter(function (event) { return event instanceof router.NavigationEnd; }), operators.filter(function () { return !_this.settings.developerMode; })).subscribe(function (event) {
            return _this.trackUrlChange(event.urlAfterRedirects, location);
        });
    };
    Angulartics2.prototype.virtualPageviews = function (value) {
        this.settings.pageTracking.autoTrackVirtualPages = value;
    };
    Angulartics2.prototype.excludeRoutes = function (routes) {
        this.settings.pageTracking.excludedRoutes = routes;
    };
    Angulartics2.prototype.withBase = function (value) {
        this.settings.pageTracking.basePath = value;
    };
    Angulartics2.prototype.clearIds = function (value) {
        this.settings.pageTracking.clearIds = value;
    };
    Angulartics2.prototype.developerMode = function (value) {
        this.settings.developerMode = value;
    };
    Angulartics2.prototype.trackUrlChange = function (url, location) {
        if (this.settings.pageTracking.autoTrackVirtualPages && !this.matchesExcludedRoute(url)) {
            var clearedUrl = this.clearUrl(url);
            this.pageTrack.next({
                path: this.settings.pageTracking.basePath.length
                    ? this.settings.pageTracking.basePath + clearedUrl
                    : location.prepareExternalUrl(clearedUrl),
                location: location,
            });
        }
    };
    Angulartics2.prototype.matchesExcludedRoute = function (url) {
        for (var _i = 0, _a = this.settings.pageTracking.excludedRoutes; _i < _a.length; _i++) {
            var excludedRoute = _a[_i];
            var matchesRegex = excludedRoute instanceof RegExp && excludedRoute.test(url);
            if (matchesRegex || url.indexOf(excludedRoute) !== -1) {
                return true;
            }
        }
        return false;
    };
    Angulartics2.prototype.clearUrl = function (url) {
        if (this.settings.pageTracking.clearIds) {
            return url
                .split('/')
                .filter(function (part) { return !part.match(/\d+/); })
                .join('/');
        }
        return url;
    };
    Angulartics2.decorators = [
        { type: core.Injectable },
    ];
    Angulartics2.ctorParameters = function () { return [
        { type: common.Location, },
        { type: router.Router, },
        { type: undefined, decorators: [{ type: core.Inject, args: [ANGULARTICS2_TOKEN,] },] },
    ]; };
    return Angulartics2;
}());

var __assign$1 = (undefined && undefined.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var Angulartics2On = (function () {
    function Angulartics2On(elRef, angulartics2, eventManager) {
        this.elRef = elRef;
        this.angulartics2 = angulartics2;
        this.eventManager = eventManager;
        this.angularticsProperties = {};
        this.el = this.elRef.nativeElement;
    }
    Angulartics2On.prototype.ngAfterContentInit = function () {
        var _this = this;
        if (this.isBrowser()) {
            this.eventManager.addEventListener(this.el, this.angulartics2On || 'click', function (event) { return _this.eventTrack(event); });
        }
    };
    Angulartics2On.prototype.isBrowser = function () {
        return typeof (window) !== 'undefined';
    };
    Angulartics2On.prototype.eventTrack = function (event) {
        var action = this.angularticsAction;
        var properties = __assign$1({}, this.angularticsProperties, { eventType: event.type });
        if (this.angularticsCategory) {
            properties.category = this.angularticsCategory;
        }
        if (this.angularticsLabel) {
            properties.label = this.angularticsLabel;
        }
        if (this.angularticsValue) {
            properties.value = this.angularticsValue;
        }
        this.angulartics2.eventTrack.next({
            action: action,
            properties: properties,
        });
    };
    Angulartics2On.decorators = [
        { type: core.Injectable },
        { type: core.Directive, args: [{
                    selector: '[angulartics2On]'
                },] },
    ];
    Angulartics2On.ctorParameters = function () { return [
        { type: core.ElementRef, },
        { type: Angulartics2, },
        { type: platformBrowser.EventManager, },
    ]; };
    Angulartics2On.propDecorators = {
        'angulartics2On': [{ type: core.Input, args: ['angulartics2On',] },],
        'angularticsAction': [{ type: core.Input },],
        'angularticsCategory': [{ type: core.Input },],
        'angularticsLabel': [{ type: core.Input },],
        'angularticsValue': [{ type: core.Input },],
        'angularticsProperties': [{ type: core.Input },],
    };
    return Angulartics2On;
}());

var Angulartics2Module = (function () {
    function Angulartics2Module() {
    }
    Angulartics2Module.forRoot = function (providers, settings) {
        if (settings === void 0) { settings = {}; }
        return {
            ngModule: Angulartics2Module,
            providers: [
                { provide: ANGULARTICS2_TOKEN, useValue: { providers: providers, settings: settings } },
                Angulartics2
            ].concat(providers),
        };
    };
    Angulartics2Module.decorators = [
        { type: core.NgModule, args: [{
                    declarations: [Angulartics2On],
                    exports: [Angulartics2On],
                },] },
    ];
    Angulartics2Module.ctorParameters = function () { return []; };
    return Angulartics2Module;
}());

exports.ɵa = Angulartics2On;
exports.Angulartics2 = Angulartics2;
exports.Angulartics2Module = Angulartics2Module;
exports.ANGULARTICS2_TOKEN = ANGULARTICS2_TOKEN;
exports.DefaultConfig = DefaultConfig;

Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=core.umd.js.map

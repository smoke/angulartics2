var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
import { Location } from '@angular/common';
import { Injectable, Inject } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { DefaultConfig } from './angulartics2-config';
import { ANGULARTICS2_TOKEN } from './angulartics2-token';
var Angulartics2 = (function () {
    function Angulartics2(location, router, setup) {
        this.pageTrack = new ReplaySubject(10);
        this.eventTrack = new ReplaySubject(10);
        this.exceptionTrack = new ReplaySubject(10);
        this.setAlias = new ReplaySubject(10);
        this.setUsername = new ReplaySubject(10);
        this.setUserProperties = new ReplaySubject(10);
        this.setUserPropertiesOnce = new ReplaySubject(10);
        this.setSuperProperties = new ReplaySubject(10);
        this.setSuperPropertiesOnce = new ReplaySubject(10);
        this.userTimings = new ReplaySubject(10);
        var defaultConfig = new DefaultConfig;
        this.settings = __assign({}, defaultConfig, setup.settings);
        this.settings.pageTracking = __assign({}, defaultConfig.pageTracking, setup.settings.pageTracking);
        this.trackLocation(location, router);
    }
    Angulartics2.prototype.trackLocation = function (location, router) {
        var _this = this;
        router.events.pipe(filter(function (event) { return event instanceof NavigationEnd; }), filter(function () { return !_this.settings.developerMode; })).subscribe(function (event) {
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
        { type: Injectable },
    ];
    Angulartics2.ctorParameters = function () { return [
        { type: Location, },
        { type: Router, },
        { type: undefined, decorators: [{ type: Inject, args: [ANGULARTICS2_TOKEN,] },] },
    ]; };
    return Angulartics2;
}());
export { Angulartics2 };
//# sourceMappingURL=angulartics2.js.map
import { Location } from '@angular/common';
import { Injectable, Inject } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { DefaultConfig } from './angulartics2-config';
import { ANGULARTICS2_TOKEN } from './angulartics2-token';
export class Angulartics2 {
    constructor(location, router, setup) {
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
        const defaultConfig = new DefaultConfig;
        this.settings = Object.assign({}, defaultConfig, setup.settings);
        this.settings.pageTracking = Object.assign({}, defaultConfig.pageTracking, setup.settings.pageTracking);
        this.trackLocation(location, router);
    }
    trackLocation(location, router) {
        router.events.pipe(filter(event => event instanceof NavigationEnd), filter(() => !this.settings.developerMode)).subscribe((event) => this.trackUrlChange(event.urlAfterRedirects, location));
    }
    virtualPageviews(value) {
        this.settings.pageTracking.autoTrackVirtualPages = value;
    }
    excludeRoutes(routes) {
        this.settings.pageTracking.excludedRoutes = routes;
    }
    withBase(value) {
        this.settings.pageTracking.basePath = value;
    }
    clearIds(value) {
        this.settings.pageTracking.clearIds = value;
    }
    developerMode(value) {
        this.settings.developerMode = value;
    }
    trackUrlChange(url, location) {
        if (this.settings.pageTracking.autoTrackVirtualPages && !this.matchesExcludedRoute(url)) {
            const clearedUrl = this.clearUrl(url);
            this.pageTrack.next({
                path: this.settings.pageTracking.basePath.length
                    ? this.settings.pageTracking.basePath + clearedUrl
                    : location.prepareExternalUrl(clearedUrl),
                location: location,
            });
        }
    }
    matchesExcludedRoute(url) {
        for (const excludedRoute of this.settings.pageTracking.excludedRoutes) {
            const matchesRegex = excludedRoute instanceof RegExp && excludedRoute.test(url);
            if (matchesRegex || url.indexOf(excludedRoute) !== -1) {
                return true;
            }
        }
        return false;
    }
    clearUrl(url) {
        if (this.settings.pageTracking.clearIds) {
            return url
                .split('/')
                .filter(part => !part.match(/\d+/))
                .join('/');
        }
        return url;
    }
}
Angulartics2.decorators = [
    { type: Injectable },
];
Angulartics2.ctorParameters = () => [
    { type: Location, },
    { type: Router, },
    { type: undefined, decorators: [{ type: Inject, args: [ANGULARTICS2_TOKEN,] },] },
];
//# sourceMappingURL=angulartics2.js.map
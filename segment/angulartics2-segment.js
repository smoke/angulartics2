import { Injectable } from '@angular/core';
import { Angulartics2 } from 'angulartics2';
var Angulartics2Segment = /** @class */ (function () {
    function Angulartics2Segment(angulartics2) {
        var _this = this;
        this.angulartics2 = angulartics2;
        this.angulartics2.pageTrack.subscribe(function (x) { return _this.pageTrack(x.path, x.location); });
        this.angulartics2.eventTrack.subscribe(function (x) { return _this.eventTrack(x.action, x.properties); });
        this.angulartics2.setUserProperties.subscribe(function (x) { return _this.setUserProperties(x); });
        this.angulartics2.setUserPropertiesOnce.subscribe(function (x) { return _this.setUserProperties(x); });
        this.angulartics2.setAlias.subscribe(function (x) { return _this.setAlias(x); });
    }
    /**
     * https://segment.com/docs/libraries/analytics.js/#page
     *
     * analytics.page([category], [name], [properties], [options], [callback]);
     */
    Angulartics2Segment.prototype.pageTrack = function (path, location) {
        // TODO : Support optional parameters where the parameter order and type changes their meaning
        try {
            analytics.page(path);
        }
        catch (e) {
            if (!(e instanceof ReferenceError)) {
                throw e;
            }
        }
    };
    /**
     * https://segment.com/docs/libraries/analytics.js/#track
     *
     * analytics.track(event, [properties], [options], [callback]);
     */
    Angulartics2Segment.prototype.eventTrack = function (action, properties) {
        try {
            analytics.track(action, properties);
        }
        catch (e) {
            if (!(e instanceof ReferenceError)) {
                throw e;
            }
        }
    };
    /**
     * https://segment.com/docs/libraries/analytics.js/#identify
     *
     * analytics.identify([userId], [traits], [options], [callback]);
     */
    Angulartics2Segment.prototype.setUserProperties = function (properties) {
        try {
            if (properties.userId) {
                analytics.identify(properties.userId, properties);
            }
            else {
                analytics.identify(properties);
            }
        }
        catch (e) {
            if (!(e instanceof ReferenceError)) {
                throw e;
            }
        }
    };
    /**
     * https://segment.com/docs/libraries/analytics.js/#alias
     *
     * analytics.alias(userId, previousId, options, callback);
     */
    Angulartics2Segment.prototype.setAlias = function (alias) {
        try {
            analytics.alias(alias);
        }
        catch (e) {
            if (!(e instanceof ReferenceError)) {
                throw e;
            }
        }
    };
    Angulartics2Segment.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    Angulartics2Segment.ctorParameters = function () { return [
        { type: Angulartics2, },
    ]; };
    return Angulartics2Segment;
}());
export { Angulartics2Segment };
//# sourceMappingURL=angulartics2-segment.js.map
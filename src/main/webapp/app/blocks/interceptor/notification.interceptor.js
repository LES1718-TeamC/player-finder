"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var ng_jhipster_1 = require("ng-jhipster");
var Observable_1 = require("rxjs/Observable");
var NotificationInterceptor = /** @class */ (function (_super) {
    __extends(NotificationInterceptor, _super);
    function NotificationInterceptor(injector) {
        var _this = _super.call(this) || this;
        _this.injector = injector;
        setTimeout(function () { return _this.alertService = injector.get(ng_jhipster_1.JhiAlertService); });
        return _this;
    }
    NotificationInterceptor.prototype.requestIntercept = function (options) {
        return options;
    };
    NotificationInterceptor.prototype.responseIntercept = function (observable) {
        var _this = this;
        return observable.map(function (response) {
            var headers = [];
            response.headers.forEach(function (value, name) {
                if (name.toLowerCase().endsWith('app-alert') || name.toLowerCase().endsWith('app-params')) {
                    headers.push(name);
                }
            });
            if (headers.length > 1) {
                headers.sort();
                var alertKey = response.headers.get(headers[0]);
                if (typeof alertKey === 'string') {
                    if (_this.alertService) {
                        var alertParam = headers.length >= 2 ? response.headers.get(headers[1]) : null;
                        _this.alertService.success(alertKey, { param: alertParam }, null);
                    }
                }
            }
            return response;
        }).catch(function (error) {
            return Observable_1.Observable.throw(error); // here, response is an error
        });
    };
    return NotificationInterceptor;
}(ng_jhipster_1.JhiHttpInterceptor));
exports.NotificationInterceptor = NotificationInterceptor;

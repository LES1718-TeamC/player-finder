"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var ErrorComponent = /** @class */ (function () {
    function ErrorComponent(route) {
        this.route = route;
    }
    ErrorComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.data.subscribe(function (routeData) {
            if (routeData.error403) {
                _this.error403 = routeData.error403;
            }
            if (routeData.errorMessage) {
                _this.errorMessage = routeData.errorMessage;
            }
        });
    };
    ErrorComponent = __decorate([
        core_1.Component({
            selector: 'jhi-error',
            templateUrl: './error.component.html'
        })
    ], ErrorComponent);
    return ErrorComponent;
}());
exports.ErrorComponent = ErrorComponent;

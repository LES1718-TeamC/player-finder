"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var ActivateComponent = /** @class */ (function () {
    function ActivateComponent(activateService, loginModalService, route) {
        this.activateService = activateService;
        this.loginModalService = loginModalService;
        this.route = route;
    }
    ActivateComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.queryParams.subscribe(function (params) {
            _this.activateService.get(params['key']).subscribe(function () {
                _this.error = null;
                _this.success = 'OK';
            }, function () {
                _this.success = null;
                _this.error = 'ERROR';
            });
        });
    };
    ActivateComponent.prototype.login = function () {
        this.modalRef = this.loginModalService.open();
    };
    ActivateComponent = __decorate([
        core_1.Component({
            selector: 'jhi-activate',
            templateUrl: './activate.component.html'
        })
    ], ActivateComponent);
    return ActivateComponent;
}());
exports.ActivateComponent = ActivateComponent;

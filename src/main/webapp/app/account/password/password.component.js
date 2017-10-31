"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var PasswordComponent = /** @class */ (function () {
    function PasswordComponent(passwordService, principal) {
        this.passwordService = passwordService;
        this.principal = principal;
    }
    PasswordComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.principal.identity().then(function (account) {
            _this.account = account;
        });
    };
    PasswordComponent.prototype.changePassword = function () {
        var _this = this;
        if (this.password !== this.confirmPassword) {
            this.error = null;
            this.success = null;
            this.doNotMatch = 'ERROR';
        }
        else {
            this.doNotMatch = null;
            this.passwordService.save(this.password).subscribe(function () {
                _this.error = null;
                _this.success = 'OK';
            }, function () {
                _this.success = null;
                _this.error = 'ERROR';
            });
        }
    };
    PasswordComponent = __decorate([
        core_1.Component({
            selector: 'jhi-password',
            templateUrl: './password.component.html'
        })
    ], PasswordComponent);
    return PasswordComponent;
}());
exports.PasswordComponent = PasswordComponent;

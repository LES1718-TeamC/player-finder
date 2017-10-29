"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var PasswordResetInitComponent = /** @class */ (function () {
    function PasswordResetInitComponent(passwordResetInitService, elementRef, renderer) {
        this.passwordResetInitService = passwordResetInitService;
        this.elementRef = elementRef;
        this.renderer = renderer;
    }
    PasswordResetInitComponent.prototype.ngOnInit = function () {
        this.resetAccount = {};
    };
    PasswordResetInitComponent.prototype.ngAfterViewInit = function () {
        this.renderer.invokeElementMethod(this.elementRef.nativeElement.querySelector('#email'), 'focus', []);
    };
    PasswordResetInitComponent.prototype.requestReset = function () {
        var _this = this;
        this.error = null;
        this.errorEmailNotExists = null;
        this.passwordResetInitService.save(this.resetAccount.email).subscribe(function () {
            _this.success = 'OK';
        }, function (response) {
            _this.success = null;
            if (response.status === 400 && response._body === 'email address not registered') {
                _this.errorEmailNotExists = 'ERROR';
            }
            else {
                _this.error = 'ERROR';
            }
        });
    };
    PasswordResetInitComponent = __decorate([
        core_1.Component({
            selector: 'jhi-password-reset-init',
            templateUrl: './password-reset-init.component.html'
        })
    ], PasswordResetInitComponent);
    return PasswordResetInitComponent;
}());
exports.PasswordResetInitComponent = PasswordResetInitComponent;

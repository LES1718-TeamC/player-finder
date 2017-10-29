"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var SocialAuthComponent = /** @class */ (function () {
    function SocialAuthComponent(loginService, cookieService, router) {
        this.loginService = loginService;
        this.cookieService = cookieService;
        this.router = router;
    }
    SocialAuthComponent.prototype.ngOnInit = function () {
        var _this = this;
        var token = this.cookieService.get('social-authentication');
        if (token.length) {
            this.loginService.loginWithToken(token, false).then(function () {
                _this.cookieService.remove('social-authentication');
                _this.router.navigate(['']);
            }, function () {
                _this.router.navigate(['social-register'], { queryParams: { 'success': 'false' } });
            });
        }
    };
    SocialAuthComponent = __decorate([
        core_1.Component({
            selector: 'jhi-auth',
            template: ''
        })
    ], SocialAuthComponent);
    return SocialAuthComponent;
}());
exports.SocialAuthComponent = SocialAuthComponent;

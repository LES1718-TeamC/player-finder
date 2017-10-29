"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var SocialService = /** @class */ (function () {
    function SocialService() {
    }
    SocialService.prototype.getProviderSetting = function (provider) {
        switch (provider) {
            case 'google': return 'https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email';
            case 'facebook': return 'public_profile,email';
            case 'twitter': return '';
            // jhipster-needle-add-social-button
            default: return 'Provider setting not defined';
        }
    };
    SocialService.prototype.getProviderURL = function (provider) {
        return 'signin/' + provider;
    };
    SocialService = __decorate([
        core_1.Injectable()
    ], SocialService);
    return SocialService;
}());
exports.SocialService = SocialService;

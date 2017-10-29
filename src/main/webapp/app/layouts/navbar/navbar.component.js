"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var app_constants_1 = require("../../app.constants");
var NavbarComponent = /** @class */ (function () {
    function NavbarComponent(loginService, languageService, languageHelper, principal, loginModalService, profileService, router) {
        this.loginService = loginService;
        this.languageService = languageService;
        this.languageHelper = languageHelper;
        this.principal = principal;
        this.loginModalService = loginModalService;
        this.profileService = profileService;
        this.router = router;
        // console.log(this.principal.isAuthenticated() ? 'y' : 'n');
        // if (!this.principal.isAuthenticated()) {
        this.userName = 'Account';
        // } else {
        //     this.principal.identity().then((account) => {
        //         console.log(account.firstName);
        //         this.userName = (account !== null && account.userName !== '') ? account.firstName : 'Account';
        //     });
        // }
        this.version = app_constants_1.VERSION ? 'v' + app_constants_1.VERSION : '';
        this.isNavbarCollapsed = true;
    }
    NavbarComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.languageHelper.getAll().then(function (languages) {
            _this.languages = languages;
        });
        this.profileService.getProfileInfo().subscribe(function (profileInfo) {
            _this.inProduction = profileInfo.inProduction;
            _this.swaggerEnabled = profileInfo.swaggerEnabled;
        });
    };
    NavbarComponent.prototype.changeLanguage = function (languageKey) {
        this.languageService.changeLanguage(languageKey);
    };
    NavbarComponent.prototype.collapseNavbar = function () {
        this.isNavbarCollapsed = true;
    };
    NavbarComponent.prototype.isAuthenticated = function () {
        return this.principal.isAuthenticated();
    };
    NavbarComponent.prototype.login = function () {
        this.modalRef = this.loginModalService.open();
    };
    NavbarComponent.prototype.logout = function () {
        this.collapseNavbar();
        this.loginService.logout();
        this.router.navigate(['']);
    };
    NavbarComponent.prototype.toggleNavbar = function () {
        this.isNavbarCollapsed = !this.isNavbarCollapsed;
    };
    NavbarComponent.prototype.getImageUrl = function () {
        return this.isAuthenticated() ? this.principal.getImageUrl() : null;
    };
    NavbarComponent = __decorate([
        core_1.Component({
            selector: 'jhi-navbar',
            templateUrl: './navbar.component.html',
            styleUrls: [
                'navbar.css'
            ]
        })
    ], NavbarComponent);
    return NavbarComponent;
}());
exports.NavbarComponent = NavbarComponent;

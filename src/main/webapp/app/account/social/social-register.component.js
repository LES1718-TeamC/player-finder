"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var SocialRegisterComponent = /** @class */ (function () {
    function SocialRegisterComponent(route, loginModalService) {
        this.route = route;
        this.loginModalService = loginModalService;
    }
    SocialRegisterComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.queryParams.subscribe(function (queryParams) {
            _this.success = queryParams['success'];
        });
        this.route.params.subscribe(function (params) {
            _this.provider = params['provider?{success:boolean}'];
        });
        this.error = !this.success;
        this.providerLabel = this.provider.charAt(0).toUpperCase() + this.provider.slice(1);
    };
    SocialRegisterComponent.prototype.login = function () {
        this.modalRef = this.loginModalService.open();
    };
    SocialRegisterComponent = __decorate([
        core_1.Component({
            selector: 'jhi-register',
            templateUrl: './social-register.component.html'
        })
    ], SocialRegisterComponent);
    return SocialRegisterComponent;
}());
exports.SocialRegisterComponent = SocialRegisterComponent;

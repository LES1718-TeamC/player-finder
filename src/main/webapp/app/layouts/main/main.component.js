"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var JhiMainComponent = /** @class */ (function () {
    function JhiMainComponent(jhiLanguageHelper, router) {
        this.jhiLanguageHelper = jhiLanguageHelper;
        this.router = router;
    }
    JhiMainComponent.prototype.getPageTitle = function (routeSnapshot) {
        var title = (routeSnapshot.data && routeSnapshot.data['pageTitle']) ? routeSnapshot.data['pageTitle'] : 'playerFinderApp';
        if (routeSnapshot.firstChild) {
            title = this.getPageTitle(routeSnapshot.firstChild) || title;
        }
        return title;
    };
    JhiMainComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.router.events.subscribe(function (event) {
            if (event instanceof router_1.NavigationEnd) {
                _this.jhiLanguageHelper.updateTitle(_this.getPageTitle(_this.router.routerState.snapshot.root));
            }
        });
    };
    JhiMainComponent = __decorate([
        core_1.Component({
            selector: 'jhi-main',
            templateUrl: './main.component.html'
        })
    ], JhiMainComponent);
    return JhiMainComponent;
}());
exports.JhiMainComponent = JhiMainComponent;

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
var shared_1 = require("../../shared");
var admin_module_1 = require("../../admin/admin.module");
var _1 = require("./");
var ENTITY_STATES = _1.gameRoute.concat(_1.gamePopupRoute);
var PlayerFinderGameModule = /** @class */ (function () {
    function PlayerFinderGameModule() {
    }
    PlayerFinderGameModule = __decorate([
        core_1.NgModule({
            imports: [
                shared_1.PlayerFinderSharedModule,
                admin_module_1.PlayerFinderAdminModule,
                router_1.RouterModule.forRoot(ENTITY_STATES, { useHash: true })
            ],
            declarations: [
                _1.GameComponent,
                _1.GameDetailComponent,
                _1.GameDialogComponent,
                _1.GameDeleteDialogComponent,
                _1.GamePopupComponent,
                _1.GameDeletePopupComponent,
            ],
            entryComponents: [
                _1.GameComponent,
                _1.GameDialogComponent,
                _1.GamePopupComponent,
                _1.GameDeleteDialogComponent,
                _1.GameDeletePopupComponent,
            ],
            providers: [
                _1.GameService,
                _1.GamePopupService,
                _1.GameResolvePagingParams,
            ],
            schemas: [core_1.CUSTOM_ELEMENTS_SCHEMA]
        })
    ], PlayerFinderGameModule);
    return PlayerFinderGameModule;
}());
exports.PlayerFinderGameModule = PlayerFinderGameModule;

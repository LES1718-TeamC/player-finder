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
var _1 = require("./");
var ENTITY_STATES = _1.locationRoute.concat(_1.locationPopupRoute);
var PlayerFinderLocationModule = /** @class */ (function () {
    function PlayerFinderLocationModule() {
    }
    PlayerFinderLocationModule = __decorate([
        core_1.NgModule({
            imports: [
                shared_1.PlayerFinderSharedModule,
                router_1.RouterModule.forRoot(ENTITY_STATES, { useHash: true })
            ],
            declarations: [
                _1.LocationComponent,
                _1.LocationDetailComponent,
                _1.LocationDialogComponent,
                _1.LocationDeleteDialogComponent,
                _1.LocationPopupComponent,
                _1.LocationDeletePopupComponent,
            ],
            entryComponents: [
                _1.LocationComponent,
                _1.LocationDialogComponent,
                _1.LocationPopupComponent,
                _1.LocationDeleteDialogComponent,
                _1.LocationDeletePopupComponent,
            ],
            providers: [
                _1.LocationService,
                _1.LocationPopupService,
                _1.LocationResolvePagingParams,
            ],
            schemas: [core_1.CUSTOM_ELEMENTS_SCHEMA]
        })
    ], PlayerFinderLocationModule);
    return PlayerFinderLocationModule;
}());
exports.PlayerFinderLocationModule = PlayerFinderLocationModule;

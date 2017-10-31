"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var shared_1 = require("../../shared");
var game_type_component_1 = require("./game-type.component");
var game_type_detail_component_1 = require("./game-type-detail.component");
var game_type_dialog_component_1 = require("./game-type-dialog.component");
var game_type_delete_dialog_component_1 = require("./game-type-delete-dialog.component");
var GameTypeResolvePagingParams = /** @class */ (function () {
    function GameTypeResolvePagingParams(paginationUtil) {
        this.paginationUtil = paginationUtil;
    }
    GameTypeResolvePagingParams.prototype.resolve = function (route, state) {
        var page = route.queryParams['page'] ? route.queryParams['page'] : '1';
        var sort = route.queryParams['sort'] ? route.queryParams['sort'] : 'id,asc';
        return {
            page: this.paginationUtil.parsePage(page),
            predicate: this.paginationUtil.parsePredicate(sort),
            ascending: this.paginationUtil.parseAscending(sort)
        };
    };
    GameTypeResolvePagingParams = __decorate([
        core_1.Injectable()
    ], GameTypeResolvePagingParams);
    return GameTypeResolvePagingParams;
}());
exports.GameTypeResolvePagingParams = GameTypeResolvePagingParams;
exports.gameTypeRoute = [
    {
        path: 'game-type',
        component: game_type_component_1.GameTypeComponent,
        resolve: {
            'pagingParams': GameTypeResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'playerFinderApp.gameType.home.title'
        },
        canActivate: [shared_1.UserRouteAccessService]
    }, {
        path: 'game-type/:id',
        component: game_type_detail_component_1.GameTypeDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'playerFinderApp.gameType.home.title'
        },
        canActivate: [shared_1.UserRouteAccessService]
    }
];
exports.gameTypePopupRoute = [
    {
        path: 'game-type-new',
        component: game_type_dialog_component_1.GameTypePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'playerFinderApp.gameType.home.title'
        },
        canActivate: [shared_1.UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'game-type/:id/edit',
        component: game_type_dialog_component_1.GameTypePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'playerFinderApp.gameType.home.title'
        },
        canActivate: [shared_1.UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'game-type/:id/delete',
        component: game_type_delete_dialog_component_1.GameTypeDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'playerFinderApp.gameType.home.title'
        },
        canActivate: [shared_1.UserRouteAccessService],
        outlet: 'popup'
    }
];

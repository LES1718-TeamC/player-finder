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
var game_component_1 = require("./game.component");
var game_detail_component_1 = require("./game-detail.component");
var game_dialog_component_1 = require("./game-dialog.component");
var game_delete_dialog_component_1 = require("./game-delete-dialog.component");
var GameResolvePagingParams = /** @class */ (function () {
    function GameResolvePagingParams(paginationUtil) {
        this.paginationUtil = paginationUtil;
    }
    GameResolvePagingParams.prototype.resolve = function (route, state) {
        var page = route.queryParams['page'] ? route.queryParams['page'] : '1';
        var sort = route.queryParams['sort'] ? route.queryParams['sort'] : 'id,asc';
        return {
            page: this.paginationUtil.parsePage(page),
            predicate: this.paginationUtil.parsePredicate(sort),
            ascending: this.paginationUtil.parseAscending(sort)
        };
    };
    GameResolvePagingParams = __decorate([
        core_1.Injectable()
    ], GameResolvePagingParams);
    return GameResolvePagingParams;
}());
exports.GameResolvePagingParams = GameResolvePagingParams;
exports.gameRoute = [
    {
        path: 'game',
        component: game_component_1.GameComponent,
        resolve: {
            'pagingParams': GameResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'playerFinderApp.game.home.title'
        },
        canActivate: [shared_1.UserRouteAccessService]
    }, {
        path: 'game/:id',
        component: game_detail_component_1.GameDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'playerFinderApp.game.home.title'
        },
        canActivate: [shared_1.UserRouteAccessService]
    }
];
exports.gamePopupRoute = [
    {
        path: 'game-new',
        component: game_dialog_component_1.GamePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'playerFinderApp.game.home.title'
        },
        canActivate: [shared_1.UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'game/:id/edit',
        component: game_dialog_component_1.GamePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'playerFinderApp.game.home.title'
        },
        canActivate: [shared_1.UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'game/:id/delete',
        component: game_delete_dialog_component_1.GameDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'playerFinderApp.game.home.title'
        },
        canActivate: [shared_1.UserRouteAccessService],
        outlet: 'popup'
    }
];

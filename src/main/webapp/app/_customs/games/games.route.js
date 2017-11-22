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
var games_component_1 = require("./games.component");
var games_detail_component_1 = require("./games-detail.component");
var games_dialog_component_1 = require("./games-dialog.component");
var games_delete_dialog_component_1 = require("./games-delete-dialog.component");
var GamesResolvePagingParams = /** @class */ (function () {
    function GamesResolvePagingParams(paginationUtil) {
        this.paginationUtil = paginationUtil;
    }
    GamesResolvePagingParams.prototype.resolve = function (route, state) {
        var page = route.queryParams['page'] ? route.queryParams['page'] : '1';
        var sort = route.queryParams['sort'] ? route.queryParams['sort'] : 'id,asc';
        return {
            page: this.paginationUtil.parsePage(page),
            predicate: this.paginationUtil.parsePredicate(sort),
            ascending: this.paginationUtil.parseAscending(sort)
        };
    };
    GamesResolvePagingParams = __decorate([
        core_1.Injectable()
    ], GamesResolvePagingParams);
    return GamesResolvePagingParams;
}());
exports.GamesResolvePagingParams = GamesResolvePagingParams;
exports.gameRoute = [
    {
        path: 'games',
        component: games_component_1.GamesComponent,
        resolve: {
            'pagingParams': GamesResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'playerFinderApp.game.home.title'
        },
        canActivate: [shared_1.UserRouteAccessService]
    }, {
        path: 'game/:id',
        component: games_detail_component_1.GameDetailComponent,
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
        component: games_dialog_component_1.GamePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'playerFinderApp.game.home.title'
        },
        canActivate: [shared_1.UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'game/:id/edit',
        component: games_dialog_component_1.GamePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'playerFinderApp.game.home.title'
        },
        canActivate: [shared_1.UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'game/:id/delete',
        component: games_delete_dialog_component_1.GameDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'playerFinderApp.game.home.title'
        },
        canActivate: [shared_1.UserRouteAccessService],
        outlet: 'popup'
    }
];

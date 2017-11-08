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
var location_component_1 = require("./location.component");
var location_detail_component_1 = require("./location-detail.component");
var location_dialog_component_1 = require("./location-dialog.component");
var location_delete_dialog_component_1 = require("./location-delete-dialog.component");
var LocationResolvePagingParams = /** @class */ (function () {
    function LocationResolvePagingParams(paginationUtil) {
        this.paginationUtil = paginationUtil;
    }
    LocationResolvePagingParams.prototype.resolve = function (route, state) {
        var page = route.queryParams['page'] ? route.queryParams['page'] : '1';
        var sort = route.queryParams['sort'] ? route.queryParams['sort'] : 'id,asc';
        return {
            page: this.paginationUtil.parsePage(page),
            predicate: this.paginationUtil.parsePredicate(sort),
            ascending: this.paginationUtil.parseAscending(sort)
        };
    };
    LocationResolvePagingParams = __decorate([
        core_1.Injectable()
    ], LocationResolvePagingParams);
    return LocationResolvePagingParams;
}());
exports.LocationResolvePagingParams = LocationResolvePagingParams;
exports.locationRoute = [
    {
        path: 'location',
        component: location_component_1.LocationComponent,
        resolve: {
            'pagingParams': LocationResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'playerFinderApp.location.home.title'
        },
        canActivate: [shared_1.UserRouteAccessService]
    }, {
        path: 'location/:id',
        component: location_detail_component_1.LocationDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'playerFinderApp.location.home.title'
        },
        canActivate: [shared_1.UserRouteAccessService]
    }
];
exports.locationPopupRoute = [
    {
        path: 'location-new',
        component: location_dialog_component_1.LocationPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'playerFinderApp.location.home.title'
        },
        canActivate: [shared_1.UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'location/:id/edit',
        component: location_dialog_component_1.LocationPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'playerFinderApp.location.home.title'
        },
        canActivate: [shared_1.UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'location/:id/delete',
        component: location_delete_dialog_component_1.LocationDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'playerFinderApp.location.home.title'
        },
        canActivate: [shared_1.UserRouteAccessService],
        outlet: 'popup'
    }
];

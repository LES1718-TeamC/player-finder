"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var user_management_component_1 = require("./user-management.component");
var user_management_detail_component_1 = require("./user-management-detail.component");
var user_management_dialog_component_1 = require("./user-management-dialog.component");
var user_management_delete_dialog_component_1 = require("./user-management-delete-dialog.component");
var UserResolve = /** @class */ (function () {
    function UserResolve(principal) {
        this.principal = principal;
    }
    UserResolve.prototype.canActivate = function () {
        var _this = this;
        return this.principal.identity().then(function (account) { return _this.principal.hasAnyAuthority(['ROLE_ADMIN']); });
    };
    UserResolve = __decorate([
        core_1.Injectable()
    ], UserResolve);
    return UserResolve;
}());
exports.UserResolve = UserResolve;
var UserResolvePagingParams = /** @class */ (function () {
    function UserResolvePagingParams(paginationUtil) {
        this.paginationUtil = paginationUtil;
    }
    UserResolvePagingParams.prototype.resolve = function (route, state) {
        var page = route.queryParams['page'] ? route.queryParams['page'] : '1';
        var sort = route.queryParams['sort'] ? route.queryParams['sort'] : 'id,asc';
        return {
            page: this.paginationUtil.parsePage(page),
            predicate: this.paginationUtil.parsePredicate(sort),
            ascending: this.paginationUtil.parseAscending(sort)
        };
    };
    UserResolvePagingParams = __decorate([
        core_1.Injectable()
    ], UserResolvePagingParams);
    return UserResolvePagingParams;
}());
exports.UserResolvePagingParams = UserResolvePagingParams;
exports.userMgmtRoute = [
    {
        path: 'user-management',
        component: user_management_component_1.UserMgmtComponent,
        resolve: {
            'pagingParams': UserResolvePagingParams
        },
        data: {
            pageTitle: 'userManagement.home.title'
        }
    },
    {
        path: 'user-management/:login',
        component: user_management_detail_component_1.UserMgmtDetailComponent,
        data: {
            pageTitle: 'userManagement.home.title'
        }
    }
];
exports.userDialogRoute = [
    {
        path: 'user-management-new',
        component: user_management_dialog_component_1.UserDialogComponent,
        outlet: 'popup'
    },
    {
        path: 'user-management/:login/edit',
        component: user_management_dialog_component_1.UserDialogComponent,
        outlet: 'popup'
    },
    {
        path: 'user-management/:login/delete',
        component: user_management_delete_dialog_component_1.UserDeleteDialogComponent,
        outlet: 'popup'
    }
];

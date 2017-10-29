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
var GameTypeComponent = /** @class */ (function () {
    function GameTypeComponent(gameTypeService, parseLinks, jhiAlertService, principal, activatedRoute, router, eventManager, paginationUtil, paginationConfig) {
        var _this = this;
        this.gameTypeService = gameTypeService;
        this.parseLinks = parseLinks;
        this.jhiAlertService = jhiAlertService;
        this.principal = principal;
        this.activatedRoute = activatedRoute;
        this.router = router;
        this.eventManager = eventManager;
        this.paginationUtil = paginationUtil;
        this.paginationConfig = paginationConfig;
        this.itemsPerPage = shared_1.ITEMS_PER_PAGE;
        this.routeData = this.activatedRoute.data.subscribe(function (data) {
            _this.page = data['pagingParams'].page;
            _this.previousPage = data['pagingParams'].page;
            _this.reverse = data['pagingParams'].ascending;
            _this.predicate = data['pagingParams'].predicate;
        });
        this.currentSearch = activatedRoute.snapshot.params['search'] ? activatedRoute.snapshot.params['search'] : '';
    }
    GameTypeComponent.prototype.loadAll = function () {
        var _this = this;
        if (this.currentSearch) {
            this.gameTypeService.search({
                page: this.page - 1,
                query: this.currentSearch,
                size: this.itemsPerPage,
                sort: this.sort()
            }).subscribe(function (res) { return _this.onSuccess(res.json, res.headers); }, function (res) { return _this.onError(res.json); });
            return;
        }
        this.gameTypeService.query({
            page: this.page - 1,
            size: this.itemsPerPage,
            sort: this.sort()
        }).subscribe(function (res) { return _this.onSuccess(res.json, res.headers); }, function (res) { return _this.onError(res.json); });
    };
    GameTypeComponent.prototype.loadPage = function (page) {
        if (page !== this.previousPage) {
            this.previousPage = page;
            this.transition();
        }
    };
    GameTypeComponent.prototype.transition = function () {
        this.router.navigate(['/game-type'], { queryParams: {
                page: this.page,
                size: this.itemsPerPage,
                search: this.currentSearch,
                sort: this.predicate + ',' + (this.reverse ? 'asc' : 'desc')
            }
        });
        this.loadAll();
    };
    GameTypeComponent.prototype.clear = function () {
        this.page = 0;
        this.currentSearch = '';
        this.router.navigate(['/game-type', {
                page: this.page,
                sort: this.predicate + ',' + (this.reverse ? 'asc' : 'desc')
            }]);
        this.loadAll();
    };
    GameTypeComponent.prototype.search = function (query) {
        if (!query) {
            return this.clear();
        }
        this.page = 0;
        this.currentSearch = query;
        this.router.navigate(['/game-type', {
                search: this.currentSearch,
                page: this.page,
                sort: this.predicate + ',' + (this.reverse ? 'asc' : 'desc')
            }]);
        this.loadAll();
    };
    GameTypeComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.loadAll();
        this.principal.identity().then(function (account) {
            _this.currentAccount = account;
        });
        this.registerChangeInGameTypes();
    };
    GameTypeComponent.prototype.ngOnDestroy = function () {
        this.eventManager.destroy(this.eventSubscriber);
    };
    GameTypeComponent.prototype.trackId = function (index, item) {
        return item.id;
    };
    GameTypeComponent.prototype.registerChangeInGameTypes = function () {
        var _this = this;
        this.eventSubscriber = this.eventManager.subscribe('gameTypeListModification', function (response) { return _this.loadAll(); });
    };
    GameTypeComponent.prototype.sort = function () {
        var result = [this.predicate + ',' + (this.reverse ? 'asc' : 'desc')];
        if (this.predicate !== 'id') {
            result.push('id');
        }
        return result;
    };
    GameTypeComponent.prototype.onSuccess = function (data, headers) {
        this.links = this.parseLinks.parse(headers.get('link'));
        this.totalItems = headers.get('X-Total-Count');
        this.queryCount = this.totalItems;
        // this.page = pagingParams.page;
        this.gameTypes = data;
    };
    GameTypeComponent.prototype.onError = function (error) {
        this.jhiAlertService.error(error.message, null, null);
    };
    GameTypeComponent = __decorate([
        core_1.Component({
            selector: 'jhi-game-type',
            templateUrl: './game-type.component.html'
        })
    ], GameTypeComponent);
    return GameTypeComponent;
}());
exports.GameTypeComponent = GameTypeComponent;

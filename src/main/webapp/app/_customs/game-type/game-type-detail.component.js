"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var GameTypeDetailComponent = /** @class */ (function () {
    function GameTypeDetailComponent(eventManager, gameTypeService, route) {
        this.eventManager = eventManager;
        this.gameTypeService = gameTypeService;
        this.route = route;
    }
    GameTypeDetailComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.subscription = this.route.params.subscribe(function (params) {
            _this.load(params['id']);
        });
        this.registerChangeInGameTypes();
    };
    GameTypeDetailComponent.prototype.load = function (id) {
        var _this = this;
        this.gameTypeService.find(id).subscribe(function (gameType) {
            _this.gameType = gameType;
        });
    };
    GameTypeDetailComponent.prototype.previousState = function () {
        window.history.back();
    };
    GameTypeDetailComponent.prototype.ngOnDestroy = function () {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    };
    GameTypeDetailComponent.prototype.registerChangeInGameTypes = function () {
        var _this = this;
        this.eventSubscriber = this.eventManager.subscribe('gameTypeListModification', function (response) { return _this.load(_this.gameType.id); });
    };
    GameTypeDetailComponent = __decorate([
        core_1.Component({
            selector: 'jhi-game-type-detail',
            templateUrl: './game-type-detail.component.html'
        })
    ], GameTypeDetailComponent);
    return GameTypeDetailComponent;
}());
exports.GameTypeDetailComponent = GameTypeDetailComponent;

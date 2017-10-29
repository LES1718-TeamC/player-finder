"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var GameDetailComponent = /** @class */ (function () {
    function GameDetailComponent(eventManager, gameService, route) {
        this.eventManager = eventManager;
        this.gameService = gameService;
        this.route = route;
    }
    GameDetailComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.subscription = this.route.params.subscribe(function (params) {
            _this.load(params['id']);
        });
        this.registerChangeInGames();
    };
    GameDetailComponent.prototype.load = function (id) {
        var _this = this;
        this.gameService.find(id).subscribe(function (game) {
            _this.game = game;
        });
    };
    GameDetailComponent.prototype.previousState = function () {
        window.history.back();
    };
    GameDetailComponent.prototype.ngOnDestroy = function () {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    };
    GameDetailComponent.prototype.registerChangeInGames = function () {
        var _this = this;
        this.eventSubscriber = this.eventManager.subscribe('gameListModification', function (response) { return _this.load(_this.game.id); });
    };
    GameDetailComponent = __decorate([
        core_1.Component({
            selector: 'jhi-game-detail',
            templateUrl: './game-detail.component.html'
        })
    ], GameDetailComponent);
    return GameDetailComponent;
}());
exports.GameDetailComponent = GameDetailComponent;

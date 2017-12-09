"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var GameDeleteDialogComponent = /** @class */ (function () {
    function GameDeleteDialogComponent(gameService, activeModal, eventManager) {
        this.gameService = gameService;
        this.activeModal = activeModal;
        this.eventManager = eventManager;
    }
    GameDeleteDialogComponent.prototype.clear = function () {
        this.activeModal.dismiss('cancel');
    };
    GameDeleteDialogComponent.prototype.confirmDelete = function (id) {
        var _this = this;
        this.gameService.delete(id).subscribe(function (response) {
            _this.eventManager.broadcast({
                name: 'gameListModification',
                content: 'Deleted an game'
            });
            _this.activeModal.dismiss(true);
        });
    };
    GameDeleteDialogComponent = __decorate([
        core_1.Component({
            selector: 'jhi-game-delete-dialog',
            templateUrl: './game-delete-dialog.component.html'
        })
    ], GameDeleteDialogComponent);
    return GameDeleteDialogComponent;
}());
exports.GameDeleteDialogComponent = GameDeleteDialogComponent;
var GameDeletePopupComponent = /** @class */ (function () {
    function GameDeletePopupComponent(route, gamePopupService) {
        this.route = route;
        this.gamePopupService = gamePopupService;
    }
    GameDeletePopupComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.routeSub = this.route.params.subscribe(function (params) {
            _this.gamePopupService
                .open(GameDeleteDialogComponent, params['id']);
        });
    };
    GameDeletePopupComponent.prototype.ngOnDestroy = function () {
        this.routeSub.unsubscribe();
    };
    GameDeletePopupComponent = __decorate([
        core_1.Component({
            selector: 'jhi-game-delete-popup',
            template: ''
        })
    ], GameDeletePopupComponent);
    return GameDeletePopupComponent;
}());
exports.GameDeletePopupComponent = GameDeletePopupComponent;

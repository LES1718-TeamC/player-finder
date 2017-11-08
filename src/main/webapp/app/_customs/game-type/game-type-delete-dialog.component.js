"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var GameTypeDeleteDialogComponent = /** @class */ (function () {
    function GameTypeDeleteDialogComponent(gameTypeService, activeModal, eventManager) {
        this.gameTypeService = gameTypeService;
        this.activeModal = activeModal;
        this.eventManager = eventManager;
    }
    GameTypeDeleteDialogComponent.prototype.clear = function () {
        this.activeModal.dismiss('cancel');
    };
    GameTypeDeleteDialogComponent.prototype.confirmDelete = function (id) {
        var _this = this;
        this.gameTypeService.delete(id).subscribe(function (response) {
            _this.eventManager.broadcast({
                name: 'gameTypeListModification',
                content: 'Deleted an gameType'
            });
            _this.activeModal.dismiss(true);
        });
    };
    GameTypeDeleteDialogComponent = __decorate([
        core_1.Component({
            selector: 'jhi-game-type-delete-dialog',
            templateUrl: './game-type-delete-dialog.component.html'
        })
    ], GameTypeDeleteDialogComponent);
    return GameTypeDeleteDialogComponent;
}());
exports.GameTypeDeleteDialogComponent = GameTypeDeleteDialogComponent;
var GameTypeDeletePopupComponent = /** @class */ (function () {
    function GameTypeDeletePopupComponent(route, gameTypePopupService) {
        this.route = route;
        this.gameTypePopupService = gameTypePopupService;
    }
    GameTypeDeletePopupComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.routeSub = this.route.params.subscribe(function (params) {
            _this.gameTypePopupService
                .open(GameTypeDeleteDialogComponent, params['id']);
        });
    };
    GameTypeDeletePopupComponent.prototype.ngOnDestroy = function () {
        this.routeSub.unsubscribe();
    };
    GameTypeDeletePopupComponent = __decorate([
        core_1.Component({
            selector: 'jhi-game-type-delete-popup',
            template: ''
        })
    ], GameTypeDeletePopupComponent);
    return GameTypeDeletePopupComponent;
}());
exports.GameTypeDeletePopupComponent = GameTypeDeletePopupComponent;

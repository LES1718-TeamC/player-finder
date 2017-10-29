"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var GameTypeDialogComponent = /** @class */ (function () {
    function GameTypeDialogComponent(activeModal, jhiAlertService, gameTypeService, eventManager) {
        this.activeModal = activeModal;
        this.jhiAlertService = jhiAlertService;
        this.gameTypeService = gameTypeService;
        this.eventManager = eventManager;
    }
    GameTypeDialogComponent.prototype.ngOnInit = function () {
        this.isSaving = false;
    };
    GameTypeDialogComponent.prototype.clear = function () {
        this.activeModal.dismiss('cancel');
    };
    GameTypeDialogComponent.prototype.save = function () {
        this.isSaving = true;
        if (this.gameType.id !== undefined) {
            this.subscribeToSaveResponse(this.gameTypeService.update(this.gameType));
        }
        else {
            this.subscribeToSaveResponse(this.gameTypeService.create(this.gameType));
        }
    };
    GameTypeDialogComponent.prototype.subscribeToSaveResponse = function (result) {
        var _this = this;
        result.subscribe(function (res) {
            return _this.onSaveSuccess(res);
        }, function (res) { return _this.onSaveError(); });
    };
    GameTypeDialogComponent.prototype.onSaveSuccess = function (result) {
        this.eventManager.broadcast({ name: 'gameTypeListModification', content: 'OK' });
        this.isSaving = false;
        this.activeModal.dismiss(result);
    };
    GameTypeDialogComponent.prototype.onSaveError = function () {
        this.isSaving = false;
    };
    GameTypeDialogComponent.prototype.onError = function (error) {
        this.jhiAlertService.error(error.message, null, null);
    };
    GameTypeDialogComponent = __decorate([
        core_1.Component({
            selector: 'jhi-game-type-dialog',
            templateUrl: './game-type-dialog.component.html'
        })
    ], GameTypeDialogComponent);
    return GameTypeDialogComponent;
}());
exports.GameTypeDialogComponent = GameTypeDialogComponent;
var GameTypePopupComponent = /** @class */ (function () {
    function GameTypePopupComponent(route, gameTypePopupService) {
        this.route = route;
        this.gameTypePopupService = gameTypePopupService;
    }
    GameTypePopupComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.routeSub = this.route.params.subscribe(function (params) {
            if (params['id']) {
                _this.gameTypePopupService
                    .open(GameTypeDialogComponent, params['id']);
            }
            else {
                _this.gameTypePopupService
                    .open(GameTypeDialogComponent);
            }
        });
    };
    GameTypePopupComponent.prototype.ngOnDestroy = function () {
        this.routeSub.unsubscribe();
    };
    GameTypePopupComponent = __decorate([
        core_1.Component({
            selector: 'jhi-game-type-popup',
            template: ''
        })
    ], GameTypePopupComponent);
    return GameTypePopupComponent;
}());
exports.GameTypePopupComponent = GameTypePopupComponent;

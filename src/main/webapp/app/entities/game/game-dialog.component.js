"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var GameDialogComponent = /** @class */ (function () {
    function GameDialogComponent(activeModal, jhiAlertService, gameService, locationService, userService, gameTypeService, eventManager) {
        this.activeModal = activeModal;
        this.jhiAlertService = jhiAlertService;
        this.gameService = gameService;
        this.locationService = locationService;
        this.userService = userService;
        this.gameTypeService = gameTypeService;
        this.eventManager = eventManager;
    }
    GameDialogComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.isSaving = false;
        this.locationService
            .query({ filter: 'game-is-null' })
            .subscribe(function (res) {
            if (!_this.game.location || !_this.game.location.id) {
                _this.locations = res.json;
            }
            else {
                _this.locationService
                    .find(_this.game.location.id)
                    .subscribe(function (subRes) {
                    _this.locations = [subRes].concat(res.json);
                }, function (subRes) { return _this.onError(subRes.json); });
            }
        }, function (res) { return _this.onError(res.json); });
        this.userService.query()
            .subscribe(function (res) { _this.users = res.json; }, function (res) { return _this.onError(res.json); });
        this.gameTypeService
            .query({ filter: 'game-is-null' })
            .subscribe(function (res) {
            if (!_this.game.typeOfGame || !_this.game.typeOfGame.id) {
                _this.typeofgames = res.json;
            }
            else {
                _this.gameTypeService
                    .find(_this.game.typeOfGame.id)
                    .subscribe(function (subRes) {
                    _this.typeofgames = [subRes].concat(res.json);
                }, function (subRes) { return _this.onError(subRes.json); });
            }
        }, function (res) { return _this.onError(res.json); });
    };
    GameDialogComponent.prototype.clear = function () {
        this.activeModal.dismiss('cancel');
    };
    GameDialogComponent.prototype.save = function () {
        this.isSaving = true;
        if (this.game.id !== undefined) {
            this.subscribeToSaveResponse(this.gameService.update(this.game));
        }
        else {
            this.subscribeToSaveResponse(this.gameService.create(this.game));
        }
    };
    GameDialogComponent.prototype.subscribeToSaveResponse = function (result) {
        var _this = this;
        result.subscribe(function (res) {
            return _this.onSaveSuccess(res);
        }, function (res) { return _this.onSaveError(); });
    };
    GameDialogComponent.prototype.onSaveSuccess = function (result) {
        this.eventManager.broadcast({ name: 'gameListModification', content: 'OK' });
        this.isSaving = false;
        this.activeModal.dismiss(result);
    };
    GameDialogComponent.prototype.onSaveError = function () {
        this.isSaving = false;
    };
    GameDialogComponent.prototype.onError = function (error) {
        this.jhiAlertService.error(error.message, null, null);
    };
    GameDialogComponent.prototype.trackLocationById = function (index, item) {
        return item.id;
    };
    GameDialogComponent.prototype.trackUserById = function (index, item) {
        return item.id;
    };
    GameDialogComponent.prototype.trackGameTypeById = function (index, item) {
        return item.id;
    };
    GameDialogComponent.prototype.getSelected = function (selectedVals, option) {
        if (selectedVals) {
            for (var i = 0; i < selectedVals.length; i++) {
                if (option.id === selectedVals[i].id) {
                    return selectedVals[i];
                }
            }
        }
        return option;
    };
    GameDialogComponent = __decorate([
        core_1.Component({
            selector: 'jhi-game-dialog',
            templateUrl: './game-dialog.component.html'
        })
    ], GameDialogComponent);
    return GameDialogComponent;
}());
exports.GameDialogComponent = GameDialogComponent;
var GamePopupComponent = /** @class */ (function () {
    function GamePopupComponent(route, gamePopupService) {
        this.route = route;
        this.gamePopupService = gamePopupService;
    }
    GamePopupComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.routeSub = this.route.params.subscribe(function (params) {
            if (params['id']) {
                _this.gamePopupService
                    .open(GameDialogComponent, params['id']);
            }
            else {
                _this.gamePopupService
                    .open(GameDialogComponent);
            }
        });
    };
    GamePopupComponent.prototype.ngOnDestroy = function () {
        this.routeSub.unsubscribe();
    };
    GamePopupComponent = __decorate([
        core_1.Component({
            selector: 'jhi-game-popup',
            template: ''
        })
    ], GamePopupComponent);
    return GamePopupComponent;
}());
exports.GamePopupComponent = GamePopupComponent;

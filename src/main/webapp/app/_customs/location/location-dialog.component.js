"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var LocationDialogComponent = /** @class */ (function () {
    function LocationDialogComponent(activeModal, jhiAlertService, locationService, eventManager) {
        this.activeModal = activeModal;
        this.jhiAlertService = jhiAlertService;
        this.locationService = locationService;
        this.eventManager = eventManager;
    }
    LocationDialogComponent.prototype.ngOnInit = function () {
        this.isSaving = false;
    };
    LocationDialogComponent.prototype.clear = function () {
        this.activeModal.dismiss('cancel');
    };
    LocationDialogComponent.prototype.save = function () {
        this.isSaving = true;
        if (this.location.id !== undefined) {
            this.subscribeToSaveResponse(this.locationService.update(this.location));
        }
        else {
            this.subscribeToSaveResponse(this.locationService.create(this.location));
        }
    };
    LocationDialogComponent.prototype.subscribeToSaveResponse = function (result) {
        var _this = this;
        result.subscribe(function (res) {
            return _this.onSaveSuccess(res);
        }, function (res) { return _this.onSaveError(); });
    };
    LocationDialogComponent.prototype.onSaveSuccess = function (result) {
        this.eventManager.broadcast({ name: 'locationListModification', content: 'OK' });
        this.isSaving = false;
        this.activeModal.dismiss(result);
    };
    LocationDialogComponent.prototype.onSaveError = function () {
        this.isSaving = false;
    };
    LocationDialogComponent.prototype.onError = function (error) {
        this.jhiAlertService.error(error.message, null, null);
    };
    LocationDialogComponent = __decorate([
        core_1.Component({
            selector: 'jhi-location-dialog',
            templateUrl: './location-dialog.component.html'
        })
    ], LocationDialogComponent);
    return LocationDialogComponent;
}());
exports.LocationDialogComponent = LocationDialogComponent;
var LocationPopupComponent = /** @class */ (function () {
    function LocationPopupComponent(route, locationPopupService) {
        this.route = route;
        this.locationPopupService = locationPopupService;
    }
    LocationPopupComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.routeSub = this.route.params.subscribe(function (params) {
            if (params['id']) {
                _this.locationPopupService
                    .open(LocationDialogComponent, params['id']);
            }
            else {
                _this.locationPopupService
                    .open(LocationDialogComponent);
            }
        });
    };
    LocationPopupComponent.prototype.ngOnDestroy = function () {
        this.routeSub.unsubscribe();
    };
    LocationPopupComponent = __decorate([
        core_1.Component({
            selector: 'jhi-location-popup',
            template: ''
        })
    ], LocationPopupComponent);
    return LocationPopupComponent;
}());
exports.LocationPopupComponent = LocationPopupComponent;

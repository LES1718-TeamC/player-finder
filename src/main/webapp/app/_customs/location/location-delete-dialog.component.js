"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var LocationDeleteDialogComponent = /** @class */ (function () {
    function LocationDeleteDialogComponent(locationService, activeModal, eventManager) {
        this.locationService = locationService;
        this.activeModal = activeModal;
        this.eventManager = eventManager;
    }
    LocationDeleteDialogComponent.prototype.clear = function () {
        this.activeModal.dismiss('cancel');
    };
    LocationDeleteDialogComponent.prototype.confirmDelete = function (id) {
        var _this = this;
        this.locationService.delete(id).subscribe(function (response) {
            _this.eventManager.broadcast({
                name: 'locationListModification',
                content: 'Deleted an location'
            });
            _this.activeModal.dismiss(true);
        });
    };
    LocationDeleteDialogComponent = __decorate([
        core_1.Component({
            selector: 'jhi-location-delete-dialog',
            templateUrl: './location-delete-dialog.component.html'
        })
    ], LocationDeleteDialogComponent);
    return LocationDeleteDialogComponent;
}());
exports.LocationDeleteDialogComponent = LocationDeleteDialogComponent;
var LocationDeletePopupComponent = /** @class */ (function () {
    function LocationDeletePopupComponent(route, locationPopupService) {
        this.route = route;
        this.locationPopupService = locationPopupService;
    }
    LocationDeletePopupComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.routeSub = this.route.params.subscribe(function (params) {
            _this.locationPopupService
                .open(LocationDeleteDialogComponent, params['id']);
        });
    };
    LocationDeletePopupComponent.prototype.ngOnDestroy = function () {
        this.routeSub.unsubscribe();
    };
    LocationDeletePopupComponent = __decorate([
        core_1.Component({
            selector: 'jhi-location-delete-popup',
            template: ''
        })
    ], LocationDeletePopupComponent);
    return LocationDeletePopupComponent;
}());
exports.LocationDeletePopupComponent = LocationDeletePopupComponent;

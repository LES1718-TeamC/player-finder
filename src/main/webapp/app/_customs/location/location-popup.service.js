"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var location_model_1 = require("./location.model");
var LocationPopupService = /** @class */ (function () {
    function LocationPopupService(modalService, router, locationService) {
        this.modalService = modalService;
        this.router = router;
        this.locationService = locationService;
        this.ngbModalRef = null;
    }
    LocationPopupService.prototype.open = function (component, id) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var isOpen = _this.ngbModalRef !== null;
            if (isOpen) {
                resolve(_this.ngbModalRef);
            }
            if (id) {
                _this.locationService.find(id).subscribe(function (location) {
                    _this.ngbModalRef = _this.locationModalRef(component, location);
                    resolve(_this.ngbModalRef);
                });
            }
            else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(function () {
                    _this.ngbModalRef = _this.locationModalRef(component, new location_model_1.Location());
                    resolve(_this.ngbModalRef);
                }, 0);
            }
        });
    };
    LocationPopupService.prototype.locationModalRef = function (component, location) {
        var _this = this;
        var modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static' });
        modalRef.componentInstance.location = location;
        modalRef.result.then(function (result) {
            _this.router.navigate([{ outlets: { popup: null } }], { replaceUrl: true });
            _this.ngbModalRef = null;
        }, function (reason) {
            _this.router.navigate([{ outlets: { popup: null } }], { replaceUrl: true });
            _this.ngbModalRef = null;
        });
        return modalRef;
    };
    LocationPopupService = __decorate([
        core_1.Injectable()
    ], LocationPopupService);
    return LocationPopupService;
}());
exports.LocationPopupService = LocationPopupService;

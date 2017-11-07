"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var LocationDetailComponent = /** @class */ (function () {
    function LocationDetailComponent(eventManager, locationService, route) {
        this.eventManager = eventManager;
        this.locationService = locationService;
        this.route = route;
    }
    LocationDetailComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.subscription = this.route.params.subscribe(function (params) {
            _this.load(params['id']);
        });
        this.registerChangeInLocations();
    };
    LocationDetailComponent.prototype.load = function (id) {
        var _this = this;
        this.locationService.find(id).subscribe(function (location) {
            _this.location = location;
        });
    };
    LocationDetailComponent.prototype.previousState = function () {
        window.history.back();
    };
    LocationDetailComponent.prototype.ngOnDestroy = function () {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    };
    LocationDetailComponent.prototype.registerChangeInLocations = function () {
        var _this = this;
        this.eventSubscriber = this.eventManager.subscribe('locationListModification', function (response) { return _this.load(_this.location.id); });
    };
    LocationDetailComponent = __decorate([
        core_1.Component({
            selector: 'jhi-location-detail',
            templateUrl: './location-detail.component.html'
        })
    ], LocationDetailComponent);
    return LocationDetailComponent;
}());
exports.LocationDetailComponent = LocationDetailComponent;

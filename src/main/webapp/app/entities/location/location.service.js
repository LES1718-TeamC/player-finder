"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var app_constants_1 = require("../../app.constants");
var location_model_1 = require("./location.model");
var shared_1 = require("../../shared");
var LocationService = /** @class */ (function () {
    function LocationService(http) {
        this.http = http;
        this.resourceUrl = app_constants_1.SERVER_API_URL + 'api/locations';
        this.resourceSearchUrl = app_constants_1.SERVER_API_URL + 'api/_search/locations';
    }
    LocationService.prototype.create = function (location) {
        var _this = this;
        var copy = this.convert(location);
        return this.http.post(this.resourceUrl, copy).map(function (res) {
            var jsonResponse = res.json();
            return _this.convertItemFromServer(jsonResponse);
        });
    };
    LocationService.prototype.update = function (location) {
        var _this = this;
        var copy = this.convert(location);
        return this.http.put(this.resourceUrl, copy).map(function (res) {
            var jsonResponse = res.json();
            return _this.convertItemFromServer(jsonResponse);
        });
    };
    LocationService.prototype.find = function (id) {
        var _this = this;
        return this.http.get(this.resourceUrl + "/" + id).map(function (res) {
            var jsonResponse = res.json();
            return _this.convertItemFromServer(jsonResponse);
        });
    };
    LocationService.prototype.query = function (req) {
        var _this = this;
        var options = shared_1.createRequestOption(req);
        return this.http.get(this.resourceUrl, options)
            .map(function (res) { return _this.convertResponse(res); });
    };
    LocationService.prototype.delete = function (id) {
        return this.http.delete(this.resourceUrl + "/" + id);
    };
    LocationService.prototype.search = function (req) {
        var _this = this;
        var options = shared_1.createRequestOption(req);
        return this.http.get(this.resourceSearchUrl, options)
            .map(function (res) { return _this.convertResponse(res); });
    };
    LocationService.prototype.convertResponse = function (res) {
        var jsonResponse = res.json();
        var result = [];
        for (var i = 0; i < jsonResponse.length; i++) {
            result.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return new shared_1.ResponseWrapper(res.headers, result, res.status);
    };
    /**
     * Convert a returned JSON object to Location.
     */
    LocationService.prototype.convertItemFromServer = function (json) {
        var entity = Object.assign(new location_model_1.Location(), json);
        return entity;
    };
    /**
     * Convert a Location to a JSON which can be sent to the server.
     */
    LocationService.prototype.convert = function (location) {
        var copy = Object.assign({}, location);
        return copy;
    };
    LocationService = __decorate([
        core_1.Injectable()
    ], LocationService);
    return LocationService;
}());
exports.LocationService = LocationService;

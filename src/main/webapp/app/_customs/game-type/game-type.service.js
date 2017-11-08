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
var game_type_model_1 = require("./game-type.model");
var shared_1 = require("../../shared");
var GameTypeService = /** @class */ (function () {
    function GameTypeService(http) {
        this.http = http;
        this.resourceUrl = app_constants_1.SERVER_API_URL + 'api/game-types';
        this.resourceSearchUrl = app_constants_1.SERVER_API_URL + 'api/_search/game-types';
    }
    GameTypeService.prototype.create = function (gameType) {
        var _this = this;
        var copy = this.convert(gameType);
        return this.http.post(this.resourceUrl, copy).map(function (res) {
            var jsonResponse = res.json();
            return _this.convertItemFromServer(jsonResponse);
        });
    };
    GameTypeService.prototype.update = function (gameType) {
        var _this = this;
        var copy = this.convert(gameType);
        return this.http.put(this.resourceUrl, copy).map(function (res) {
            var jsonResponse = res.json();
            return _this.convertItemFromServer(jsonResponse);
        });
    };
    GameTypeService.prototype.find = function (id) {
        var _this = this;
        return this.http.get(this.resourceUrl + "/" + id).map(function (res) {
            var jsonResponse = res.json();
            return _this.convertItemFromServer(jsonResponse);
        });
    };
    GameTypeService.prototype.query = function (req) {
        var _this = this;
        var options = shared_1.createRequestOption(req);
        return this.http.get(this.resourceUrl, options)
            .map(function (res) { return _this.convertResponse(res); });
    };
    GameTypeService.prototype.delete = function (id) {
        return this.http.delete(this.resourceUrl + "/" + id);
    };
    GameTypeService.prototype.search = function (req) {
        var _this = this;
        var options = shared_1.createRequestOption(req);
        return this.http.get(this.resourceSearchUrl, options)
            .map(function (res) { return _this.convertResponse(res); });
    };
    GameTypeService.prototype.convertResponse = function (res) {
        var jsonResponse = res.json();
        var result = [];
        for (var i = 0; i < jsonResponse.length; i++) {
            result.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return new shared_1.ResponseWrapper(res.headers, result, res.status);
    };
    /**
     * Convert a returned JSON object to GameType.
     */
    GameTypeService.prototype.convertItemFromServer = function (json) {
        var entity = Object.assign(new game_type_model_1.GameType(), json);
        return entity;
    };
    /**
     * Convert a GameType to a JSON which can be sent to the server.
     */
    GameTypeService.prototype.convert = function (gameType) {
        var copy = Object.assign({}, gameType);
        return copy;
    };
    GameTypeService = __decorate([
        core_1.Injectable()
    ], GameTypeService);
    return GameTypeService;
}());
exports.GameTypeService = GameTypeService;

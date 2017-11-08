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
var game_model_1 = require("./game.model");
var shared_1 = require("../../shared");
var GameService = /** @class */ (function () {
    function GameService(http, dateUtils) {
        this.http = http;
        this.dateUtils = dateUtils;
        this.resourceUrl = app_constants_1.SERVER_API_URL + 'api/games';
        this.resourceSearchUrl = app_constants_1.SERVER_API_URL + 'api/_search/games';
    }
    GameService.prototype.create = function (game) {
        var _this = this;
        var copy = this.convert(game);
        return this.http.post(this.resourceUrl, copy).map(function (res) {
            var jsonResponse = res.json();
            return _this.convertItemFromServer(jsonResponse);
        });
    };
    GameService.prototype.update = function (game) {
        var _this = this;
        var copy = this.convert(game);
        return this.http.put(this.resourceUrl, copy).map(function (res) {
            var jsonResponse = res.json();
            return _this.convertItemFromServer(jsonResponse);
        });
    };
    GameService.prototype.find = function (id) {
        var _this = this;
        return this.http.get(this.resourceUrl + "/" + id).map(function (res) {
            var jsonResponse = res.json();
            return _this.convertItemFromServer(jsonResponse);
        });
    };
    GameService.prototype.query = function (req) {
        var _this = this;
        var options = shared_1.createRequestOption(req);
        return this.http.get(this.resourceUrl, options)
            .map(function (res) { return _this.convertResponse(res); });
    };
    GameService.prototype.delete = function (id) {
        return this.http.delete(this.resourceUrl + "/" + id);
    };
    GameService.prototype.search = function (req) {
        var _this = this;
        var options = shared_1.createRequestOption(req);
        return this.http.get(this.resourceSearchUrl, options)
            .map(function (res) { return _this.convertResponse(res); });
    };
    GameService.prototype.convertResponse = function (res) {
        var jsonResponse = res.json();
        var result = [];
        for (var i = 0; i < jsonResponse.length; i++) {
            result.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return new shared_1.ResponseWrapper(res.headers, result, res.status);
    };
    /**
     * Convert a returned JSON object to Game.
     */
    GameService.prototype.convertItemFromServer = function (json) {
        var entity = Object.assign(new game_model_1.Game(), json);
        entity.beginTime = this.dateUtils
            .convertDateTimeFromServer(json.beginTime);
        return entity;
    };
    /**
     * Convert a Game to a JSON which can be sent to the server.
     */
    GameService.prototype.convert = function (game) {
        var copy = Object.assign({}, game);
        copy.beginTime = this.dateUtils.toDate(game.beginTime);
        return copy;
    };
    GameService = __decorate([
        core_1.Injectable()
    ], GameService);
    return GameService;
}());
exports.GameService = GameService;

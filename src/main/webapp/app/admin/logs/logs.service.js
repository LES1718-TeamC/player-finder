"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var LogsService = /** @class */ (function () {
    function LogsService(http) {
        this.http = http;
    }
    LogsService.prototype.changeLevel = function (log) {
        return this.http.put('management/logs', log);
    };
    LogsService.prototype.findAll = function () {
        return this.http.get('management/logs').map(function (res) { return res.json(); });
    };
    LogsService = __decorate([
        core_1.Injectable()
    ], LogsService);
    return LogsService;
}());
exports.LogsService = LogsService;

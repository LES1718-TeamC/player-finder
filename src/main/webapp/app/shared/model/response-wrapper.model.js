"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ResponseWrapper = /** @class */ (function () {
    function ResponseWrapper(headers, json, status) {
        this.headers = headers;
        this.json = json;
        this.status = status;
    }
    return ResponseWrapper;
}());
exports.ResponseWrapper = ResponseWrapper;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Audit = /** @class */ (function () {
    function Audit(data, principal, timestamp, type) {
        this.data = data;
        this.principal = principal;
        this.timestamp = timestamp;
        this.type = type;
    }
    return Audit;
}());
exports.Audit = Audit;

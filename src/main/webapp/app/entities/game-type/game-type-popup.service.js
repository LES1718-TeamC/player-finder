"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var game_type_model_1 = require("./game-type.model");
var GameTypePopupService = /** @class */ (function () {
    function GameTypePopupService(modalService, router, gameTypeService) {
        this.modalService = modalService;
        this.router = router;
        this.gameTypeService = gameTypeService;
        this.ngbModalRef = null;
    }
    GameTypePopupService.prototype.open = function (component, id) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var isOpen = _this.ngbModalRef !== null;
            if (isOpen) {
                resolve(_this.ngbModalRef);
            }
            if (id) {
                _this.gameTypeService.find(id).subscribe(function (gameType) {
                    _this.ngbModalRef = _this.gameTypeModalRef(component, gameType);
                    resolve(_this.ngbModalRef);
                });
            }
            else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(function () {
                    _this.ngbModalRef = _this.gameTypeModalRef(component, new game_type_model_1.GameType());
                    resolve(_this.ngbModalRef);
                }, 0);
            }
        });
    };
    GameTypePopupService.prototype.gameTypeModalRef = function (component, gameType) {
        var _this = this;
        var modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static' });
        modalRef.componentInstance.gameType = gameType;
        modalRef.result.then(function (result) {
            _this.router.navigate([{ outlets: { popup: null } }], { replaceUrl: true });
            _this.ngbModalRef = null;
        }, function (reason) {
            _this.router.navigate([{ outlets: { popup: null } }], { replaceUrl: true });
            _this.ngbModalRef = null;
        });
        return modalRef;
    };
    GameTypePopupService = __decorate([
        core_1.Injectable()
    ], GameTypePopupService);
    return GameTypePopupService;
}());
exports.GameTypePopupService = GameTypePopupService;

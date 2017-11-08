"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var games_model_1 = require("./games.model");
var GamePopupService = /** @class */ (function () {
    function GamePopupService(datePipe, modalService, router, gameService) {
        this.datePipe = datePipe;
        this.modalService = modalService;
        this.router = router;
        this.gameService = gameService;
        this.ngbModalRef = null;
    }
    GamePopupService.prototype.open = function (component, id) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var isOpen = _this.ngbModalRef !== null;
            if (isOpen) {
                resolve(_this.ngbModalRef);
            }
            if (id) {
                _this.gameService.find(id).subscribe(function (game) {
                    game.beginTime = _this.datePipe
                        .transform(game.beginTime, 'yyyy-MM-ddTHH:mm:ss');
                    game.endTime = _this.datePipe
                        .transform(game.endTime, 'yyyy-MM-ddTHH:mm:ss');
                    _this.ngbModalRef = _this.gameModalRef(component, game);
                    resolve(_this.ngbModalRef);
                });
            }
            else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(function () {
                    _this.ngbModalRef = _this.gameModalRef(component, new games_model_1.Game());
                    resolve(_this.ngbModalRef);
                }, 0);
            }
        });
    };
    GamePopupService.prototype.gameModalRef = function (component, game) {
        var _this = this;
        var modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static' });
        modalRef.componentInstance.game = game;
        modalRef.result.then(function (result) {
            _this.router.navigate([{ outlets: { popup: null } }], { replaceUrl: true });
            _this.ngbModalRef = null;
        }, function (reason) {
            _this.router.navigate([{ outlets: { popup: null } }], { replaceUrl: true });
            _this.ngbModalRef = null;
        });
        return modalRef;
    };
    GamePopupService = __decorate([
        core_1.Injectable()
    ], GamePopupService);
    return GamePopupService;
}());
exports.GamePopupService = GamePopupService;

"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var shared_1 = require("../../shared");
var UserModalService = /** @class */ (function () {
    function UserModalService(modalService, router, userService) {
        this.modalService = modalService;
        this.router = router;
        this.userService = userService;
        this.isOpen = false;
    }
    UserModalService.prototype.open = function (component, login) {
        var _this = this;
        if (this.isOpen) {
            return;
        }
        this.isOpen = true;
        if (login) {
            this.userService.find(login).subscribe(function (user) { return _this.userModalRef(component, user); });
        }
        else {
            return this.userModalRef(component, new shared_1.User());
        }
    };
    UserModalService.prototype.userModalRef = function (component, user) {
        var _this = this;
        var modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static' });
        modalRef.componentInstance.user = user;
        modalRef.result.then(function (result) {
            _this.router.navigate([{ outlets: { popup: null } }], { replaceUrl: true });
            _this.isOpen = false;
        }, function (reason) {
            _this.router.navigate([{ outlets: { popup: null } }], { replaceUrl: true });
            _this.isOpen = false;
        });
        return modalRef;
    };
    UserModalService = __decorate([
        core_1.Injectable()
    ], UserModalService);
    return UserModalService;
}());
exports.UserModalService = UserModalService;

"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var ActiveMenuDirective = /** @class */ (function () {
    function ActiveMenuDirective(el, renderer, translateService) {
        this.el = el;
        this.renderer = renderer;
        this.translateService = translateService;
    }
    ActiveMenuDirective.prototype.ngOnInit = function () {
        var _this = this;
        this.translateService.onLangChange.subscribe(function (event) {
            _this.updateActiveFlag(event.lang);
        });
        this.updateActiveFlag(this.translateService.currentLang);
    };
    ActiveMenuDirective.prototype.updateActiveFlag = function (selectedLanguage) {
        if (this.jhiActiveMenu === selectedLanguage) {
            this.renderer.setElementClass(this.el.nativeElement, 'active', true);
        }
        else {
            this.renderer.setElementClass(this.el.nativeElement, 'active', false);
        }
    };
    __decorate([
        core_1.Input()
    ], ActiveMenuDirective.prototype, "jhiActiveMenu", void 0);
    ActiveMenuDirective = __decorate([
        core_1.Directive({
            selector: '[jhiActiveMenu]'
        })
    ], ActiveMenuDirective);
    return ActiveMenuDirective;
}());
exports.ActiveMenuDirective = ActiveMenuDirective;

"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var JhiConfigurationComponent = /** @class */ (function () {
    function JhiConfigurationComponent(configurationService) {
        this.configurationService = configurationService;
        this.allConfiguration = null;
        this.configuration = null;
        this.configKeys = [];
        this.filter = '';
        this.orderProp = 'prefix';
        this.reverse = false;
    }
    JhiConfigurationComponent.prototype.keys = function (dict) {
        return (dict === undefined) ? [] : Object.keys(dict);
    };
    JhiConfigurationComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.configurationService.get().subscribe(function (configuration) {
            _this.configuration = configuration;
            for (var _i = 0, configuration_1 = configuration; _i < configuration_1.length; _i++) {
                var config = configuration_1[_i];
                if (config.properties !== undefined) {
                    _this.configKeys.push(Object.keys(config.properties));
                }
            }
        });
        this.configurationService.getEnv().subscribe(function (configuration) {
            _this.allConfiguration = configuration;
        });
    };
    JhiConfigurationComponent = __decorate([
        core_1.Component({
            selector: 'jhi-configuration',
            templateUrl: './configuration.component.html'
        })
    ], JhiConfigurationComponent);
    return JhiConfigurationComponent;
}());
exports.JhiConfigurationComponent = JhiConfigurationComponent;

"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var health_modal_component_1 = require("./health-modal.component");
var JhiHealthCheckComponent = /** @class */ (function () {
    function JhiHealthCheckComponent(modalService, healthService) {
        this.modalService = modalService;
        this.healthService = healthService;
    }
    JhiHealthCheckComponent.prototype.ngOnInit = function () {
        this.refresh();
    };
    JhiHealthCheckComponent.prototype.baseName = function (name) {
        return this.healthService.getBaseName(name);
    };
    JhiHealthCheckComponent.prototype.getBadgeClass = function (statusState) {
        if (statusState === 'UP') {
            return 'badge-success';
        }
        else {
            return 'badge-danger';
        }
    };
    JhiHealthCheckComponent.prototype.refresh = function () {
        var _this = this;
        this.updatingHealth = true;
        this.healthService.checkHealth().subscribe(function (health) {
            _this.healthData = _this.healthService.transformHealthData(health);
            _this.updatingHealth = false;
        }, function (error) {
            if (error.status === 503) {
                _this.healthData = _this.healthService.transformHealthData(error.json());
                _this.updatingHealth = false;
            }
        });
    };
    JhiHealthCheckComponent.prototype.showHealth = function (health) {
        var modalRef = this.modalService.open(health_modal_component_1.JhiHealthModalComponent);
        modalRef.componentInstance.currentHealth = health;
        modalRef.result.then(function (result) {
            // Left blank intentionally, nothing to do here
        }, function (reason) {
            // Left blank intentionally, nothing to do here
        });
    };
    JhiHealthCheckComponent.prototype.subSystemName = function (name) {
        return this.healthService.getSubSystemName(name);
    };
    JhiHealthCheckComponent = __decorate([
        core_1.Component({
            selector: 'jhi-health',
            templateUrl: './health.component.html'
        })
    ], JhiHealthCheckComponent);
    return JhiHealthCheckComponent;
}());
exports.JhiHealthCheckComponent = JhiHealthCheckComponent;

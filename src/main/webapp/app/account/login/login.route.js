"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var shared_1 = require("../../shared");
var login_component_1 = require("./login.component");
exports.loginRoute = {
    path: 'login',
    component: login_component_1.LoginComponent,
    data: {
        authorities: [],
        pageTitle: 'login.title'
    },
    canActivate: [shared_1.UserRouteAccessService]
};

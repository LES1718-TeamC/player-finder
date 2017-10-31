"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var shared_1 = require("../../shared");
var social_register_component_1 = require("./social-register.component");
var social_auth_component_1 = require("./social-auth.component");
exports.socialRegisterRoute = {
    path: 'social-register/:provider?{success:boolean}',
    component: social_register_component_1.SocialRegisterComponent,
    data: {
        authorities: [],
        pageTitle: 'social.register.title'
    },
    canActivate: [shared_1.UserRouteAccessService]
};
exports.socialAuthRoute = {
    path: 'social-auth',
    component: social_auth_component_1.SocialAuthComponent,
    data: {
        authorities: [],
        pageTitle: 'social.register.title'
    },
    canActivate: [shared_1.UserRouteAccessService]
};

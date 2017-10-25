import './vendor.ts';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Ng2Webstorage } from 'ng2-webstorage';

import { PlayerFinderSharedModule, UserRouteAccessService } from './shared';
import { PlayerFinderHomeModule } from './home/home.module';
import { PlayerFinderAdminModule } from './admin/admin.module';
import { PlayerFinderAccountModule } from './account/account.module';
import { PlayerFinderEntityModule } from './entities/entity.module';

import { customHttpProvider } from './blocks/interceptor/http.provider';
import { PaginationConfig } from './blocks/config/uib-pagination.config';

// Mine
import { AngularFontAwesomeModule } from 'angular-font-awesome/angular-font-awesome';

// jhipster-needle-angular-add-module-import JHipster will add new module here

import {
    JhiMainComponent,
    LayoutRoutingModule,
    NavbarComponent,
    FooterComponent,
    ProfileService,
    PageRibbonComponent,
    ActiveMenuDirective,
    ErrorComponent
} from './layouts';

@NgModule({
    imports: [
        BrowserModule,
        LayoutRoutingModule,
        Ng2Webstorage.forRoot({ prefix: 'jhi', separator: '-'}),
        PlayerFinderSharedModule,
        PlayerFinderHomeModule,
        PlayerFinderAdminModule,
        PlayerFinderAccountModule,
        PlayerFinderEntityModule,
        // jhipster-needle-angular-add-module JHipster will add new module here
        AngularFontAwesomeModule,
    ],
    declarations: [
        JhiMainComponent,
        NavbarComponent,
        ErrorComponent,
        PageRibbonComponent,
        ActiveMenuDirective,
        FooterComponent
    ],
    providers: [
        ProfileService,
        customHttpProvider(),
        PaginationConfig,
        UserRouteAccessService
    ],
    bootstrap: [ JhiMainComponent ]
})
export class PlayerFinderAppModule {}

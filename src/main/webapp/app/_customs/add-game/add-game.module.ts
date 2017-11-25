import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { PlayerFinderSharedModule } from '../../shared';
import { PlayerFinderAdminModule } from '../../admin/admin.module';
import {
    GameService,
    GamePopupService,
    AddGameComponent,
    GameDetailComponent,
    gameRoute,
    gamePopupRoute,
    GamesResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...gameRoute,
    ...gamePopupRoute,
];

@NgModule({
    imports: [
        PlayerFinderSharedModule,
        PlayerFinderAdminModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        AddGameComponent,
        GameDetailComponent,
    ],
    entryComponents: [
        AddGameComponent,
    ],
    providers: [
        GameService,
        GamePopupService,
        GamesResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PlayerFinderAddGameModule {}

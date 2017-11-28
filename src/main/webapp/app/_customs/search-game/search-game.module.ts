import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { PlayerFinderSharedModule } from '../../shared';
import { PlayerFinderAdminModule } from '../../admin/admin.module';
import {
    GamePopupService,
    SearchGameComponent,
    GameDetailComponent,
    GameDialogComponent,
    GamePopupComponent,
    GameDeletePopupComponent,
    GameDeleteDialogComponent,
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
        SearchGameComponent,
        GameDetailComponent,
        GameDialogComponent,
        GameDeleteDialogComponent,
        GamePopupComponent,
        GameDeletePopupComponent,
    ],
    entryComponents: [
        SearchGameComponent,
        GameDialogComponent,
        GamePopupComponent,
        GameDeleteDialogComponent,
        GameDeletePopupComponent,
    ],
    providers: [
        GamePopupService,
        GamesResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PlayerFinderSearchGameModule {}

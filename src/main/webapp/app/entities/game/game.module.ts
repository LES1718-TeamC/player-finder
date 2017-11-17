import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { PlayerFinderSharedModule } from '../../shared';
import { PlayerFinderAdminModule } from '../../admin/admin.module';
import {
    GameService,
    GamePopupService,
    GameComponent,
    GameDetailComponent,
    GameDialogComponent,
    GamePopupComponent,
    GameDeletePopupComponent,
    GameDeleteDialogComponent,
    gameRoute,
    gamePopupRoute,
    GameResolvePagingParams,
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
        GameComponent,
        GameDetailComponent,
        GameDialogComponent,
        GameDeleteDialogComponent,
        GamePopupComponent,
        GameDeletePopupComponent,
    ],
    entryComponents: [
        GameComponent,
        GameDialogComponent,
        GamePopupComponent,
        GameDeleteDialogComponent,
        GameDeletePopupComponent,
    ],
    providers: [
        GameService,
        GamePopupService,
        GameResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PlayerFinderGameModule {}

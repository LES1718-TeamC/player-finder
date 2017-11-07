import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { PlayerFinderSharedModule } from '../../shared';
import {
    GameTypeService,
    GameTypePopupService,
    GameTypeComponent,
    GameTypeDetailComponent,
    GameTypeDialogComponent,
    GameTypePopupComponent,
    GameTypeDeletePopupComponent,
    GameTypeDeleteDialogComponent,
    gameTypeRoute,
    gameTypePopupRoute,
    GameTypeResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...gameTypeRoute,
    ...gameTypePopupRoute,
];

@NgModule({
    imports: [
        PlayerFinderSharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        GameTypeComponent,
        GameTypeDetailComponent,
        GameTypeDialogComponent,
        GameTypeDeleteDialogComponent,
        GameTypePopupComponent,
        GameTypeDeletePopupComponent,
    ],
    entryComponents: [
        GameTypeComponent,
        GameTypeDialogComponent,
        GameTypePopupComponent,
        GameTypeDeleteDialogComponent,
        GameTypeDeletePopupComponent,
    ],
    providers: [
        GameTypeService,
        GameTypePopupService,
        GameTypeResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PlayerFinderGameTypeModule {}

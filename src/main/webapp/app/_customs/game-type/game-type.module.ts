import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { PlayerFinderSharedModule } from '../../shared';
import {
    GameTypeService,
    GameTypePopupService,
    GameTypeDialogComponent,
    GameTypePopupComponent,
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
        GameTypeDialogComponent,
        GameTypePopupComponent,
    ],
    entryComponents: [
        GameTypeDialogComponent,
        GameTypePopupComponent,
    ],
    providers: [
        GameTypeService,
        GameTypePopupService,
        GameTypeResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PlayerFinderGameTypeModule {}

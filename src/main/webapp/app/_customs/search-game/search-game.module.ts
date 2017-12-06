import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';

import {PlayerFinderSharedModule} from '../../shared';
import {PlayerFinderAdminModule} from '../../admin/admin.module';
import {gamePopupRoute, gameRoute, GamesResolvePagingParams} from './';
import {SearchGameComponent} from './search-game.component';
import {GameDeleteDialogComponent, GameDeletePopupComponent} from '../game/games-delete-dialog.component';
import {GameDialogComponent, GamePopupComponent} from '../game/games-dialog.component';
import {GamePopupService} from '../game/games-popup.service';
import {GameDetailComponent} from '../game/games-detail.component';

const ENTITY_STATES = [
    ...gameRoute,
    ...gamePopupRoute,
];

@NgModule({
    imports: [
        PlayerFinderSharedModule,
        PlayerFinderAdminModule,
        RouterModule.forRoot(ENTITY_STATES, {useHash: true})
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
        GamesResolvePagingParams,
        GamePopupService
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PlayerFinderSearchGameModule {
}

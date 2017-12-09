import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';

import {PlayerFinderSharedModule} from '../../shared';
import {PlayerFinderAdminModule} from '../../admin/admin.module';
import {gamePopupRoute, gameRoute, GamesResolvePagingParams} from './';
import {SearchGameComponent} from './search-game.component';
import {GameDeleteDialogComponent, GameDeletePopupComponent} from '../game/game-delete-dialog.component';
import {GameEditDialogComponent, GameEditPopupComponent} from '../game/game-edit-dialog.component';
import {GameDetailsDialogComponent, GameDetailsPopupComponent} from '../game/game-details-dialog.component';
import {GamePopupService} from '../game/game-popup.service';
import {GameDetailComponent} from '../game/game-detail.component';

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
        GameEditDialogComponent,
        GameDetailsDialogComponent,
        GameDeleteDialogComponent,
        GameEditPopupComponent,
        GameDetailsPopupComponent,
        GameDeletePopupComponent,
    ],
    entryComponents: [
        SearchGameComponent,
        GameEditPopupComponent,
        GameDetailsPopupComponent,
        GameEditDialogComponent,
        GameDetailsDialogComponent,
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

import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';

import {PlayerFinderSharedModule} from '../../shared';
import {PlayerFinderAdminModule} from '../../admin/admin.module';
import {gamePopupRoute, gameRoute, GamesResolvePagingParams} from './';
import {MyGamesComponent} from './my-games.component';
import {GameDeleteDialogComponent, GameDeletePopupComponent} from '../game/game-delete-dialog.component';
import {GameEditDialogComponent, GameEditPopupComponent} from '../game/game-edit-dialog.component';
import {GameDetailsDialogComponent, GameDetailsPopupComponent} from '../game/game-details-dialog.component';
import {GamePopupService} from '../game/game-popup.service';

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
        MyGamesComponent,
    ],
    entryComponents: [
        MyGamesComponent,
    ],
    providers: [
        GamesResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PlayerFinderMyGamesModule {
}

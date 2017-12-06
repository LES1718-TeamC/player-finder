import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';

import {PlayerFinderSharedModule} from '../../shared';
import {PlayerFinderAdminModule} from '../../admin/admin.module';
import {gamePopupRoute, gameRoute, GamesResolvePagingParams} from './';
import {SearchGameComponent} from './search-game.component';

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
        SearchGameComponent],
    entryComponents: [
        SearchGameComponent
    ],
    providers: [
        GamesResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PlayerFinderSearchGameModule {
}

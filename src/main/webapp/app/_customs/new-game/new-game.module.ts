import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {PlayerFinderSharedModule} from '../../shared';
import {PlayerFinderAdminModule} from '../../admin/admin.module';
import {CustomFormsModule} from 'ng2-validation';

import {
    gamePopupRoute,
    gameRoute,
    GamesResolvePagingParams,
    NewGameComponent,
} from './';

const ENTITY_STATES = [
    ...gameRoute,
    ...gamePopupRoute,
];

@NgModule({
    imports: [
        PlayerFinderSharedModule,
        PlayerFinderAdminModule,
        RouterModule.forRoot(ENTITY_STATES, {useHash: true}),
        CustomFormsModule
    ],
    declarations: [
        NewGameComponent,
    ],
    entryComponents: [
        NewGameComponent,
    ],
    providers: [
        GamesResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PlayerFinderAddGameModule {
}

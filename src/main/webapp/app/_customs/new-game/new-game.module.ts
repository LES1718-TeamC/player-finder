import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {PlayerFinderSharedModule} from '../../shared';
import {PlayerFinderAdminModule} from '../../admin/admin.module';
import {CustomFormsModule} from 'ng2-validation';

import {
    NewGameComponent,
    GameDeleteDialogComponent,
    GameDeletePopupComponent,
    GameDetailComponent,
    GameDialogComponent,
    GamePopupComponent,
    gamePopupRoute,
    GamePopupService,
    gameRoute,
    GameService,
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
        RouterModule.forRoot(ENTITY_STATES, {useHash: true}),
        CustomFormsModule
    ],
    declarations: [
        NewGameComponent,
        GameDetailComponent,
        GameDialogComponent,
        GameDeleteDialogComponent,
        GamePopupComponent,
        GameDeletePopupComponent,
    ],
    entryComponents: [
        NewGameComponent,
        GameDialogComponent,
        GamePopupComponent,
        GameDeleteDialogComponent,
        GameDeletePopupComponent,
    ],
    providers: [
        GameService,
        GamePopupService,
        GamesResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PlayerFinderAddGameModule {
}

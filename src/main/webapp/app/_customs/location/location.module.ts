import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { PlayerFinderSharedModule } from '../../shared';
import {
    LocationService,
    LocationPopupService,
    LocationDialogComponent,
    LocationPopupComponent,
    locationRoute,
    locationPopupRoute,
    LocationResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...locationRoute,
    ...locationPopupRoute,
];

@NgModule({
    imports: [
        PlayerFinderSharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        LocationDialogComponent,
        LocationPopupComponent,
    ],
    entryComponents: [
        LocationDialogComponent,
        LocationPopupComponent,
    ],
    providers: [
        LocationService,
        LocationPopupService,
        LocationResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PlayerFinderLocationModule {}

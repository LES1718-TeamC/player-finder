import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { PlayerFinderSharedModule } from '../../shared';
import { PlayerFinderAdminModule } from '../../admin/admin.module';
import {
    GameService,
} from './';

const ENTITY_STATES = [
];

@NgModule({
    imports: [
        PlayerFinderSharedModule,
        PlayerFinderAdminModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [

    ],
    entryComponents: [
    ],
    providers: [
        GameService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PlayerFinderGameModule {}

import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';

import {PlayerFinderAddGameModule} from './new-game/new-game.module';
import {PlayerFinderSearchGameModule} from './search-game/search-game.module';
import {PlayerFinderGameModule} from './game/game.module';
import {PlayerFinderMyGamesModule} from './my-games/my-games.module';
// import { PlayerFinderGameTypeModule } from './game-type/game-type.module';
// import { PlayerFinderLocationModule } from './location/location.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    imports: [
        PlayerFinderAddGameModule,
        PlayerFinderSearchGameModule,
        PlayerFinderGameModule,
        PlayerFinderMyGamesModule,
        // PlayerFinderGameTypeModule,
        // PlayerFinderLocationModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PlayerFinderCustomsModule {
}

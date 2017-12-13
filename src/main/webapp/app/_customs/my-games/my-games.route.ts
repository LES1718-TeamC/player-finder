import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot, Routes} from '@angular/router';

import {UserRouteAccessService} from '../../shared';
import {JhiPaginationUtil} from 'ng-jhipster';

import {MyGamesComponent} from './my-games.component';
import {GameEditPopupComponent} from '../game/game-edit-dialog.component';
import {GameDetailsPopupComponent} from '../game/game-details-dialog.component';
import {GameDeletePopupComponent} from '../game/game-delete-dialog.component';

@Injectable()
export class GamesResolvePagingParams implements Resolve<any> {

    constructor(private paginationUtil: JhiPaginationUtil) {
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const page = route.queryParams['page'] ? route.queryParams['page'] : '1';
        const sort = route.queryParams['sort'] ? route.queryParams['sort'] : 'id,asc';
        return {
            page: this.paginationUtil.parsePage(page),
            predicate: this.paginationUtil.parsePredicate(sort),
            ascending: this.paginationUtil.parseAscending(sort)
        };
    }
}

export const gameRoute: Routes = [
    {
        path: 'games/my',
        component: MyGamesComponent,
        resolve: {
            'pagingParams': GamesResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'playerFinderApp.game.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const gamePopupRoute: Routes = [

    {
        path: 'games/:id',
        component: GameDetailsPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'playerFinderApp.game.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'games/:id/edit',
        component: GameEditPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'playerFinderApp.game.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'games/:id/delete',
        component: GameDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'playerFinderApp.game.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }];

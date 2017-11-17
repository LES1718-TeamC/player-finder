import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { GameComponent } from './game.component';
import { GameDetailComponent } from './game-detail.component';
import { GamePopupComponent } from './game-dialog.component';
import { GameDeletePopupComponent } from './game-delete-dialog.component';

@Injectable()
export class GameResolvePagingParams implements Resolve<any> {

    constructor(private paginationUtil: JhiPaginationUtil) {}

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
        path: 'game',
        component: GameComponent,
        resolve: {
            'pagingParams': GameResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'playerFinderApp.game.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'game/:id',
        component: GameDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'playerFinderApp.game.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const gamePopupRoute: Routes = [
    {
        path: 'game-new',
        component: GamePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'playerFinderApp.game.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'game/:id/edit',
        component: GamePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'playerFinderApp.game.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'game/:id/delete',
        component: GameDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'playerFinderApp.game.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];

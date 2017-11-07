import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { GameTypeComponent } from './game-type.component';
import { GameTypeDetailComponent } from './game-type-detail.component';
import { GameTypePopupComponent } from './game-type-dialog.component';
import { GameTypeDeletePopupComponent } from './game-type-delete-dialog.component';

@Injectable()
export class GameTypeResolvePagingParams implements Resolve<any> {

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

export const gameTypeRoute: Routes = [
    {
        path: 'game-type',
        component: GameTypeComponent,
        resolve: {
            'pagingParams': GameTypeResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'playerFinderApp.gameType.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'game-type/:id',
        component: GameTypeDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'playerFinderApp.gameType.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const gameTypePopupRoute: Routes = [
    {
        path: 'game-type-new',
        component: GameTypePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'playerFinderApp.gameType.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'game-type/:id/edit',
        component: GameTypePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'playerFinderApp.gameType.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'game-type/:id/delete',
        component: GameTypeDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'playerFinderApp.gameType.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];

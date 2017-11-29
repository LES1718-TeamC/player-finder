import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Subscription} from 'rxjs/Rx';
import {JhiAlertService, JhiEventManager, JhiPaginationUtil, JhiParseLinks} from 'ng-jhipster';

import {Game} from '../game/game.model';
import {GameService} from '../game/game.service';
import {ITEMS_PER_PAGE, Principal, ResponseWrapper} from '../../shared';
import {PaginationConfig} from '../../blocks/config/uib-pagination.config';
import {User} from '../../shared/user/user.model';
import {Observable} from 'rxjs/Observable';
import {DatePipe} from '@angular/common';

@Component({
    selector: 'jhi-search-game',
    templateUrl: './search-game.component.html'
})
export class SearchGameComponent implements OnInit, OnDestroy {
    loggedUser: User;

    currentAccount: any;
    games: Game[];
    error: any;
    success: any;
    eventSubscriber: Subscription;
    currentSearch: string;
    routeData: any;
    links: any;
    totalItems: any;
    queryCount: any;
    itemsPerPage: any;
    page: any;
    predicate: any;
    previousPage: any;
    reverse: any;

    constructor(private gameService: GameService,
                private parseLinks: JhiParseLinks,
                private jhiAlertService: JhiAlertService,
                private principal: Principal,
                private activatedRoute: ActivatedRoute,
                private router: Router,
                private eventManager: JhiEventManager,
                private paginationUtil: JhiPaginationUtil,
                private paginationConfig: PaginationConfig,
                private datePipe: DatePipe) {
        this.itemsPerPage = ITEMS_PER_PAGE;
        this.routeData = this.activatedRoute.data.subscribe((data) => {
            this.page = data['pagingParams'].page;
            this.previousPage = data['pagingParams'].page;
            this.reverse = data['pagingParams'].ascending;
            this.predicate = data['pagingParams'].predicate;
        });
        this.currentSearch = activatedRoute.snapshot.params['search'] ? activatedRoute.snapshot.params['search'] : '';
        this.loggedUser = null;
        this.principal.identity().then((account) => {
            this.loggedUser = (account !== null && account.userName !== '') ? account : null;
        });
    }

    loadAll() {
        // if (this.currentSearch) {
        //     this.gameService.search({
        //         page: this.page - 1,
        //         query: this.currentSearch,
        //         size: this.itemsPerPage,
        //         sort: this.sort()
        //     }).subscribe(
        //         (res: ResponseWrapper) => {
        //             this.onSuccess(res.json, res.headers);
        //             console.log(res);
        //         },
        //         (res: ResponseWrapper) => this.onError(res.json)
        //     );
        //     return;
        // }
        this.gameService.query({
            page: this.page - 1,
            size: this.itemsPerPage,
            sort: this.sort()
        }).subscribe(
            (res: ResponseWrapper) => this.onSuccess(res.json, res.headers),
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }

    loadPage(page: number) {
        if (page !== this.previousPage) {
            this.previousPage = page;
            this.transition();
        }
    }

    transition() {
        this.router.navigate(['/game'], {
            queryParams:
                {
                    page: this.page,
                    size: this.itemsPerPage,
                    search: this.currentSearch,
                    sort: this.predicate + ',' + (this.reverse ? 'asc' : 'desc')
                }
        });
        this.loadAll();
    }

    clear() {
        this.page = 0;
        this.currentSearch = '';
        this.router.navigate(['/game', {
            page: this.page,
            sort: this.predicate + ',' + (this.reverse ? 'asc' : 'desc')
        }]);
        this.loadAll();
    }

    search(query) {
        if (!query) {
            return this.clear();
        }
        this.page = 0;
        this.currentSearch = query;
        this.router.navigate(['/game', {
            search: this.currentSearch,
            page: this.page,
            sort: this.predicate + ',' + (this.reverse ? 'asc' : 'desc')
        }]);
        this.loadAll();
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInGames();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: Game) {
        return item.id;
    }

    registerChangeInGames() {
        this.eventSubscriber = this.eventManager.subscribe('gameListModification', (response) => this.loadAll());
    }

    sort() {
        const result = [this.predicate + ',' + (this.reverse ? 'asc' : 'desc')];
        if (this.predicate !== 'id') {
            result.push('id');
        }
        return result;
    }

    private onSuccess(data, headers) {
        this.links = this.parseLinks.parse(headers.get('link'));
        this.totalItems = headers.get('X-Total-Count');
        this.queryCount = this.totalItems;
        // this.page = pagingParams.page;
        this.games = data;
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }

    loggedUserIsOwner(owner) {
        if (owner === null || this.loggedUser === null) {
            return false;
        }
        return owner.id === this.loggedUser.id;
    }

    loggedUserIsParticipant(game) {
        let found = false;
        if (game.players == null || this.loggedUser === null ) {
            return found;
        }

        game.players.forEach((player) => {
            if (player.id === this.loggedUser.id) {
                found = true;
            }
        });
        return found;
    }

    joinGame(game) {
        if (game.players === null) {
            game.players = [];
        }

        if (!this.loggedUserIsParticipant(game)) {
            game.players.push(this.loggedUser);
            game.beginTime = game.beginTime.toString();
            this.subscribeToSaveResponse(this.gameService.update(game));
        }
    }

    cancelSpot(game) {
        if (game.players !== null) {
            game.players = game.players.filter((player) => {
                return !(player.id === this.loggedUser.id);
            });
            game.beginTime = game.beginTime.toString();
            this.subscribeToSaveResponse(this.gameService.update(game));
        }
    }

    getAvailableSlots(game: Game) {
        if (game === null || game === undefined) {
            return 0;
        }
        return game.numberOfSlots - game.players.length;
    }

    hasSlotsLeft(game) {
        return this.getAvailableSlots(game) > 0
    }

    private subscribeToSaveResponse(result: Observable<Game>) {
        result.subscribe((res: Game) => this.onSaveSuccess(res));
    }

    private onSaveSuccess(result: Game) {
        this.eventManager.broadcast({name: 'gameListModification', content: 'OK'});
    }

}

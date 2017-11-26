import {Component, OnInit} from '@angular/core';
import {Response} from '@angular/http';

import {Observable} from 'rxjs/Rx';
import {JhiAlertService, JhiEventManager} from 'ng-jhipster';

import {Game, GameStatus} from './new-game.model';
import {GameService} from './new-game.service';
import {Location, LocationService} from '../../entities/location';
import {GameType, GameTypeService} from '../../entities/game-type';
import {ResponseWrapper, User} from '../../shared';
import {ActivatedRoute, Router} from '@angular/router';
import {Principal} from '../../shared/auth/principal.service';

@Component({
    selector: 'jhi-new-game',
    templateUrl: './new-game.component.html'
})
export class NewGameComponent implements OnInit {
    routeSub: any;
    game: Game;
    isSaving: boolean;

    locations: Location[];

    users: User[];

    gameTypes: GameType[];

    constructor(private principal: Principal,
                private jhiAlertService: JhiAlertService,
                private gameService: GameService,
                private locationService: LocationService,
                private gameTypeService: GameTypeService,
                private eventManager: JhiEventManager,
                private route: ActivatedRoute,
                private router: Router) {
        this.routeSub = this.route.params.subscribe((params) => {
            if (params['id']) {
                this.load(params['id']);
            } else {
                this.game = new Game();
            }
        });
    }

    load(id) {
        this.gameService.find(id).subscribe((game) => {
            this.principal.identity().then((account) => {
                if (account.id !== game.owner.id) {
                    this.router.navigate(['/']).then();
                }
                this.game = game;
            });
        });
    }

    ngOnInit() {
        this.isSaving = false;
        this.locationService
            .query({filter: 'game-is-null'})
            .subscribe((res: ResponseWrapper) => {
                if (!this.game.location || !this.game.location.id) {
                    this.locations = res.json;
                } else {
                    this.locationService
                        .find(this.game.location.id)
                        .subscribe((subRes: Location) => {
                            this.locations = [subRes].concat(res.json);
                        }, (subRes: ResponseWrapper) => this.onError(subRes.json));
                }
            }, (res: ResponseWrapper) => this.onError(res.json));
        this.gameTypeService
            .query({filter: 'game-is-null'})
            .subscribe((res: ResponseWrapper) => {
                if (!this.game.typeOfGame || !this.game.typeOfGame.id) {
                    this.gameTypes = res.json;
                } else {
                    this.gameTypeService
                        .find(this.game.typeOfGame.id)
                        .subscribe((subRes: GameType) => {
                            this.gameTypes = [subRes].concat(res.json);
                        }, (subRes: ResponseWrapper) => this.onError(subRes.json));
                }
            }, (res: ResponseWrapper) => this.onError(res.json));
    }

    clear() {
        return null;
    }

    save() {
        this.principal.identity().then((account) => {
            this.game.players = this.game.players === undefined ? [] : this.game.players;
            this.game.owner = account;
            this.game.gameStatus = GameStatus.ACTIVE;
            this.isSaving = true;

            if (this.game.id !== undefined) {
                this.subscribeToSaveResponse(this.gameService.update(this.game));
            } else {
                this.subscribeToSaveResponse(this.gameService.create(this.game));
            }
        });
    }

    trackLocationById(index: number, item: Location) {
        return item.id;
    }

    trackUserById(index: number, item: User) {
        return item.id;
    }

    trackGameTypeById(index: number, item: GameType) {
        return item.id;
    }

    // getSelected(selectedVals: Array<any>, option: any) {
    //     if (selectedVals) {
    //         for (let i = 0; i < selectedVals.length; i++) {
    //             if (option.id === selectedVals[i].id) {
    //                 return selectedVals[i];
    //             }
    //         }
    //     }
    //     return option;
    // }

    private subscribeToSaveResponse(result: Observable<Game>) {
        result.subscribe((res: Game) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: Game) {
        this.eventManager.broadcast({name: 'gameListModification', content: 'OK'});
        this.isSaving = false;
        this.router.navigate(['/games']).then();
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }
}

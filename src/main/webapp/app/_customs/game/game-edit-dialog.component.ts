import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Response} from '@angular/http';

import {Observable} from 'rxjs/Rx';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {JhiAlertService, JhiEventManager} from 'ng-jhipster';

import {Game} from './game.model';
import {GamePopupService} from './game-popup.service';
import {GameService} from './game.service';
import {Location, LocationService} from '../../entities/location';
import {GameType, GameTypeService} from '../../entities/game-type';
import {ResponseWrapper, User, UserService} from '../../shared';
import {Principal} from '../../shared/auth/principal.service';

@Component({
    selector: 'jhi-game-edit',
    templateUrl: './game-edit-dialog.component.html'
})
export class GameEditDialogComponent implements OnInit {
    loggedUser: User;
    game: Game;
    isSaving: boolean;

    locations: Location[];

    users: User[];

    typeOfGames: GameType[];

    constructor(private principal: Principal,
                public activeModal: NgbActiveModal,
                private jhiAlertService: JhiAlertService,
                private gameService: GameService,
                private locationService: LocationService,
                private userService: UserService,
                private gameTypeService: GameTypeService,
                private eventManager: JhiEventManager) {
        this.loggedUser = null;

    }

    ngOnInit() {
        this.principal.identity().then((account) => {
            this.loggedUser = (account !== null && account.userName !== '') ? account : null;
            if (!this.loggedUserIsOwner(this.game.owner)) {
                this.clear();
            }
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
            this.userService.query()
                .subscribe((res: ResponseWrapper) => {
                    this.users = res.json;
                }, (res: ResponseWrapper) => this.onError(res.json));
            this.gameTypeService
                .query({filter: 'game-is-null'})
                .subscribe((res: ResponseWrapper) => {
                    if (!this.game.typeOfGame || !this.game.typeOfGame.id) {
                        this.typeOfGames = res.json;
                    } else {
                        this.gameTypeService
                            .find(this.game.typeOfGame.id)
                            .subscribe((subRes: GameType) => {
                                this.typeOfGames = [subRes].concat(res.json);
                            }, (subRes: ResponseWrapper) => this.onError(subRes.json));
                    }
                }, (res: ResponseWrapper) => this.onError(res.json));
        });
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.game.id !== undefined) {
            this.subscribeToSaveResponse(
                this.gameService.update(this.game));
        } else {
            this.subscribeToSaveResponse(
                this.gameService.create(this.game));
        }
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

    getSelected(selectedVals: Array<any>, option: any) {
        if (selectedVals) {
            for (let i = 0; i < selectedVals.length; i++) {
                if (option.id === selectedVals[i].id) {
                    return selectedVals[i];
                }
            }
        }
        return option;
    }

    loggedUserIsOwner(owner) {
        if (owner === null || this.loggedUser === null) {
            return false;
        }
        return owner.id === this.loggedUser.id;
    }

    private subscribeToSaveResponse(result: Observable<Game>) {
        result.subscribe((res: Game) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: Game) {
        this.eventManager.broadcast({name: 'gameListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }
}

@Component({
    selector: 'jhi-game-popup',
    template: ''
})
export class GameEditPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(private route: ActivatedRoute,
                private gamePopupService: GamePopupService) {
    }

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if (params['id']) {
                this.gamePopupService
                    .open(GameEditDialogComponent as Component, params['id']);
            } else {
                this.gamePopupService
                    .open(GameEditDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}

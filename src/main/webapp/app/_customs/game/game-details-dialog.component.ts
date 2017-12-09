import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Response} from '@angular/http';

import {Observable} from 'rxjs/Rx';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {JhiAlertService, JhiEventManager} from 'ng-jhipster';

import {Game} from './game.model';
import {GamePopupService} from './game-popup.service';
import {GameService} from './game.service';
import { Location, LocationService } from '../../entities/location';
import { GameType, GameTypeService } from '../../entities/game-type';
import {ResponseWrapper, User, UserService} from '../../shared';

@Component({
    selector: 'jhi-game-details',
    templateUrl: './game-details-dialog.component.html'
})
export class GameDetailsDialogComponent implements OnInit {

    game: Game;
    isSaving: boolean;

    locations: Location[];

    users: User[];

    typeofgames: GameType[];

    constructor(public activeModal: NgbActiveModal,
                private jhiAlertService: JhiAlertService,
                private gameService: GameService,
                private locationService: LocationService,
                private userService: UserService,
                private gameTypeService: GameTypeService,
                private eventManager: JhiEventManager) {
    }

    ngOnInit() {
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
                    this.typeofgames = res.json;
                } else {
                    this.gameTypeService
                        .find(this.game.typeOfGame.id)
                        .subscribe((subRes: GameType) => {
                            this.typeofgames = [subRes].concat(res.json);
                        }, (subRes: ResponseWrapper) => this.onError(subRes.json));
                }
            }, (res: ResponseWrapper) => this.onError(res.json));
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
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
}

@Component({
    selector: 'jhi-game-popup',
    template: ''
})
export class GameDetailsPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(private route: ActivatedRoute,
                private gamePopupService: GamePopupService) {
    }

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if (params['id']) {
                this.gamePopupService
                    .open(GameDetailsDialogComponent as Component, params['id']);
            } else {
                this.gamePopupService
                    .open(GameDetailsDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}

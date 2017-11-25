import {Component, OnInit} from '@angular/core';
import {Response} from '@angular/http';

import {Observable} from 'rxjs/Rx';
import {JhiAlertService, JhiEventManager} from 'ng-jhipster';

import {Game} from './add-game.model';
import {GameService} from './add-game.service';
import {Location, LocationService} from '../../entities/location';
import {GameType, GameTypeService} from '../../entities/game-type';
import {ResponseWrapper, User, UserService} from '../../shared';
import {ActivatedRoute} from '@angular/router';
import {Principal} from "../../shared/auth/principal.service";

@Component({
    selector: 'jhi-add-game',
    templateUrl: './add-game.component.html'
})
export class AddGameComponent implements OnInit {

    game: Game;
    isSaving: boolean;

    locations: Location[];

    users: User[];

    gameTypes: GameType[];

    constructor(private principal: Principal,
                private jhiAlertService: JhiAlertService,
                private gameService: GameService,
                private locationService: LocationService,
                private userService: UserService,
                private gameTypeService: GameTypeService,
                private eventManager: JhiEventManager,
                private route: ActivatedRoute) {
        // this.route.params.subscribe(params => {
        //     if (params['id'] === null) {
                this.game = new Game();
            // }
            // In a real app: dispatch action to load the details here.
        // });
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
        // this.userService.query()
        //     .subscribe((res: ResponseWrapper) => {
        //         this.users = res.json;
        //     }, (res: ResponseWrapper) => this.onError(res.json));
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
            this.game.players = [];
            this.game.owner = account;
            // this.game.status = "ACTIVE";
            console.log(this.game);
            this.isSaving = true;
        });

    //     if (this.game.id !== undefined) {
    //         this.subscribeToSaveResponse(
    //             this.gameService.update(this.game));
    //     } else {
    //         this.subscribeToSaveResponse(
    //             this.gameService.create(this.game));
    //     }
    }

    private subscribeToSaveResponse(result: Observable<Game>) {
        result.subscribe((res: Game) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: Game) {
        this.eventManager.broadcast({name: 'gameListModification', content: 'OK'});
        this.isSaving = false;
    }

    private onSaveError() {
        this.isSaving = false;
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

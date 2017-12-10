import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

import {Subscription} from 'rxjs/Rx';
import {JhiEventManager} from 'ng-jhipster';

import {Game} from './game.model';
import {GamePopupService} from './game-popup.service';
import {GameService} from './game.service';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {User} from '../../shared/user/user.model';
import {Principal} from '../../shared/auth/principal.service';

@Component({
    selector: 'jhi-game-details',
    templateUrl: './game-details-dialog.component.html'
})
export class GameDetailsDialogComponent implements OnInit {
    loggedUser: User;

    game: Game;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(private principal: Principal,
                public activeModal: NgbActiveModal,
                private eventManager: JhiEventManager,
                private gameService: GameService,
                private route: ActivatedRoute) {
        this.loggedUser = null;
        this.principal.identity().then((account) => {
            this.loggedUser = (account !== null && account.userName !== '') ? account : null;
        });
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInGames();
    }

    load(id) {
        this.gameService.find(id).subscribe((game) => {
            this.game = game;
        });
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    // ngOnDestroy() {
    //     this.subscription.unsubscribe();
    //     this.eventManager.destroy(this.eventSubscriber);
    // }

    registerChangeInGames() {
        this.eventSubscriber = this.eventManager.subscribe(
            'gameListModification',
            (response) => this.load(this.game.id)
        );
    }

    loggedUserIsOwner(owner) {
        if (owner === null || this.loggedUser === null) {
            return false;
        }
        return owner.id === this.loggedUser.id;
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

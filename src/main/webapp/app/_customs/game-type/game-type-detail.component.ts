import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { GameType } from './game-type.model';
import { GameTypeService } from './game-type.service';

@Component({
    selector: 'jhi-game-type-detail',
    templateUrl: './game-type-detail.component.html'
})
export class GameTypeDetailComponent implements OnInit, OnDestroy {

    gameType: GameType;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private gameTypeService: GameTypeService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInGameTypes();
    }

    load(id) {
        this.gameTypeService.find(id).subscribe((gameType) => {
            this.gameType = gameType;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInGameTypes() {
        this.eventSubscriber = this.eventManager.subscribe(
            'gameTypeListModification',
            (response) => this.load(this.gameType.id)
        );
    }
}

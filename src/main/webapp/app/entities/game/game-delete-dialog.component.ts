import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Game } from './game.model';
import { GamePopupService } from './game-popup.service';
import { GameService } from './game.service';

@Component({
    selector: 'jhi-game-delete-dialog',
    templateUrl: './game-delete-dialog.component.html'
})
export class GameDeleteDialogComponent {

    game: Game;

    constructor(
        private gameService: GameService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.gameService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'gameListModification',
                content: 'Deleted an game'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-game-delete-popup',
    template: ''
})
export class GameDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private gamePopupService: GamePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.gamePopupService
                .open(GameDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}

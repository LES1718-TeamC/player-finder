import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { GameType } from './game-type.model';
import { GameTypePopupService } from './game-type-popup.service';
import { GameTypeService } from './game-type.service';

@Component({
    selector: 'jhi-game-type-delete-dialog',
    templateUrl: './game-type-delete-dialog.component.html'
})
export class GameTypeDeleteDialogComponent {

    gameType: GameType;

    constructor(
        private gameTypeService: GameTypeService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.gameTypeService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'gameTypeListModification',
                content: 'Deleted an gameType'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-game-type-delete-popup',
    template: ''
})
export class GameTypeDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private gameTypePopupService: GameTypePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.gameTypePopupService
                .open(GameTypeDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}

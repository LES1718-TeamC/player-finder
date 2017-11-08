import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { GameType } from './game-type.model';
import { GameTypePopupService } from './game-type-popup.service';
import { GameTypeService } from './game-type.service';

@Component({
    selector: 'jhi-game-type-dialog',
    templateUrl: './game-type-dialog.component.html'
})
export class GameTypeDialogComponent implements OnInit {

    gameType: GameType;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private gameTypeService: GameTypeService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.gameType.id !== undefined) {
            this.subscribeToSaveResponse(
                this.gameTypeService.update(this.gameType));
        } else {
            this.subscribeToSaveResponse(
                this.gameTypeService.create(this.gameType));
        }
    }

    private subscribeToSaveResponse(result: Observable<GameType>) {
        result.subscribe((res: GameType) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: GameType) {
        this.eventManager.broadcast({ name: 'gameTypeListModification', content: 'OK'});
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
    selector: 'jhi-game-type-popup',
    template: ''
})
export class GameTypePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private gameTypePopupService: GameTypePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.gameTypePopupService
                    .open(GameTypeDialogComponent as Component, params['id']);
            } else {
                this.gameTypePopupService
                    .open(GameTypeDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}

/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject } from '@angular/core/testing';
import { OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { PlayerFinderTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { GameDetailComponent } from '../../../../../../main/webapp/app/entities/game/game-detail.component';
import { GameService } from '../../../../../../main/webapp/app/entities/game/game.service';
import { Game } from '../../../../../../main/webapp/app/entities/game/game.model';

describe('Component Tests', () => {

    describe('Game Management Detail Component', () => {
        let comp: GameDetailComponent;
        let fixture: ComponentFixture<GameDetailComponent>;
        let service: GameService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [PlayerFinderTestModule],
                declarations: [GameDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    GameService,
                    JhiEventManager
                ]
            }).overrideTemplate(GameDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(GameDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(GameService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new Game(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.game).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});

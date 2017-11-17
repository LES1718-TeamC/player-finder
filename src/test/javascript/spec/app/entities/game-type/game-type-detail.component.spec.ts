/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject } from '@angular/core/testing';
import { OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { PlayerFinderTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { GameTypeDetailComponent } from '../../../../../../main/webapp/app/entities/game-type/game-type-detail.component';
import { GameTypeService } from '../../../../../../main/webapp/app/entities/game-type/game-type.service';
import { GameType } from '../../../../../../main/webapp/app/entities/game-type/game-type.model';

describe('Component Tests', () => {

    describe('GameType Management Detail Component', () => {
        let comp: GameTypeDetailComponent;
        let fixture: ComponentFixture<GameTypeDetailComponent>;
        let service: GameTypeService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [PlayerFinderTestModule],
                declarations: [GameTypeDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    GameTypeService,
                    JhiEventManager
                ]
            }).overrideTemplate(GameTypeDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(GameTypeDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(GameTypeService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new GameType(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.gameType).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});

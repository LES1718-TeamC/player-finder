import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { Game } from './game.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class GameService {

    private resourceUrl = SERVER_API_URL + 'api/games';

    constructor(private http: Http, private dateUtils: JhiDateUtils) { }

    create(game: Game): Observable<Game> {
        const copy = this.convert(game);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(game: Game): Observable<Game> {
        const copy = this.convert(game);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<Game> {
        return this.http.get(`${this.resourceUrl}/${id}`).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    query(req?: any): Observable<ResponseWrapper> {
        const options = createRequestOption(req);
        return this.http.get(this.resourceUrl, options)
            .map((res: Response) => this.convertResponse(res));
    }

    delete(id: number): Observable<Response> {
        return this.http.delete(`${this.resourceUrl}/${id}`);
    }

    private convertResponse(res: Response): ResponseWrapper {
        const jsonResponse = res.json();
        const result = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            result.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return new ResponseWrapper(res.headers, result, res.status);
    }

    /**
     * Convert a returned JSON object to Game.
     */
    private convertItemFromServer(json: any): Game {
        const entity: Game = Object.assign(new Game(), json);
        entity.beginTime = this.dateUtils
            .convertDateTimeFromServer(json.beginTime);
        return entity;
    }

    /**
     * Convert a Game to a JSON which can be sent to the server.
     */
    private convert(game: Game): Game {
        const copy: Game = Object.assign({}, game);

        copy.beginTime = this.dateUtils.toDate(game.beginTime);
        return copy;
    }
}

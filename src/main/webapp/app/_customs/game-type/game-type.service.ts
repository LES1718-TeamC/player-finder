import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { SERVER_API_URL } from '../../app.constants';

import { GameType } from './game-type.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class GameTypeService {

    private resourceUrl = SERVER_API_URL + 'api/game-types';

    constructor(private http: Http) { }

    create(gameType: GameType): Observable<GameType> {
        const copy = this.convert(gameType);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(gameType: GameType): Observable<GameType> {
        const copy = this.convert(gameType);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<GameType> {
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
     * Convert a returned JSON object to GameType.
     */
    private convertItemFromServer(json: any): GameType {
        const entity: GameType = Object.assign(new GameType(), json);
        return entity;
    }

    /**
     * Convert a GameType to a JSON which can be sent to the server.
     */
    private convert(gameType: GameType): GameType {
        const copy: GameType = Object.assign({}, gameType);
        return copy;
    }
}

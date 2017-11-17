import { BaseEntity } from './../../shared';

export const enum TypeOfGame {
    'SPORT',
    'ESPORT',
    'BOARD'
}

export class GameType implements BaseEntity {
    constructor(
        public id?: number,
        public title?: string,
        public type?: TypeOfGame,
    ) {
    }
}

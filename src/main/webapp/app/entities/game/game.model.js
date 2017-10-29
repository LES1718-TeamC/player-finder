"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Game = /** @class */ (function () {
    function Game(id, title, beginTime, endTime, numberOfPlayers, requiredNumberOfPlayers, gameStatus, description, location, owner, typeOfGame, players) {
        this.id = id;
        this.title = title;
        this.beginTime = beginTime;
        this.endTime = endTime;
        this.numberOfPlayers = numberOfPlayers;
        this.requiredNumberOfPlayers = requiredNumberOfPlayers;
        this.gameStatus = gameStatus;
        this.description = description;
        this.location = location;
        this.owner = owner;
        this.typeOfGame = typeOfGame;
        this.players = players;
    }
    return Game;
}());
exports.Game = Game;

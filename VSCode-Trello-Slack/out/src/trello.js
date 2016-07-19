"use strict";
var Trello = require("node-trello");
var TrelloClient = (function () {
    function TrelloClient(key, token) {
        this._key = key;
        this._token = token;
        this._trello = new Trello(this._key, this._token);
    }
    TrelloClient.prototype.testingT = function () {
        return "Hello!";
    };
    TrelloClient.prototype.getMyBoards = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this._trello.get("/1/members/me/boards", function (err, data) {
                if (err)
                    reject(err);
                _this._boards = new Array();
                _this._boardsIDs = new Array();
                for (var i = 0; i < data.length; i++) {
                    _this._boards.push(data[i].name);
                    _this._boardsIDs.push(data[i].id);
                }
                resolve(true);
            });
        });
    };
    TrelloClient.prototype.getBoardLists = function (boardID) {
        var _this = this;
        return new Promise(function (resolve, rejcet) {
            _this._trello.get("/1/boards/" + boardID + "/lists", function (err, data) {
                if (err)
                    throw err;
                console.log(data);
                _this._lists = new Array();
                _this._listsIDs = new Array();
                for (var i = 0; i < data.length; i++) {
                    _this._lists.push(data[i].name);
                    _this._listsIDs.push(data[i].id);
                }
                resolve(true);
            });
        });
    };
    // 
    TrelloClient.prototype._getAllCards = function (listID) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this._trello.get("/1/lists/" + listID + "/cards", function (err, data) {
                if (err)
                    throw err;
                console.log(data);
                _this._cards = new Array();
                _this._cardsIDs = new Array();
                for (var i = 0; i < data.length; i++) {
                    _this._cards.push(data[i].name);
                    _this._cardsIDs.push(data[i].id);
                }
                resolve(true);
            });
        });
    };
    TrelloClient.prototype._setCurCardID = function (currentCardName) {
        this.currentCard = currentCardName;
        for (var i = 0; i < this._cards.length; i++) {
            if (currentCardName == this._cards[i]) {
                var cid = this._cardsIDs[i];
            }
        }
        this.currentCID = cid;
    };
    TrelloClient.prototype._moveCurrentCardToList = function (newListID) {
        var _this = this;
        var putstring = "/1/cards/" + this.currentCID + "/";
        this._trello.put(putstring, { idList: newListID }, function (err, data) {
            console.log("currentID " + _this.currentCID + " new list ID " + newListID);
            console.log(err);
            if (err)
                throw err;
            console.log(data);
        });
    };
    TrelloClient.prototype._closeCard = function () {
        var putstring = "/1/cards/" + this.currentCID + "/";
        this._trello.put(putstring, { closed: true }, function (err, data) {
            console.log(err);
            if (err)
                throw err;
            console.log(data);
        });
    };
    return TrelloClient;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = TrelloClient;
//# sourceMappingURL=trello.js.map
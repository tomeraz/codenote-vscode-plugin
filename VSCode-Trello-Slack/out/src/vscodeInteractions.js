"use strict";
var vscode = require('vscode');
//This is for interacting with TrelloClient Object and VS UI
var _cards;
var currentCard;
var currentList;
var currentBoard;
var statusBarItem;
function ShowBoards(boards, boardsID) {
    return vscode.window.showQuickPick(boards).then(function (x) {
        console.log("ShowBoards: " + x);
        currentBoard = x;
        //go through name list and get correesponding selected ID
        for (var j = 0; j < boards.length; j++) {
            if (boards[j] == x) {
                exports.currentBID = boardsID[j];
            }
        }
        console.log("ShowBoards - current: " + exports.currentBID);
        return exports.currentBID;
    }, function (err) { return console.log(err); });
}
exports.ShowBoards = ShowBoards;
function ShowLists(lists, listsID) {
    return vscode.window.showQuickPick(lists).then(function (x) {
        currentList = x;
        //find ID for selected list
        for (var j = 0; j < lists.length; j++) {
            if (lists[j] == x) {
                exports.currentLID = listsID[j];
                console.log(exports.currentLID);
            }
        }
        return exports.currentLID;
        //this._getAllCards(this.lID);
    }, function (err) { });
}
exports.ShowLists = ShowLists;
function ShowCards(cards, cardsID) {
    return vscode.window.showQuickPick(cards).then(function (x) {
        console.log("console display:" + x);
        currentCard = x;
        //find ID for selected list
        for (var j = 0; j < cards.length; j++) {
            if (cards[j] == x) {
                exports.currentCID = cardsID[j];
            }
        }
        console.log(exports.currentCID);
        return x;
    }, function (err) { });
}
exports.ShowCards = ShowCards;
function AddToBar(message, boardname, listname, cardname, iconname) {
    if (!statusBarItem) {
        statusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left);
    }
    console.log("printing current cardname " + cardname);
    console.log("printing current list" + currentList);
    console.log("printing current board " + currentBoard);
    statusBarItem.text = (cardname) ?
        iconname + " " + message + " " + currentBoard + " $(chevron-right)" +
            currentList + " $(chevron-right)" + cardname : iconname + " " + message;
    statusBarItem.show();
    //createStatusBarItem(alignment?: StatusBarAlignment, priority?: number): StatusBarItem
}
exports.AddToBar = AddToBar;
function AddStatusIcon(iconName) {
    if (!statusBarItem) {
        statusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left);
    }
}
exports.AddStatusIcon = AddStatusIcon;
function InsertUserToken() {
    return vscode.window.showInputBox("Please paste in your user token, then hit 'Enter'.").then(function (x) {
        if (!x) {
            return vscode.window.showErrorMessage("need to paste your token in");
        }
        else {
            return x;
        }
    }, function (err) { });
}
exports.InsertUserToken = InsertUserToken;
function ShowError(errMessage) {
    vscode.window.showErrorMessage(errMessage);
}
exports.ShowError = ShowError;
function ShowMessage(infoMessage) {
    vscode.window.showInformationMessage(infoMessage);
}
exports.ShowMessage = ShowMessage;
//# sourceMappingURL=vscodeInteractions.js.map
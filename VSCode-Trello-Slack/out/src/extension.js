"use strict";
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
var vscode = require('vscode');
var trello_1 = require('./trello');
var vsInterface = require('./vscodeInteractions');
var open = require('open');
var trelloClient;
var token, extensionKey, currentBID, currentCID, currentLID;
// TODO: Ensure that the usertoken is stored somewhere - and configured, so that the user
// doesn't have to do this all the time
var appKey = '03e153ce92addad232ddc24891e07c60';
var _userToken = '6a24a45a3abceae8c163a22260a89fc157218e881727fba9a3fea98ef6b652d7';
// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
function activate(context) {
    // Use the console to output diagnostic information (console.log) and errors (console.error)
    // This line of code will only be executed once when your extension is activated
    console.log('Congratulations, your extension "txc" is now active!');
    // The command has been defined in the package.json file
    // Now provide the implementation of the command with  registerCommand
    // The commandId parameter must match the command field in package.json
    var disposable = vscode.commands.registerCommand('extension.sayHello', function () {
        // The code you place here will be executed every time your command is executed
        // Display a message box to the user
        vscode.window.showInformationMessage('Hello World!');
    });
    var login = vscode.commands.registerCommand('extension.loginToTrello', function () { return loginTrello(); });
    var getBoards = vscode.commands.registerCommand('extension.getAllBoards', function () { return getACard(); });
    var moveCardTL = vscode.commands.registerCommand('extension.mCCTNL', function () { return moveCurCardTL(); });
    var closeCurCard = vscode.commands.registerCommand('extension.closeCard', function () { return closeCurrentCard(); });
    context.subscriptions.push(disposable);
    context.subscriptions.push(login);
    context.subscriptions.push(moveCardTL);
    context.subscriptions.push(getBoards);
    context.subscriptions.push(closeCurCard);
}
exports.activate = activate;
function loginTrello() {
    //need to authenticate user
    // Display a message box to the user
    //vscode.window.showInformationMessage('Trying To Login');
    var authUrl = 'https://trello.com/1/authorize?key=' + appKey + '&expiration=never&response_type=token&scope=read,write,account';
    open(authUrl);
    createClient();
}
function loginTrelloTest() {
    createClient();
}
function createClient() {
    vsInterface.InsertUserToken().then(function (userToken) {
        console.log(userToken);
        _userToken = userToken;
        trelloClient = trelloClient || new trello_1.default(appKey, userToken);
        displayLoggedIn('Trello logged in');
    });
}
function getACardTest() {
    _userToken = '';
    trelloClient = trelloClient || new trello_1.default(appKey, '');
    getACard();
}
function getACard() {
    //getBoards from TrelloAPI
    //UPdate the UI with vscodeInteractions
    //repeat
    if (!_userToken) {
        vsInterface.ShowError("You are not LoggedIn. Use 'Trello: Login' command to Login.");
    }
    else {
        trelloClient.getMyBoards().then(function () {
            return vsInterface.ShowBoards(trelloClient._boards, trelloClient._boardsIDs);
        }).then(function (selectedBoard) {
            currentBID = selectedBoard;
            return trelloClient.getBoardLists(selectedBoard);
        }).then(function () {
            return vsInterface.ShowLists(trelloClient._lists, trelloClient._listsIDs);
        }).then(function (selectedList) {
            currentLID = selectedList;
            return trelloClient._getAllCards(selectedList);
        }).then(function () {
            return vsInterface.ShowCards(trelloClient._cards, trelloClient._cardsIDs);
        }).then(function (selectedCard) {
            trelloClient._setCurCardID(selectedCard);
            displayCardOnBottom(selectedCard);
            return (true);
        }, function (err) {
        });
    }
}
function moveCurCardTL() {
    if (!(trelloClient || trelloClient.currentCID)) {
        vsInterface.ShowError("You need to get a card before you try to move one.");
    }
    else {
        //ask user for a listName to move card || show user possible lists
        //if no current card, show user a error box and ask them to "Trello: Get A Card"
        vsInterface.ShowLists(trelloClient._lists, trelloClient._listsIDs).then(function (selectedList) {
            //moveCard to the specified List...
            //get new List ID then 
            trelloClient._moveCurrentCardToList(selectedList);
            displayCardOnBottom(trelloClient.currentCard);
        }, function (err) {
        });
    }
}
function closeCurrentCard() {
    if (!(trelloClient) || !(trelloClient.currentCID)) {
        vsInterface.ShowError("You need to get a card to work on.");
    }
    else {
        trelloClient._closeCard();
        vsInterface.AddToBar("Select a Card", '', '', '', '$(terminal)');
    }
}
function displayCardOnBottom(displayString) {
    vsInterface.AddToBar('', '', '', displayString, '$(file-text)');
}
function displayLoggedIn(loggedIn) {
    vsInterface.AddToBar(loggedIn, '', '', '', '$(person)');
}
//# sourceMappingURL=extension.js.map
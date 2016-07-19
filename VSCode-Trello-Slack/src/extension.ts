// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import * as vsInterface from './vscodeInteractions';

var open = require('open');

var token, extensionKey, currentBID, currentCID, currentLID


// TODO: Ensure that the usertoken is stored somewhere - and configured, so that the user
// doesn't have to do this all the time
const appKey = '03e153ce92addad232ddc24891e07c60';
var _userToken = '';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "txc" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with  registerCommand
	// The commandId parameter must match the command field in package.json
	var disposable = vscode.commands.registerCommand('extension.sayHello', () => { //this is like function () {} //anonymos don't change function
		// The code you place here will be executed every time your command is executed

		// Display a message box to the user
		vscode.window.showInformationMessage('Hello World!');

	});

	var postToTrello = vscode.commands.registerCommand('extension.postToTrello', () => postTaskToTrello());
	var postToSlack = vscode.commands.registerCommand('extension.postToSlack', () => postNoteToSlack());

	context.subscriptions.push(postToTrello);
	context.subscriptions.push(postToSlack);
}

function postNoteToSlack() {
	vscode.window.showInputBox({prompt: 'Please type your note and press enter',placeHolder:'Enter your note for Slack!!'})
		.then((val) => {
			vscode.window.showInformationMessage('Your input was ' + val);
			var querystring = require('querystring');
			var http = require('http');

			var postData = querystring.stringify({"message": " + val + "});

			var options = {
				hostname: 'http://192.168.1.65',
				port: '8080',
				path: '',
				method: 'POST',
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded',
					'Content-Length': postData.length
				}
			};

			var req = http.request(options, (res) => {
				//console.log(`STATUS: ${res.statusCode}`);
				//console.log(`HEADERS: ${JSON.stringify(res.headers)}`);
				res.setEncoding('utf8');
				res.on('data', (chunk) => {
				//	console.log(`BODY: ${chunk}`);
				});
				res.on('end', () => {
				//	console.log('No more data in response.')
				})
			});

			req.on('error', (e) => {
				//console.log(`problem with request: ${e.message}`);
			});

// write data to request body
			req.write(postData);
			req.end();

		});
}

function postTaskToTrello() {
	vscode.window.showInputBox({prompt: 'Please type your Task and press enter',placeHolder:'Enter your Task for Trello'})
		.then(val => {
			vscode.window.showInformationMessage('Your input was ' + val);

			var http = require('http');
			var myRes;

			http.get('http://192.168.1.62:3000/api/addCheckListItem?name=' + val, (res) => {
				//console.log(`Got response: ${res.statusCode}`);
				//myRes = res.statusCode;
				// consume response body
				res.resume();
			}).on('error', (e) => {
				//console.log(`Got error: ${e.message}`);
				//myRes = e.message;
			});
		});
}
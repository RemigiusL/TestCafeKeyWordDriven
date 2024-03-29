import {
	Selector
} from 'testcafe';
import XPath from './componentHelper/xpath-selector';
import { ClientFunction } from 'testcafe';
import makeDir from './componentHelper/makeDirHelper';
import logAppender from './componentHelper/logAppenderHelper';
import {
	configure,
	getLogger
} from 'log4js';
import slack_msg from './ComponentHelper/slack_msg_appenderHelper';
import slack_file from './ComponentHelper/slack_file_appenderHelper';
let faker = require('faker');

let rows = null

const getmyDir = new makeDir()
getmyDir.makeDir();

const getLogAppender = new logAppender()
const logger = getLogger();
logger.level = 'debug';
getLogAppender.info()

const slack_msg_append = new slack_msg()
const slack_file_append = new slack_file()


const fs = require('fs');
const readline = require('readline');
const {
	google
} = require('googleapis');

/*
|--------------------------------------------------------------------------
| Keyword Driven Framework by Google Sheets API v4(Node.js)
|--------------------------------------------------------------------------
|
| Testcafe Keyword Driven Framework is a type of Functional Automation
| Testing Framework which is also known as Table-Driven testing or Action Word-based testing by Google Sheets API v4(Node.js). 
| A node.js tool to automate funtional end-to-end web/mobile testing.
| We have the options for Screenshot rendering, Video rendering, Logger rendering, Mail rendering
| Slack appender(msg, Files). 
|
*/

fixture `Getting Started`
	.page `https://devexpress.github.io/testcafe/documentation/getting-started/`;
	
const Sentry = require('@sentry/node');
Sentry.init({
	dsn: 'https://b704ed0675e448fbbc1208df09a3b8f5@sentry.io/1542672'
});


// If modifying these scopes, delete token.json.
const SCOPES = ['https://www.googleapis.com/auth/spreadsheets.readonly'];
// The file token.json stores the user's access and refresh tokens, and is
// created automatically when the authorization flow completes for the first
// time.
const TOKEN_PATH = 'token.json';

// Load client secrets from a local file.
fs.readFile('credentials.json', (err, content) => {
	if (err) return console.log('Error loading client secret file:', err);
	// Authorize a client with credentials, then call the Google Sheets API.
	authorize(JSON.parse(content), listMajors);
});

/**
 * Create an OAuth2 client with the given credentials, and then execute the
 * given callback function.
 * @param {Object} credentials The authorization client credentials.
 * @param {function} callback The callback to call with the authorized client.
 */
function authorize(credentials, callback) {
	const {
		client_secret,
		client_id,
		redirect_uris
	} = credentials.installed;
	const oAuth2Client = new google.auth.OAuth2(
		client_id, client_secret, redirect_uris[0]);

	// Check if we have previously stored a token.
	fs.readFile(TOKEN_PATH, (err, token) => {
		if (err) return getNewToken(oAuth2Client, callback);
		oAuth2Client.setCredentials(JSON.parse(token));
		callback(oAuth2Client);
	});
}

/**
 * Get and store new token after prompting for user authorization, and then
 * execute the given callback with the authorized OAuth2 client.
 * @param {google.auth.OAuth2} oAuth2Client The OAuth2 client to get token for.
 * @param {getEventsCallback} callback The callback for the authorized client.
 */
function getNewToken(oAuth2Client, callback) {
	const authUrl = oAuth2Client.generateAuthUrl({
		access_type: 'offline',
		scope: SCOPES,
	});
	console.log('Authorize this app by visiting this url:', authUrl);
	const rl = readline.createInterface({
		input: process.stdin,
		output: process.stdout,
	});
	rl.question('Enter the code from that page here: ', (code) => {
		rl.close();
		oAuth2Client.getToken(code, (err, token) => {
			if (err) return console.error('Error while trying to retrieve access token', err);
			oAuth2Client.setCredentials(token);
			// Store the token to disk for later program executions
			fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
				if (err) return console.error(err);
				console.log('Token stored to', TOKEN_PATH);
			});
			callback(oAuth2Client);
		});
	});
}

/**
 * Prints the TestDatas of projects in a sample spreadsheet:
 * @see https://docs.google.com/spreadsheets/d/1AUI0HzAzG7Ip4SpYbmdhhzJTRAQdw3OEjsl0CK6BR_Y/edit#gid=0
 * @param {google.auth.OAuth2} auth The authenticated Google OAuth client.
 */
function listMajors(auth) {

	const sheets = google.sheets({
		version: 'v4',
		auth
	});
	sheets.spreadsheets.values.get({
		spreadsheetId: '1AUI0HzAzG7Ip4SpYbmdhhzJTRAQdw3OEjsl0CK6BR_Y',
		range: 'september!A2:F',
	}, (err, res) => {
		if (err) return console.log('The API returned an error: ' + err);
		 rows = res.data.values;
		
	});
}

/*
|--------------------------------------------------------------------------
| Localization
|--------------------------------------------------------------------------
| (faker.Faker) can take a locale as an argument, to return localized data.
| If no localized provider is found, the factory falls back to the default en_US locale.
| https://faker.readthedocs.io/en/master/
|
*/
faker.locale = "en_US";

test('Keyword-Driven Framework', async t => {
	await t.maximizeWindow()
	try {
		for (let i = 0; i < rows.length; i++) {
			let element = {
				TCID 			: rows[i][0],
				TestSteps 		: rows[i][1],
				Keyword 		: rows[i][2],
				LocatorType     : rows[i][3],
				LocatorValue	: rows[i][4],
				TestData 		: rows[i][5],
			}
								
			const LocatorType = element.LocatorType
			switch (element.LocatorType) {
				case "XPath":
					element.LocatorType = XPath
					break;
				case "Selector":
					element.LocatorType = Selector
					break;
				default:
					break;
			}
			switch (element.Keyword){
				case "navigateTo": //t.navigateTo( url )
					await t[element.Keyword](element.TestData)
					logger.info(element.Keyword + " Url " + element.TestData + " - After test execution, actual test result should be navigated")
					break;
				case "click": //t.click( selector [, options] )
					await t[element.Keyword](element.LocatorType(element.LocatorValue))
					logger.info(element.Keyword + " " + LocatorType + " " + element.LocatorValue + " - After test execution, actual test result should be clicked")
					break;
				case "doubleClick": //t.doubleClick( selector [, options] )
					await t[element.Keyword](element.LocatorType(element.LocatorValue))
					logger.info(element.Keyword + " " + LocatorType + " " + element.LocatorValue + " - After test execution, actual test result should be doubleClicked")
					break;
				case "rightClick": //t.rightClick( selector [, options] )
					await t[element.Keyword](element.LocatorType(element.LocatorValue))
					logger.info(element.Keyword + " " + LocatorType + " " + element.LocatorValue + " - After test execution, actual test result should be rightClicked")
					break;
				case "typeText": //t.typeText( selector, text [, options] )
					let value = element.TestData.includes("faker") ? eval(element.TestData): element.TestData;
					if (element.TestData != null)
					await t.click(element.LocatorType(element.LocatorValue),{
						speed: 1
					});
					await t.pressKey('ctrl+a delete'),{
						speed: 1
					};
					await t[element.Keyword](element.LocatorType(element.LocatorValue), value, {
						speed: 1
					})
					logger.info(element.Keyword + " " + LocatorType + " "+ element.LocatorValue  +" "+ element.TestData + " - After test execution, actual test result should be filled with text")
					break;
				case "clear": //t.click( selector, text [, options] )
					element.Keyword = "click"
					await t[element.Keyword](element.LocatorType(element.LocatorValue));
					await t.pressKey('ctrl+a delete');
					logger.info(element.Keyword + " " + LocatorType + " "+ element.LocatorValue  +" "+ element.TestData + " - After test execution, actual test result should be cleared")
					break;
				case "select":
					element.Keyword = "click"
					const interfaceSelect = (element.LocatorType(element.LocatorValue));
					await t[element.Keyword](interfaceSelect),{
						speed: 1
					}
					await t[element.Keyword](interfaceSelect.find('option').withText(element.TestData), {
						speed: 1
					})
					logger.info(element.Keyword + " " + LocatorType + " "+ element.LocatorValue  +" "+ element.TestData + " - After test execution, actual test result should be selected")
					break;
				case "select2":
					element.Keyword = "click"
					await t[element.Keyword](element.LocatorType(element.LocatorValue))
					await t.pressKey('down down enter');
					logger.info(element.Keyword + " " + LocatorType + " " + element.LocatorValue + " - After test execution, actual test result should be random selected")
					break;
				case "withText": //.click(Selector('a').withText('Glemt passord?'))
					element.Keyword = "click"
					await t[element.Keyword](element.LocatorType(element.LocatorValue).withText(element.TestData))
					logger.info(element.Keyword + " " + LocatorType + " " + element.LocatorValue + " withText " + element.TestData + " - After test execution, actual test result should be clicked by withText")
					break;
				case "pressKey": //t.pressKey( keys [, options] )
					await t[element.Keyword](element.TestData);
					logger.info(element.Keyword + " " + LocatorType + " " + element.TestData + " - After test execution, actual test result should be pressed the specific key")
					break;
				case "hover": //t.hover( selector [, options] )
					await t[element.Keyword](element.LocatorType(element.LocatorValue))
					logger.info(element.Keyword + " " + LocatorType + " "+ element.LocatorValue  +" "+ element.TestData + " - After test execution, actual test result should be hover the specific field")
					break;
				case "selectText": //t.selectText( selector [, startPos] [, endPos] [, options] )
					await t[element.Keyword](element.LocatorType(element.LocatorValue), element.TestData, {
						speed: 1
					})
					logger.info(element.Keyword + " " + LocatorType + " "+ element.LocatorValue  +" "+ element.TestData + " - After test execution, actual test result should be selectText the specific field")
					break;
				case "setFilesToUpload": //t.setFilesToUpload( selector, filePath )
					await t[element.Keyword](element.LocatorType(element.LocatorValue), element.TestData)
					logger.info(element.Keyword + " " + LocatorType + " " + element.TestData + " - After test execution, actual test result should be uploaded files into the specific app")
					break;
				case "resizeWindow": //t.resizeWindow( width, height )
					await t[element.Keyword](element.TestData)
					logger.info(element.Keyword + " " + element.TestData + " - After test execution, actual test result should be resizedwindow")
					break;
				case "drag": //t.drag( selector, dragOffsetX, dragOffsetY [, options] )
					await t[element.Keyword](element.LocatorType(element.LocatorValue), element.TestData, {
						offsetX: 10,
						offsetY: 10
					})
					logger.info(element.Keyword + " " + LocatorType + " "+ element.LocatorValue  +" "+ element.TestData + " - After test execution, actual test result should be draged element into the position")
					break;
				case "switchToIframe":
					await t[element.Keyword](element.LocatorType(element.LocatorValue))
					logger.info(element.Keyword + " " + LocatorType + " "+ element.LocatorValue  +" "+ element.TestData + " - After test execution, actual test result should be switchedToIframe")
					break;
				case"switchToMainWindow":
					await t.switchToMainWindow()
					logger.info(element.Keyword + " " + LocatorType + " "+ element.LocatorValue  +" "+ element.TestData + " - After test execution, actual test result should be switchedToMainWindow")
					break;
				case "pause": //t.wait( timeout )
					await t.wait(element.TestData)
					logger.info(element.Keyword + " " + LocatorType + " " + element.TestData + " - After test execution, actual test result should be Pausing the Test")
					break;
				case "reload": 
					const getLocalStorageItem = ClientFunction(key => localStorage.getItem(key));
					await t.eval(() => localStorage.setItem('key', 'value'));
					await t.expect(getLocalStorageItem('key')).eql('value');
					await t.wait(2000);
					await t.eval(() => location.reload(true));
					await t.wait(2000);
					await t.expect(getLocalStorageItem('key')).eql('value');
					logger.info(element.Keyword + " " + LocatorType + " " + element.TestData + " - After test execution, actual test result should be reloaded")
					break;
				default:
					return;
			}
			await t.setTestSpeed(0.01)
		}
	} catch (error) {
        slack_msg_append.slack_msg()
		logger.error("Oops, Not implemented! " + error)
        Sentry.captureException(new Error("Oops, Not implemented! " + error));
        slack_file_append.slack_file_upload()
	return;
	}
})

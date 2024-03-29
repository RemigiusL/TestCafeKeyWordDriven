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

const getmyDir = new makeDir()
getmyDir.makeDir();

const getLogAppender = new logAppender()
const logger = getLogger();
logger.level = 'debug';
getLogAppender.info()

const slack_msg_append = new slack_msg()
const slack_file_append = new slack_file()

/*
|--------------------------------------------------------------------------
| Keyword Driven Framework
|--------------------------------------------------------------------------
|
| Testcafe Keyword Driven Framework is a type of Functional Automation
| Testing Framework which is also known as Table-Driven testing or Action Word-based testing by local .xlsx. 
| A node.js tool to automate funtional end-to-end web/mobile testing.
| We have the options for Screenshot rendering, Video rendering, Logger rendering, Mail rendering
| Slack appender(msg, Files). 
|
*/

fixture `Getting Started`
	.page `https://devexpress.github.io/testcafe/documentation/getting-started/`;

/*
|--------------------------------------------------------------------------
| Sentry
|--------------------------------------------------------------------------
|
| Sentry is also used by support. When a user gets an error,
| they're given a hash they can include in a support email.
|
*/

const Sentry = require('@sentry/node');
Sentry.init({
	dsn: 'https://b704ed0675e448fbbc1208df09a3b8f5@sentry.io/1542672'
});


var XLSX = require('xlsx')
var workbook = XLSX.readFile('./metaData/readfile.xlsx');
var sheet_name_list = workbook.SheetNames;
var xlData = XLSX.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]]);

/*
|--------------------------------------------------------------------------
|  @param  
|--------------------------------------------------------------------------
|
| @param  {} 'Keyword-DrivenFramework'
|
|
*/

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
		// xlData.forEach(element => {
		for (let i = 0; i < xlData.length; i++) {
			let element = xlData[i]

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
			switch (element.Keyword) {
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
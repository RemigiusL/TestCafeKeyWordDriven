import {
	Selector,
	t
} from 'testcafe';
import {
	configure,
	getLogger
} from 'log4js';
const dateFormat = require('../node_modules/dateformat');
const day = dateFormat(new Date(), "yyyy-mm-dd");
const slackFileUpload = require('slack-file-upload');

export default class slack_File_Appender {

	async slack_file_upload() {
		slackFileUpload.upload({
			token: "xoxp-473141949633-477188316819-762075527009-e1b768a9d63cfd23f36a98675e3da2d7",
			channels: 'DE2LBQNKG',
			filename: './logs/' + day + '/info.log',
		});
	}
}
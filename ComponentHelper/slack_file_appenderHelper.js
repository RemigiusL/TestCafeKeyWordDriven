import {
	Selector,
	t
} from 'testcafe';
import {
	configure,
	getLogger
} from 'log4js';

const slackFileUpload = require('slack-file-upload');

export default class slack_File_Appender {

	async slack_file_upload() {
		slackFileUpload.upload({
			token: "xoxp-473141949633-477188316819-748904662580-8a48b8b619ec03be45ae1a13cbc4dda7",
			channels: 'DE2LBQNKG',
			filename: '../logs/' + day + 'info.log',
		});
	}
}
import {
	Selector,
	t
} from 'testcafe';
import {
	configure,
	getLogger
} from '../node_modules/log4js';

let log4js = require("../node_modules/log4js");

var dateFormat = require('../node_modules/dateformat');
var day = dateFormat(new Date(), "yyyy-mm-dd");

var Slack = require('../node_modules/node-slack-upload');
var fs = require('../node_modules/fstream/fstream')
var slack = new Slack('xoxp-473141949633-477188316819-748904662580-8a48b8b619ec03be45ae1a13cbc4dda7');

export default class logAppender {


	constructor() {}

	async reportTaskStart(startTime, userAgents, testCount) {
		this.startTime = startTime;
		this.testCount = testCount;

		const time = this.moment(startTime).format('M/D/YYYY h:mm:ss a');

		this.write(`Testing started: ${time}`)
			.newline()
			.write(`Running ${testCount} tests in: ${userAgents}`)
			.newline();
	}

	async error() {
		const logger = getLogger();
		logger.level = 'error';

		log4js.configure({
			appenders: {
				out: {
					type: 'stdout'
				},
				app: {
					type: 'file',
					filename: "logs/" + day + "/error.log"
				}
			},
			categories: {
				default: {
					appenders: ['out', 'app'],
					level: 'error'
				}
			}
		});
	}

	async info() {
		const logger = getLogger();
		logger.level = 'info';

		log4js.configure({
			appenders: {
				out: {
					type: 'stdout'
				},
				app: {
					type: 'file',
					filename: "logs/" + day + "/info.log"
				}
			},
			categories: {
				default: {
					appenders: ['out', 'app'],
					level: 'info'
				}
			}
		});
	}

	async logFaces() {
		const logger = getLogger();
		logger.level = 'error';

		log4js.configure({
			appenders: {
				logstash: {
					type: '@log4js-node/logstash-http',
					url: 'http://localhost:9200/_bulk',
					application: 'logstash-log4js',
					logType: 'application',
					logChannel: 'node'
				}
			},
			categories: {
				default: {
					appenders: ['logstash'],
					level: 'info'
				}
			}
		});
	}

	async Logstash() {
		const logger = getLogger();
		logger.level = 'info';

		log4js.configure({
			appenders: {
				logstash: {
					type: '@log4js-node/logstash-http',
					url: 'http://localhost:9200/_bulk',
					application: 'logstash-log4js',
					logType: 'application',
					logChannel: 'node'
				}
			},
			categories: {
				default: {
					appenders: ['logstash'],
					level: 'info'
				}
			}
		});
	}

	async gelf() {
		const logger = getLogger();
		logger.level = 'info';

		log4js.configure({
			appenders: {
				gelf: {
					type: '@log4js-node/gelf',
					customFields: {
						'_thing': 'isathing'
					}
				}
			},
			categories: {
				default: {
					appenders: ['gelf'],
					level: 'info'
				}
			}
		});
		//     const logger = log4js.getLogger();
		// logger.error({ GELF: true, _thing2: 'alsoathing' }, 'oh no, something went wrong');
	}

	async loggy() {
		log4js.configure({
			appenders: {
				loggly: {
					type: '@log4js-node/loggly',
					token: 'somethinglong',
					subdomain: 'your.subdomain',
					tags: ['tag1']
				}
			},
			categories: {
				default: {
					appenders: ['loggly'],
					level: 'info'
				}
			}
		});
		// const logger = log4js.getLogger();
		// logger.info({ tags: ['my-tag-1', 'my-tag-2'] }, 'Some message');
	}

	async slack() {
		const logger = getLogger();
		logger.level = 'error';

		log4js.configure({
			appenders: {
				alerts: {
					type: '@log4js-node/slack',
					token: 'xoxp-473141949633-477188316819-748904662580-8a48b8b619ec03be45ae1a13cbc4dda7',
					channel_id: 'DE2LBQNKG',
					username: 'Remi',
				}
			},
			categories: {
				default: {
					appenders: ['alerts'],
					level: 'error'
				}
			}
		});
	}

	async messaging_api_slack() {
		const client = SlackOAuthClient.connect(
			'xoxp-473141949633-477188316819-748904662580-8a48b8b619ec03be45ae1a13cbc4dda7'
		);

		client.callMethod('chat.postMessage', {
			channel: 'DE2LBQNKG',
			text: 'Hello!'
		});
	}

	async node_slack_upload() {
		slack.uploadFile({
			file: fs.createReadStream(path('README.md')),
			filetype: 'post',
			title: 'README',
			initialComment: 'my comment',
			channels: 'DE2LBQNKG'
		}, function (err, data) {
			if (err) {
				console.error(err);
			} else {
				console.log('Uploaded file details: ', data);
			}
		});
	}
}
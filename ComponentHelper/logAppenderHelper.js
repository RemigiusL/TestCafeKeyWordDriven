import { Selector, t } from 'testcafe';
import { configure, getLogger } from 'log4js';

let log4js = require("log4js");

var dateFormat = require('dateformat');
var day = dateFormat(new Date(), "yyyy-mm-dd");

export default class logAppender {


    constructor() {
    }

    async reportTaskStart (startTime, userAgents, testCount) {
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
                    out: { type: 'stdout' },
                    app: { type: 'file', filename: "logs/"+day+"/error.log" }
                  },
                  categories: {
                    default: { appenders: [ 'out', 'app' ], level: 'error' }
                  }
                });
    }
        async info() {
        const logger = getLogger();
            logger.level = 'info';
        
                    log4js.configure({
                    appenders: {
                        out: { type: 'stdout' },
                        app: { type: 'file', filename: "logs/"+day+"/info.log" }
                    },
                    categories: {
                        default: { appenders: [ 'out', 'app' ], level: 'info' }
                    }
                    });
    }

            async logFaces () {
            const logger = getLogger();
                logger.level = 'error';
            
                log4js.configure({
                appenders: {
                    logstash: { type: '@log4js-node/logstash-http', url: 'http://localhost:9200/_bulk', application: 'logstash-log4js', logType: 'application', logChannel: 'node' }
                },
                categories: {
                    default: { appenders: [ 'logstash' ], level: 'info' }
                }
                });
            }

            async Logstash  () {
            const logger = getLogger();
                logger.level = 'info';
            
                log4js.configure({
                appenders: {
                    logstash: { type: '@log4js-node/logstash-http', url: 'http://localhost:9200/_bulk', application: 'logstash-log4js', logType: 'application', logChannel: 'node' }
                },
                categories: {
                    default: { appenders: [ 'logstash' ], level: 'info' }
                }
                });
    }

            async gelf  () {
            const logger = getLogger();
                logger.level = 'info';
            
                log4js.configure({
                appenders: {
                    gelf: { type: '@log4js-node/gelf', customFields: { '_thing': 'isathing' } }
                },
                categories: {
                    default: { appenders: ['gelf'], level: 'info' }
                }
                });
            //     const logger = log4js.getLogger();
            // logger.error({ GELF: true, _thing2: 'alsoathing' }, 'oh no, something went wrong');
    }

            async loggy(){
            log4js.configure({
                appenders: {
                loggly: {
                    type: '@log4js-node/loggly',
                    token: 'somethinglong',
                    subdomain: 'your.subdomain',
                    tags: [ 'tag1' ]
                }
                },
                categories: {
                default: { appenders: ['loggly'], level: 'info' }
            }
        });
            // const logger = log4js.getLogger();
            // logger.info({ tags: ['my-tag-1', 'my-tag-2'] }, 'Some message');
    }
}
import { Selector, t } from 'testcafe';
import { configure, getLogger } from 'log4js';

let log4js = require("log4js");

export default class slack_Msg_Appender {

    async slack_msg(){
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
          default: { appenders: ['alerts'], level: 'error' }
        }
      });
    }
}
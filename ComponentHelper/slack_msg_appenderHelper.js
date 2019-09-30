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
            token: 'xoxp-473141949633-477188316819-762075527009-e1b768a9d63cfd23f36a98675e3da2d7',
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
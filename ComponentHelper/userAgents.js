import { Selector, t } from 'testcafe';
import { configure, getLogger } from 'log4js';

var dateFormat = require('dateformat');
var day = dateFormat(new Date(), "yyyy-mm-dd");

let log4js = require("log4js");


export default class userAgents {

    async reportTaskStart (startTime, userAgents, testCount) {
        this.startTime = startTime;
        this.testCount = testCount;
    
        const time = this.moment(startTime).format('M/D/YYYY h:mm:ss a');
    
        this.write(`Testing started: ${time}`)
            .newline()
            .write(`Running ${testCount} tests in: ${userAgents}`)
            .newline();
    }
}

import { Selector } from 'testcafe';
import XPath from './ComponentHelper/xpath-selector';
import makeDir from './ComponentHelper/makeDirHelper';
import logAppender from './ComponentHelper/logAppenderHelper';
import { configure, getLogger } from 'log4js';

const gemyDir = new makeDir()
      gemyDir.makeDir();

const logger = getLogger();
        logger.level = 'debug';
const getLogAppender = new logAppender()
getLogAppender.info()
        

fixture `Getting Started`

.page `https://angelswelding.hms2go.no/`;

var XLSX = require('xlsx')
    var workbook = XLSX.readFile('./executeData/readfile.xlsx');
    var sheet_name_list = workbook.SheetNames;
    var xlData = XLSX.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]]);
try {
    test('Keyword-Driven',  async t => {
        await t.maximizeWindow()
        // xlData.forEach(element => {
        for (let i = 0; i < xlData.length; i++) {
            let element = xlData[i]
            //[element.Keyword](element.Parameter)
            switch (element.Keyword) {
                case "navigateTo":
                    await t[element.Keyword](element.Parameter)
                    logger.info(element.Keyword +" XPath " +element.Parameter + " - After test execution, actual test result should be navigated")
                    break;
                case "click":
                    await t[element.Keyword](XPath(element.LocatorValue))
                    logger.info(element.Keyword +" XPath " +element.LocatorValue +" - After test execution, actual test result should be clicked")
                    break;
                case "typeText":
                    await t[element.Keyword](XPath(element.LocatorValue), element.Parameter)
                    logger.info(element.Keyword +" XPath "+ element.Parameter +" - After test execution, actual test result should be filled")
                    break;
                case "selectText":
                    await t[element.Keyword](XPath(element.LocatorValue), element.Parameter)
                    logger.info(element.Keyword +" XPath "+ element.Parameter +" - After test execution, actual test result should be selected")
                    break;
                default:
                    return;
            }
            await t.setTestSpeed(0.1)
        }
    });
    
} catch (error) {
    
  throw(error);
}

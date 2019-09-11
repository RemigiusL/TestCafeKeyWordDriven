import { Selector } from 'testcafe';
import XPath from './ComponentHelper/xpath-selector';
import makeDir from './ComponentHelper/makeDirHelper';
import logAppender from './ComponentHelper/logAppenderHelper';
import { configure, getLogger } from 'log4js';

const getmyDir = new makeDir()
      getmyDir.makeDir();

const getLogAppender = new logAppender()
const logger = getLogger();
        logger.level = 'debug';
        getLogAppender.info()


fixture `Getting Started`

.page `https://devexpress.github.io/testcafe/documentation/getting-started/`;

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
                    element.Keyword ="click"
                    const interfaceSelect = XPath(element.LocatorValue);
                    await t [element.Keyword](interfaceSelect)
                    await t [element.Keyword](interfaceSelect.find('option').withText(element.Parameter))
                    logger.info(element.Keyword +" XPath "+ element.Parameter +" - After test execution, actual test result should be selected")
                    break;
                default:
                    return;
            }
            await t.setTestSpeed(0.1)
           // logger.error("check the file upload")
        }
    })
    getLogAppender.slack()
    
} catch (error) {
    
  throw(error);
}

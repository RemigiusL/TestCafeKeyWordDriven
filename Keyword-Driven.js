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
    var workbook = XLSX.readFile('./metaData/readfile.xlsx');
    var sheet_name_list = workbook.SheetNames;
    var xlData = XLSX.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]]);
try {
    test('Keyword-Driven',  async t => {
        await t.maximizeWindow()
        for (let i = 0; i < xlData.length; i++) {
            let element = xlData[i]

            let LocatorType = XPath
            if (element.LocatorType == "Selector") {
                LocatorType = Selector
            }
            
            switch (element.Keyword) {
                case "navigateTo":
                    await t[element.Keyword](element.Parameter)
                    logger.info(element.Keyword  +element.Parameter + " - After test execution, actual test result should be navigated")
                    break;
                case "click":
                    await t[element.Keyword](LocatorType(element.LocatorValue))
                    logger.info(element.Keyword  +element.LocatorValue +" - After test execution, actual test result should be clicked")
                    break;
                case "typeText":
                    await t[element.Keyword](LocatorType(element.LocatorValue), element.Parameter, { speed: 1 })
                    logger.info(element.Keyword  + element.Parameter +" - After test execution, actual test result should be filled")
                    break;
                case "clear":
                    element.Keyword = "click"
                    await t [element.Keyword](LocatorType(element.LocatorValue));
                    await t.pressKey('ctrl+a delete');
                    logger.info(element.Keyword  + element.LocatorValue +" - After test execution, actual test result should be cleared")
                    break;
                case "select":
                    element.Keyword ="click"
                    const interfaceSelect = LocatorType(element.LocatorValue);
                    await t [element.Keyword](interfaceSelect)
                    await t [element.Keyword](interfaceSelect.find('option').withText(element.Parameter))
                    logger.info(element.Keyword  + element.Parameter +" - After test execution, actual test result should be selected")
                    break;
                case "withText":
                    element.Keyword ="click"
                    await t [element.Keyword](LocatorType(element.LocatorValue).withText(element.Parameter))
                    logger.info(element.Keyword  + element.LocatorValue +" withText " +element.Parameter +" - After test execution, actual test result should be clicked by withText")
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

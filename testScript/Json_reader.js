import { Selector } from 'testcafe';
import XPath from './xPath_selector';

const dataSet = require('./data.json');

fixture `Keyword-Driven Framework`.page `http://bil.avalia.no/`;
    
   
dataSet.forEach(data => {
    
    test(`Keyword-Driven '${data.Keyword}, ${data.LocatorType}, ${data.LocatorValue}, ${data.Parameter}`, async t => {
       await t
       .maximizeWindow( )
        switch (data.Keyword) {
            case "typeText":
                await t
                [data.Keyword](XPath(data.LocatorValue, data.Parameter))
                break;
            case "click":
                    await t
                    [data.Keyword]([data.LocatorType](data.LocatorValue))
                    break;
            case "navigateTo":
                    await t
                    [data.Keyword](data.Parameter)
                    break;
            default:
                break;
        }
      
           // .typeText(data.id, data.name)
            // .click('#tried-test-cafe')
            // [data.Key]('#comments', data.comment)
            // .click(data.Button)
            //.expect(Selector('#article-header').textContent).eql(data.resultText);
    });
    // test(`Enter '${data.name}'`, async t => {
    //     await t
    //         [data.Key](data.id, data.name)
    //         .click('#tried-test-cafe')
    //         [data.Key]('#comments', data.comment)
    //         .click(data.Button)
    //        //.expect(Selector('#article-header').textContent).eql(data.resultText);
    // });
});
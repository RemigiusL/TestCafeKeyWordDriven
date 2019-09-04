const makeDir = require('make-dir');
const dateFormat = require('dateformat');
const day = dateFormat(new Date(), "yyyy-mm-dd");

export default class make_Dir {

    async makeDir () {
        await makeDir("logs/"+ day);
    }
}


// const makeDir = require('make-dir');
// var dateFormat = require('dateformat');
// var day = dateFormat(new Date(), "yyyy-mm-dd");
// fixture `My fixture`
//     .page `http://devexpress.github.io/testcafe/example/`;

// test('Take a screenshot of a fieldset', async t => {
//     await t
//         .typeText('#developer-name', 'remigius lourdusamy', { speed: 0.01 })
//         .click('#submit-button')
//        // .takeScreenshot('my-fixture/thank-you-page.png');
//        //const path = await makeDir('unicorn/rainbow/cake');
//        const path = await makeDir(day);
 
//     console.log(path);
//     console.log(day);

       
// });




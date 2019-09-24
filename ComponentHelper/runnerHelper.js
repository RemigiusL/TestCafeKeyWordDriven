const createTestCafe = require('../node_modules/testcafe/ts-defs');
let testcafe         = null;

createTestCafe('localhost', 1337, 1338)
    .then(tc => {
        testcafe     = tc;
        const runner = testcafe.createRunner();

        return runner
           // .src(['keword_Driven/Keyword-Driven.js'])
            .browsers(['chrome', 'safari'])
            .reporter('json') 
            .screenshots('remi/re')
            .run();
    })
    .then(failedCount => {
        console.log('Tests failed: ' + failedCount);
        testcafe.close();
    });
import { RequestLogger } from 'testcafe';

const logger = RequestLogger('http://example.com');

fixture `test`
    .page('http://example.com');

test
    .requestHooks(logger)
    ('test', async t => {

        // Ensure that the response has been received and that its status code is 200.
        await t.expect(logger.contains(record => record.response.statusCode === 200)).ok();

        const logRecord = logger.requests[0];

        console.log(logRecord.userAgent);           // Chrome 63.0.3239 / Windows 8.1.0.0
        console.log(logRecord.request.url);         // http://api.example.com
        console.log(logRecord.request.method);      // get
        console.log(logRecord.response.statusCode); // 304
    });
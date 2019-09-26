fixture `My fixture`
	.page `http://devexpress.github.io/testcafe/example/`;

test('Take a screenshot of a fieldset', async t => {
	await t
		.typeText('#developer-name', 'Peter Parker')
		.click('#tried-test-cafe')
		.typeText('#comments', 'I think TestCafe is awesome!')
		.takeElementScreenshot('#comments')
		.click('#submit-button')
		.takeScreenshot();
	runner.screenshots('Utility/screenshots');
	runner.video('artifacts/videos');
	//     const ffmpeg = require('@ffmpeg-installer/ffmpeg');
	// console.log(ffmpeg.path, ffmpeg.version);
});
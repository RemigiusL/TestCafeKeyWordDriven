import { Selector } from 'testcafe';
import runner from '../ComponentHelper/RunnerHelper'
//import runner  from '../ComponentHelper/RunnerHelper';

fixture`A set of examples that illustrate how to use TestCafe API`
    .page`http://devexpress.github.io/testcafe/example/`;

const developerName = Selector('#developer-name');
const triedLabel    = Selector('label').withText('I have tried TestCafe');
const sliderHandle  = Selector('#slider').child('span');
const submitButton  = Selector('#submit-button');

test.only('How to type text into an input (t.typeText user action)', async t => {
    await t
        .typeText(developerName, 'Peter')
        .typeText(developerName, 'Paker', { replace: true })
        .typeText(developerName, 'r', { caretPos: 2 })
        .expect(developerName.value).eql('Parker');
        runner.screenshots('artifacts/screenshots', true);
});

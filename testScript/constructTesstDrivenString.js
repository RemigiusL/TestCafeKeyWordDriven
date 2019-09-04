const constructTesstDrivenString = (xlData) => {
    let testStr = `test('Keyword-Driven',  async (t) => { await t.maximizeWindow()`

    Object.keys(xlData)
        .forEach(async (item) => {
            let method = xlData[item].Keyword
            switch (xlData[item].Keyword) {
                case 'navigateTo':
                    if(xlData[item].Parameter) testStr += `.${method}("${xlData[item].Parameter}")`
                    break;
                case 'click':
                    if(xlData[item].LocatorType && xlData[item].LocatorValue)
                        testStr += xlData[item].LocatorValue.includes('"') // .click(XPath("//button[@type='submit']"))
                            ? `.${method}(XPath('${xlData[item].LocatorValue}'))`
                            : `.${method}(XPath("${xlData[item].LocatorValue}"))`
                    break;
            default:
                break;
            }
        });

    return testStr += '; });'
}

export { constructTesstDrivenString }
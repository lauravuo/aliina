const url = 'http://localhost:8088';

module.exports = {
  'Home test': browser =>
    browser
      .url(url)
      .waitForElementVisible('body')
      .assert.containsText('h1', 'TODO')
      .end(),
  'Button test': browser => {
    const button = 'button';
    browser
      .url(url)
      .waitForElementVisible(button)
      .expect.element(button)
      .to.have.css('background-color')
      .which.equals('rgba(138, 43, 226, 1)');
    browser
      .click(button)
      .expect.element(button)
      .to.have.css('background-color')
      .which.equals('rgba(128, 0, 128, 1)');
    browser.end();
  },
  'Data fetch test': browser => {
    const pageLink = '//a[contains(.,"Page")]';
    const pageContent = '//p[contains(.,"Laura Vuorenoja, Helsinki, Finland")]';
    browser
      .url(url)
      .useXpath()
      .waitForElementVisible(pageLink)
      .click(pageLink)
      .waitForElementVisible(pageContent)
      .end();
  }
};

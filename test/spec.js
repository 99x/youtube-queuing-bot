//start the youtube-queuing-bot app
require("../app/app");

describe('youtube-queuing-bot', function () {
  it('should load the youtube player full screen', function (done) {
    this.timeout(30000);

    browser.driver.get('http://localhost:3000');

    setTimeout(function () {
      done();
    }, 1000);
  });
});
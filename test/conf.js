exports.config = {
  framework: 'mocha',
  specs: ['spec.js'],
  capabilities: {
    browserName: 'chrome',
    chromeOptions: {
      args: [ "--headless", "--disable-gpu", "--window-size=800x600" ]
    }
  }
};

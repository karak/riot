module.exports = {
  browsers: {
    slIpad: {
      base: 'SauceLabs',
      browserName: 'ipad',
      version: '10.3'
    },
    slSafari10: {
      base: 'SauceLabs',
      browserName: 'safari',
      platform: 'OS X 10.11'
    },
    slSafari11: {
      base: 'SauceLabs',
      browserName: 'safari',
      platform: 'OS X 10.13'
    },
    slEdge: {
      base: 'SauceLabs',
      browserName: 'MicrosoftEdge',
      platform: 'Windows 10'
    },
    slChrome: {
      base: 'SauceLabs',
      browserName: 'chrome'
    },
    slFirefox: {
      base: 'SauceLabs',
      browserName: 'firefox'
    },
    slAndroid5: {
      base: 'SauceLabs',
      browserName: 'android',
      version: '5.1'
    }
  }
}

/**
 * plugin dependencies
 */

var webdriverio = require('webdriverio')

module.exports = function (app, params, cb) {
  var options = {
    desiredCapabilities: {
      browserName: 'chrome',
      chromeOptions: {
        args: [
          '--headless',
          '--disable-gpu',
          '--hide-scrollbars',
          '--window-size=' + params.resolution.replace('x', ',')
        ]
      }
    }
  }
  var browser = (
    webdriverio
      .remote(options)
      .init()
      .url(params.url)
  )
  var pageWidth, pageHeight

  if (app.get('cut')) {
    console.warn('WebDriver does not support clipRect - ignoring `cut`')
  }

  if (app.get('cookies')) {
    app.get('cookies').forEach(function (cookie) {
      browser.setCookie(cookie)
    })
  }

  browser.waitForExist('html', params.wait)
    .getViewportSize('width')
    .then(function (width) {
      pageWidth = width
    })
    .then(function () {
      return browser.element('html').getElementSize('height')
    })
    .then(function (height) {
      pageHeight = height
    })
    .then(function () {
      return browser
        .setViewportSize({width: pageWidth, height: pageHeight})
        .saveScreenshot()
        .then(function (rasterized) {
          cb(null, rasterized)
        })
    })
    .catch(function (error) {
      cb(error)
    })
}

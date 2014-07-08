var page = require('webpage').create()
var args = require('system').args

var url = args[1]
var resolution = args[2]
var width = resolution.split('x')[0]
var height = resolution.split('x')[1]
var timeout = args[3]
var cut = args[4] == 'true'
var cookie = args[5]

page.viewportSize = {
  width : width,
  height : height
}

if (cut) page.clipRect = {
  top: 0,
  left: 0,
  width: width,
  height: height
}

if (cookie) {
  cookie = JSON.parse(cookie)

  if (cookie.cookies) {
    cookie.cookies.forEach(function(each) { phantom.addCookie(each) })
  } else {
    phantom.addCookie(cookie)
  }
}

// silence phantomjs
page.onConsoleMessage = function () {}
page.onConfirm = function () {}
page.onPrompt = function () {}
page.onError = function () {}

page.open(url, function (status) {
  if (status !== 'success') throw 'Unable to load'
  window.setTimeout(function () {
    console.log(page.renderBase64('PNG'))
    phantom.exit()
  }, timeout)
})

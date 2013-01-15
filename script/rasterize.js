var page = require('webpage').create()
var args = require('system').args

var url = args[1]
var resolution = args[2]
var width = resolution.split('x')[0]
var height = resolution.split('y')[0]
var timeout = args[3]

page.viewportSize = {
  width : resolution.split('x')[0],
  height : resolution.split('x')[1]
}

page.open(url, function (status) {
  if (status !== 'success') throw 'Unable to load'
  window.setTimeout(function () {
    console.log(page.renderBase64('PNG'))
    phantom.exit()
  }, timeout)
})
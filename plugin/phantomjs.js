/**
 * plugin dependencies
 */

var spawn = require('child_process').spawn
var phantomjs = require('phantomjs')

/**
 * fs shortcuts
 */

var script = __dirname + '/../script/rasterize.js'

module.exports = function (app, params, cb) {
  var ps = spawn(phantomjs.path, [
    script, params.url, params.resolution,
    params.wait, app.get('cut'), JSON.stringify(app.get('cookies'))
  ])

  ps.on('error', cb)

  var chunks = []
  ps.stdout.on('data', function (chunk) {
    chunks.push(chunk)
  })

  ps.on('exit', function () {
    cb(null, new Buffer(chunks.join(''), 'base64'))
  })
}

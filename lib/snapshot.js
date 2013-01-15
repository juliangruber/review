var express = require('express')
var spawn = require('child_process').spawn

var app = module.exports = express()

var script = __dirname + '/../script/rasterize.js'

app.get('/:url/:resolution/:wait', function (req, res, next) {
  var ps = spawn(
    'phantomjs', [script, req.params.url, req.params.resolution, req.params.wait]
  )
  
  ps.on('error', next)
  
  var chunks = []
  ps.stdout.on('data', function (chunk) {
    chunks.push(chunk)
  })
  
  ps.on('exit', function () {
    res.set('Content-Type', 'image/png')
    res.send(new Buffer(chunks.join(''), 'base64'))
  })
})
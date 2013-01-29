var express = require('express')
var spawn = require('child_process').spawn
var fs = require('fs')
var path = require('path')
var EventEmitter = require('events').EventEmitter
var crypto = require('crypto')
var mkdirp = require('mkdirp')

var app = module.exports = express()

/**
 * configuration
 */

var cache = false
var cut = false
var cookie = {}

/**
 * setters
 */

app.cache = function (_cache) {
  cache = _cache
  return app
}

app.cut = function (_cut) {
  cut = _cut
  return app
}

app.cookie = function (_cookie) {
  cookie = _cookie
  return app
}

/**
 * fs shortcuts
 */

var script = __dirname + '/../script/rasterize.js'

/**
 * cache handling
 */

var caching = {}
var caches = new EventEmitter()

/**
 * routes
 */

app.get('/:url/:resolution/:wait', function (req, res, next) {
  if (!cache) {
    return snapshot(req.params, function (err, rasterized) {
      if (err) return next(err)
      res.set('Content-Type', 'image/png')
      res.send(rasterized)
    })
  }
  
  var hash = crypto
    .createHash('sha1')
    .update(req.params['url'])
    .update(req.params['resolution'])
    .update(req.params['wait'])
    .update(JSON.stringify(cache))
    .update(JSON.stringify(cut))
    .update(JSON.stringify(cookie))
    .digest('hex')

  var dir = path.join(cache.dir, hash.slice(0, 2))
  var filename = path.join(dir, hash + '.png')
  
  function createCache () {
    caching[hash] = true
    snapshot(req.params, function (err, rasterized) {
      if (err) return caching[hash] = false, next(err)
      
      mkdirp(dir, function () {
        fs.writeFile(filename, rasterized, function (err) {
          caching[hash] = false
          if (err) return next(err)

          res.set('Content-Type', 'image/png').end(rasterized)
          caches.emit(hash)
        })
      })
    })
  }

  // refresh
  if ('refresh' in req.query) return createCache()
  
  // choose action based on cache file stat
  fs.stat(filename, function (err, stat) {
    // serve cache
    if (!err && stat.mtime >= (Date.now() - cache.expires * 1000)) {
      return res.sendfile(filename)
    }
    
    // prevent cache being recreated by multiple requests simultaneously
    if (caching[hash]) {
      return caches.once(hash, res.sendfile.bind(res, filename))
    }
    
    createCache()
  })
})

function snapshot (params, cb) {
  var ps = spawn('phantomjs', [
    script, params.url, params.resolution,
    params.wait, cut, JSON.stringify(cookie)
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
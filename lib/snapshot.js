/**
 * module dependencies
 */

var crypto = require('crypto')
var mkdirp = require('mkdirp')
var path = require('path')
var EventEmitter = require('events').EventEmitter
var fs = require('fs')
var phantomjs = require('phantomjs')

/**
 * cache handling
 */

var caching = {}
var caches = new EventEmitter()

/**
 * snapshot route
 */

module.exports = function (app) {
  return function (req, res, next) {
    var snapshot = require(__dirname + '/../plugin/' + app.get('plugin') + '.js');
    if (!app.get('cache')) {
      return snapshot(app, req.params, function (err, rasterized) {
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
      .update(JSON.stringify(app.get('cache')))
      .update(JSON.stringify(app.get('cut')))
      .update(JSON.stringify(app.get('cookies')))
      .digest('hex')

    var dir = path.join(app.get('cache').dir, hash.slice(0, 2))
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
      var cacheAge = Date.now() - app.get('cache').expires * 1000
      if (!err && stat.mtime >= cacheAge) return res.sendfile(filename)

      // prevent cache being recreated by multiple requests simultaneously
      if (caching[hash]) {
        return caches.once(hash, res.sendfile.bind(res, filename))
      }

      createCache()
    })
  }
}

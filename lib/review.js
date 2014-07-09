/**
 * module dependencies
 */

var express = require('express')
var span = require('span')
var snapshot = require('./snapshot')

/**
 * review app
 */

module.exports = function review () {
  var app = express()

  app.set('title', 'Review')
  app.set('sites', {})
  app.set('resolutions', ['1200x800'])
  app.set('wait', 0)
  app.set('cache', false)
  app.set('cookies', [])
  app.set('cut', false)

  app.set('view engine', 'jade')
  app.set('views', __dirname + '/../views')
  app.use(express.static(__dirname + '/../public'))

  /**
   * setters
   */

  var setters = [
    'title', 'sites', 'resolutions', 'wait', 'cache', 'cookies', 'cut'
  ]
  setters.forEach(function (key) {
    app[key] = function (value) {
      return app.set(key, value)
    }
  })

  // for backward compatibility
  app['cookie'] = function(cookie) {
    var cookiesJar = app.get('cookies')
    cookiesJar.push(cookie)
    return app.set('cookies', cookiesJar)
  }

  /**
   * snapshot route
   */

  app.get('/snapshot/:url/:resolution/:wait', snapshot(app))

  /**
   * index
   */

  app.get('/', function (req, res, next) {
    if (typeof app.get('sites') == 'function') app.get('sites')(onSites)
    else onSites(null, app.get('sites'))

    function onSites (err, _sites) {
      if (err) return next(err)

      /**
       * calculate maximum screenshot width, used for scaling
       */

      var maxWidth
      app.get('resolutions').forEach(function (resolution) {
        var width = parseInt(resolution.split('x')[0], 10)
        if (!maxWidth || width > maxWidth) maxWidth = width
      })

      /**
       * add css information to resolutions
       */

      var resolutions = app.get('resolutions').map(function (resolution) {
        var width = parseInt(resolution.split('x')[0], 10)

        return {
          name : resolution,
          width : (width / maxWidth * 100) + '%',
          maxWidth : width + 'px'
        }
      })

      /**
       * encode sites' URLs to be URL-safe
       */

      var sites = {}
      Object.keys(_sites).forEach(function (title) {
        sites[title] = encodeURIComponent(_sites[title])
      })

      /**
       * render
       */

      res.render('index', {
        sites : sites,
        resolutions : resolutions,
        expires : app.get('cache')? span(app.get('cache').expires * 1000) : null
      })
    }
  })

  return app
}
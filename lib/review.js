var express = require('express')

module.exports = review

function review () {
  var title = 'Review'
  var sites = {}
  var resolutions = ['1200x800']
  var wait = 10000
  
  var app = express()
  
  app.set('view engine', 'jade')
  app.use(express.static(__dirname + '/../public'))
  
  /**
   * setters
   */
  
  app.title = function (_title) {
    title = _title
    return app
  }
  
  app.sites = function (_sites) {
    sites = _sites
    return app
  }
  
  app.resolutions = function (_resolutions) {
    resolutions = _resolutions
    return app
  }
  
  app.wait = function (_wait) {
    wait = _wait
    return app
  }

  /**
   * routes
   */
  
  app.get('/', function (req, res, next) {
    if (!sites) return res.status(500).end('sites not set')
    
    if (typeof sites == 'function') sites(onSites)
    else onSites(null, sites)
    
    function onSites (err, sites) {
      if (err) return next(err)
      
      /**
       * calculate maximum screenshot width, used for scaling
       */

      var maxWidth
      resolutions.forEach(function (resolution) {
        var width = parseInt(resolution.split('x')[0], 10)
        if (!maxWidth || width > maxWidth) maxWidth = width
      })

      /**
       * add css information to resolutions
       */

      var _resolutions = resolutions.map(function (resolution) {
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

      var _sites = {}
      Object.keys(sites).forEach(function (title) {
        _sites[title] = encodeURIComponent(sites[title])
      })

      /**
       * render
       */

      res.render('index', {
        title : title,
        sites : _sites,
        resolutions : _resolutions,
        wait : wait
      })
    }
  })
  
  app.use('/snapshot', require('./snapshot'))

  return app
}
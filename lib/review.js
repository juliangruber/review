var express = require('express')

module.exports = review

function review (title, sites, resolutions) {
  var title = 'Review'
  var sites = {}
  var resolutions = ['1200x800']
  
  var app = express()
  
  app.set('view engine', 'jade')
  app.use(express.static(__dirname + '/../public'))
  
  /**
   * setters
   */
  
  app.title = function (_title) {
    title = _title
    return this
  }
  
  app.sites = function (_sites) {
    sites = _sites
    return this
  }
  
  app.resolutions = function (_resolutions) {
    resolutions = _resolutions
    return this
  }

  /**
   * routes
   */
  
  app.get('/', function (req, res) {
    if (!sites) return res.status(500).end('sites not set')
    
    var maxWidth = resolutions.reduce(function (prev, cur) {
      return cur.split('x')[0] > prev.split('x')[0]
        ? cur
        : prev
    })
    
    var maxWidth = resolutions.reduce(function (prev, cur) {
      prev = typeof prev == 'string'
        ? parseInt(prev.split('x')[0], 10)
        : prev
      cur = parseInt(cur.split('x')[0], 10)
      if (prev > cur) return prev
      else return cur
    })
    
    // add class
    var _resolutions = resolutions.map(function (resolution) {
      var width = parseInt(resolution.split('x')[0], 10)
      
      return {
        name : resolution,
        width : (width / maxWidth * 100) + '%',
        maxWidth : width + 'px'
      }
    })
    
    res.render('index', {
      title : title,
      sites : sites,
      resolutions : _resolutions
    })
  })
  
  app.use('/snapshot', require('./snapshot'))

  return app
}
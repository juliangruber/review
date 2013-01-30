#!/usr/bin/env node

var review = require('..')
var optimist = require('optimist')

var argv = optimist
  .usage(
    'Host review\nUsage: $0 [options]\n\n'+
    'Examples: review --sites=\'{"google":"http://google.com"}\' --cache=100')
  .demand(['sites'])
  
  .describe('port', 'Port to listen on')
  .default('port', 4000)
  .alias('p', 'port')
  
  .describe('title', 'Title of the review')
  .default('title', 'Review')
  .alias('t', 'title')
  
  .describe('sites', 'Sites as JSON Object of strings')
  .alias('s', 'sites')
  
  .describe('resolutions', 'Resolutions as JSON Array of strings')
  .alias('r', 'resolutions')
  .default('resolutions', '["1200x800"]')
  
  .describe('wait', 'Time to give the page to finish loading, in milliseconds')
  .default('wait', 0)
  .alias('w', 'wait')
  
  .describe('cache', 'Cache snapshots for x milliseconds')
  .default('cache', false)
  .alias('c', 'cache')
  
  .describe('cookie', 'Make PhatomJS use this cookie-object')
  .default('cookie', '{}')
  
  .describe('cut', 'Cut snapshots to exact screen size')
  .default('cut', false)
  
  .describe('help', 'Print usage instructions')
  .alias('h', 'help')
  .argv
  
if (argv.help || !argv.sites) return optimist.showHelp()

review()
  .title(argv.title)
  .sites(JSON.parse(argv.sites))
  .resolutions(JSON.parse(argv.resolutions))
  .wait(argv.wait)
  .cookie(JSON.parse(argv.cookie))
  .cut(argv.cut)
  .cache(argv.cache? { dir : __dirname + '/cache', expires : argv.cache } : false)
  .listen(argv.port, function () {
    console.log('-> Review on port ' + argv.port)
  })
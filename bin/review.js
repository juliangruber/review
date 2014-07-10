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

  .describe('cookie', 'Add a cookie to PhatomJS')

  .describe('cut', 'Cut snapshots to exact screen size')
  .default('cut', false)

  .describe('help', 'Print usage instructions')
  .alias('h', 'help')
  .argv

if (argv.help || !argv.sites) return optimist.showHelp()

var server = review()

server.title(argv.title)
server.sites(JSON.parse(argv.sites))
server.resolutions(JSON.parse(argv.resolutions))
server.wait(argv.wait)
server.cut(argv.cut)

if (argv.cache) {
  server.cache({
    dir : __dirname + '/cache',
    expires : argv.cache
  })
} else {
  server.cache(false)
}

var cookies = argv.cookies
if (!Array.isArray(cookies)) cookies = [cookies]
cookies.forEach(function(cookie){
  server.cookie(JSON.parse(cookie))
});

server.listen(argv.port, function () {
  console.log('-> Review on port ' + argv.port)
})


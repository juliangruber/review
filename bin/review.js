#!/usr/bin/env node

var review = require('..')
var optimist = require('optimist')

var argv = optimist
  .usage('Host review\nUsage: $0 [options]\n\nExample: review --sites=\'{"google":"http://google.com"}\'')
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
  .describe('wait', 'Time to give the page to finish loading, in milliseconds')
  .default('wait', 10000)
  .alias('w', 'wait')
  .default('resolutions', '["1200x800"]')
  .describe('help', 'Print usage instructions')
  .alias('h', 'help')
  .argv
  
if (argv.help || !argv.sites) return optimist.showHelp()

review()
  .title(argv.title)
  .sites(JSON.parse(argv.sites))
  .resolutions(JSON.parse(argv.resolutions))
  .wait(argv.wait)
  .listen(argv.port, function () {
    console.log('-> Review on port ' + argv.port)
  })
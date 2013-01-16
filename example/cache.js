var review = require('..')

review()
  .title('Review')
  .sites({ 'github' : 'https://github.com/' })
  .resolutions(['1440x900', '1200x800', '640x480'])
  .cache({
    dir : __dirname + '/cache/',
    expires : 86400
  })
  .listen(5000, function () {
    console.log('-> Review on port 5000')
  })
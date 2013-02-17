var review = require('../..')

review()
  .title('My Review')
  .sites(function (cb) {
    cb(null, Math.random() > 0.5
      ? {
          microsoft : 'http://www.microsoft.com/',
          bootstrap : 'http://twitter.github.com/bootstrap/'
        }
      : {
          words : 'http://www.newnet-soft.com/beta/',
          alistapart : 'http://alistapart.com/'
        }
    )
  })
  .resolutions(['1900x1600', '1280x1024', '800x600'])
  .cut(true)
  .listen(5000, function () {
    console.log('-> Review on port 5000')
  })
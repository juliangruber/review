var review = require('..')

review()
  .title('Cached Review')
  .sites({ localhost : 'http://localhost:3000/' })
  .resolutions(['1280x1024', '800x600'])
  .cache(5)
  .listen(5000, function () {
    console.log('-> Review on port 5000')
  })
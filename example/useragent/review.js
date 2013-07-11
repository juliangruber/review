var review = require('../..')

review()
  .title('Review')
  .sites({
    'Useragent' : 'http://localhost:8777'
  })
  .listen(5000, function () {
    console.log('-> Review on port 5000')
  })

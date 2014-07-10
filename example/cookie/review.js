/**
 * cookie example
 *
 * first start the server with node server.js
 * then node review.js
 * and you'll see the cookie info you provided
 */


var review = require('../..')

review()
  .title('Review')
  .sites({
    'CookieMonster' : 'http://localhost:8777'
  })
  .cookie({
    name : 'my name is cookie',  
    value : 'this is what I do',
    domain : 'localhost'
  })
  .cookie({
    name : 'eating this eating that',  
    value : 'cookies never make me fat',
    domain : 'localhost'
  })
  .listen(5000, function () {
    console.log('-> Review on port 5000')
  })

var review = require('..')

review()
  .title('My Review')
  .sites({
      cookie_enabled_site : 'http://localhost:8080'
  })
  .resolutions(['1900x1600', '1280x1024', '800x600'])
  .cut(true)
  .cookie({
    'name':     'connect.sid',   /* required property */
    'value':    's%3A4eZ6a00e1jot1EF6HhqqmBCC.RgLmbqI8BQblhHTuUSIfX3ejWexW1x7rGEGcVOgMY%2BU',  /* required property */
    'domain':   'localhost',           /* required property */
    'path':     '/',
    'httponly': true,
    'secure':   false
    })
  .wait(5000)
  .listen(5000, function () {
    console.log('-> Review on port 5000')
  })
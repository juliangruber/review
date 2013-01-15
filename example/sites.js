require('../')()
  .title('My Review')
  .sites(function (cb) {
    setTimeout(function () {
      Math.random() > 0.5
        ? cb(null, { google : 'http://google.com/', github : 'https://github.com/' })
        : cb(null, { apple : 'http://apple.com/', yahoo : 'http://yahoo.com/' })
    }, 10)
  })
  .resolutions(['1900x1600', '1280x1024', '800x600'])
  .wait(0)
  .listen(5000, function () {
    console.log('-> Review on port 5000')
  })
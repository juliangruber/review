var images = Array.prototype.slice.apply(document.querySelectorAll('img'))
var info = document.querySelector('#info')
var loading = document.querySelector('#loading')

var loaded = 0
var reloads = 0

/**
 * loading indicator
 */
 
var iv = setInterval(function () {
  if (loaded == images.length) return clearInterval(iv)
  
  loading.innerHTML += '.'
  if (loading.innerHTML == '....') loading.innerHTML = ''
}, 500)

info.innerHTML = '0 / ' + images.length + ' loaded'

/**
 * reload
 */
 
images.forEach(function (image) {
  image.addEventListener('click', function () {
    reloads++
    var oldSrc = image.src + ''
    image.src = '/empty.jpg'
    setTimeout(function () {
      image.src = oldSrc
      image.src += oldSrc.match(/\?/)
        ? '&'
        : '?'
      image.src += 'reload'
    }, 1000)
  })
})

/**
 * loading status
 */
 
images.forEach(function (image) {
  image.addEventListener('load', function () {
    loaded = ++loaded - reloads
    info.innerHTML = loaded + ' / ' + images.length + ' loaded'
    if (loaded == images.length) info.innerHTML = 'all loaded'
  })
})
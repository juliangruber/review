var images = Array.prototype.slice.apply(document.querySelectorAll('img'))
var info = document.querySelector('#info')
var loading = document.querySelector('#loading')

var loaded = 0
var reloads = 0
var allLoaded = false

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
    
    // show gray placeholder in same dimensions
    var oldSrc = image.src + ''
    var oldHeight = image.height
    
    image.src = '/empty.jpg'
    image.style.height = oldHeight + 'px'
    
    setTimeout(function () {
      // force reload
      var newSrc = oldSrc
      newSrc += newSrc.match(/\?/)
        ? '&reload'
        : '?reload'
        
      image.src = newSrc
      
      function onLoad () {
        image.style.height = 'auto'
        image.removeEventListener('load', onLoad)
      }
      
      image.addEventListener('load', onLoad)
    }, 500)
  })
})

/**
 * loading status
 */
 
images.forEach(function (image) {
  image.addEventListener('load', function () {
    if (allLoaded) return
    loaded++
    info.innerHTML = (loaded-reloads) + ' / ' + images.length + ' loaded'
    if ((loaded-reloads) == images.length) {
      allLoaded = true
      info.innerHTML = 'all loaded'
      loading.innerHTML = ''
    }
  })
})
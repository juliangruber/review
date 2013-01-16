var images = Array.prototype.slice.apply(document.querySelectorAll('img'))
var links = Array.prototype.slice.apply(document.querySelectorAll('.refresh'))
var refreshAll = document.querySelector('.refresh-all')

/**
 * refresh all
 */

refreshAll.addEventListener('click', function () {
  var msg = "You're about to refresh " + images.length + " snapshots. Are you sure?"
  if (images.length > 10 && !confirm(msg)) return
  images.forEach(refresh)
})

/**
 * refresh
 */

links.forEach(function (link) {
  link.addEventListener('click', function () {
    refresh(link.parentNode.nextSibling.childNodes[0])
  })
})

function refresh (image) {
  // show gray placeholder in same dimensions
  var oldSrc = image.src + ''
  var oldHeight = image.height
  
  image.src = '/empty.jpg'
  image.style.height = oldHeight + 'px'
  
  setTimeout(function () {
    // force refresh
    var newSrc = oldSrc
    newSrc += newSrc.match(/\?/)
      ? '&refresh'
      : '?refresh'
      
    image.src = newSrc
    
    function onLoad () {
      image.style.height = 'auto'
      image.removeEventListener('load', onLoad)
    }
    
    image.addEventListener('load', onLoad)
  }, 500)
}
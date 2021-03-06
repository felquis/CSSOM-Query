var h1 = new CSSOMQuery('h1')
var box = new CSSOMQuery('.box')
var boxDOM = document.querySelector('.box')

var colors = ['blue', 'yellow', 'pink', 'brown', 'green', 'red', 'purple']
var currentColor = 0

function nextColor() {
  window.requestAnimationFrame(function () {
    currentColor = currentColor + 1

    if (currentColor === colors.length) {
      currentColor = 0
    }

    h1.set({
      color: colors[currentColor]
    })
  })
}

function toggleBox() {
  if (box.rule.style.height === '100px') {
    box.set({
      height: '200px',
      width: '200px'
    })
  } else {
    box.set({
      height: '100px',
      width: '100px'
    })
  }
}

function attachEvents() {
  document.querySelector('h1').addEventListener('click', nextColor)
  document.querySelector('.box').addEventListener('click', toggleBox)
  // box.on('transitionend', showMessage)
}

function showMessage(e) {
  // console.log('transition end: ', e.propertyName)
}

attachEvents()

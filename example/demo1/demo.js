var total = 0
var start
var end
var h1 = new CSSOMQuery('h1')
var h1DOM = document.querySelector('h1')
var result = document.querySelector('.box')

// ** CSSOM Selectors
function getH1() {
  start = new Date().getTime()
  nextColor(h1)
  total += (new Date().getTime()) - start
}

function domGeth1() {
  start = new Date().getTime()
  domNextColor(h1DOM)
  total += (new Date().getTime()) - start
}

var colors = ['blue', 'yellow', 'pink', 'brown', 'green', 'red', 'purple']
var currentColor = 0

function nextColor(element) {
  currentColor = currentColor + 1

  if (currentColor === colors.length) {
    currentColor = 0
  }

  element.set({
    color: colors[currentColor]
  })
}

function domNextColor(element) {
  currentColor = currentColor + 1

  if (currentColor === colors.length) {
    currentColor = 0
  }

  element.style.color = colors[currentColor]
}

var tests = {
  dom: domGeth1,
  cssom: getH1,
  otherwise: getH1
}

var hash = location.hash.replace('#', '')
var call = tests[hash]

call = call? call : tests.otherwise

for (var i = 1000; i >= 0; i--) {
    call()
}

result.innerHTML = (total / 1000)

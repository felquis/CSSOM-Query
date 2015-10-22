var box = new CSSOMQuery('.box')
var step = 0;

box.on('transitionend', next)

var steps = {
  0: function () {
    box.set('top', '400px')
    box.set('left', '100px')
    step += 1;
  },
  1: function () {
    box.set('top', '400px')
    box.set('left', '400px')
    step += 1;
  },
  2: function () {
    box.set('top', '100px')
    box.set('left', '400px')
    step += 1;
  },
  3: function () {
    box.set('top', '100px')
    box.set('left', '100px')
    step = 0;
  }
}

function next(argument) {
  if (steps[step]) {
    steps[step]()
  } else {
    step = 0;
  }
}

steps[0]()

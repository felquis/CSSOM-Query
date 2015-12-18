var box = new CSSOMQuery('.box')
var step = 0;

box.on('transitionend', next)

var steps = {
  // TODO: use translate
  0: function () {
    box.set({
      top: function (value) {
        console.log('top: ', value)
        return '400px'
      },
      left: '100px'
    })
    step += 1;
  },
  1: function () {
    box.set({
      top: '400px',
      left: '400px'
    })
    step += 1;
  },
  2: function () {
    box.set({
      top: '100px',
      left: '400px'
    })
    step += 1;
  },
  3: function () {
    box.set({
      top: '100px',
      left: '100px'
    })
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

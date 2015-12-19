function workForMe(workify) {
  var i = 0

  if (workify) {
    var close = function () {}
  } else {
    workify = postMessage
    close = self.close
  }

  var timer = setInterval(function() {
    i++
    workify(i)

    if (i > 5) {
      clearInterval(timer)
      // close worker
      close()
    }
  }, 500)
}

(function workifyInit() {
  window.URL = window.URL || window.webkitURL

  function checkSupport() {
    return window.URL && window.Blob && window.Worker
  }

  function callback(dataHandler) {
    return function (data) {
      dataHandler({data: data})
    }
  }

  function workify(func, dataHandler) {

    if (checkSupport()) {
      var file = '(' + func.toString() + '())'

      var blob = new Blob([file], {
        type: 'text/javascript'
      })
      var worker = new Worker(window.URL.createObjectURL(blob))

      worker.onmessage = data

      return worker
    } else {
      func(callback(dataHandler))

      return
    }
  }

  window.workify = window.workify || workify
}())

function data(e) {
  document.querySelector('#counter').innerHTML = e.data
}

var worker = workify(workForMe, data)

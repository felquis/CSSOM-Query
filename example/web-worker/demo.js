function workForMe(postMessage, close) {
  var i = 0

  var timer = setInterval(function() {
    i++
    postMessage(i)

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

  function emptyFunc() {}

  function workify(func, dataHandler) {

    if (!checkSupport()) {
      var file = '(' + func.toString() + '(postMessage, self.close))'

      var blob = new Blob([file], {
        type: 'text/javascript'
      })
      var worker = new Worker(window.URL.createObjectURL(blob))

      worker.onmessage = data

      return worker
    } else {
      func(callback(dataHandler), emptyFunc)

      return
    }
  }

  window.workify = window.workify || workify
}())

function data(e) {
  document.querySelector('#counter').innerHTML = e.data
}

var worker = workify(workForMe, data)

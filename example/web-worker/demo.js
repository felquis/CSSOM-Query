var myWorker = null,
  URL = window.URL || (window.webkitURL);

window.URL = URL;

function workForMe() {
  var i = 0;
  setInterval(function() {
    i++;
    postMessage(i);
  }, 500);
}

function useFuncInWorker(func) {
  var file = '(' + func.toString() + ')()'

  var blob = new Blob([file], {
    type: "text/javascript"
  });

  return new Worker(window.URL.createObjectURL(blob));
}

var myWorker = useFuncInWorker(workForMe)

myWorker.onmessage = function (e) {
  document.getElementById('counter').innerHTML = e.data;
};

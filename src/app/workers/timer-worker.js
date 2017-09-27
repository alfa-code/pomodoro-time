self.addEventListener('message', function(e) {
  //console.log(e.data)
  self.postMessage(e.data);

  let interval;

  if (e.data.x === 10) {
    interval = setInterval(() => {
      console.log(1)
    }, 1000)
  }

}, false);


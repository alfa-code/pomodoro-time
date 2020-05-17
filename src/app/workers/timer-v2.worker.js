self.addEventListener('message', (e) => {
    console.log('e.data', e.data);
    self.postMessage('hello main thread: said worker');
}, false);

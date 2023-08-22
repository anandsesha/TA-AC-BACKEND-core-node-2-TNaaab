const http = require('http');

function handleRequest(req, res) {
  if (req.method === 'POST' && req.url === '/') {
    var store = '';
    req.on('data', (chunk) => {
      store = store + chunk;
    });
    req.on('end', () => {
      console.log(store);
    });

    // send captured data in response using `res.write`
    res.write(store, () => {
      console.log(`Sending data back to client.....`);
    });
    res.end();
  }
}

var server = http.createServer(handleRequest);

server.listen(3456, () => {
  console.log(`Server listening on port 3456`);
});

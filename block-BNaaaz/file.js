const http = require('http');
const fs = require('fs');

function handleRequest(req, res) {
  res.setHeader('Content-Type', 'text/plain');
  fs.createReadStream('./readme.txt').pipe(res);
}

var server = http.createServer(handleRequest);
server.listen(3000, () => {
  console.log(`Server listening on port 3000`);
});

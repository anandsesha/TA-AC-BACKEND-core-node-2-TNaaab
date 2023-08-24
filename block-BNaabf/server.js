const path = require('path');

// #### path
// - get relative path of `index.js`
console.log('./projects/client/index.js');

// - get absolute path of `index.js`
console.log(path.join(__dirname, '/projects/client/index.js'));

// #### server
const http = require('http');
const fs = require('fs');
const qs = require('querystring');

function handleRequest(req, res) {
  var store = '';
  //   capture request
  req.on('data', (chunk) => {
    store += chunk;
  });

  //   Send response back to client
  req.on('end', () => {
    if (req.method === 'GET' && req.url === '/form') {
      res.setHeader('Content-Type', 'text/html');
      fs.readFile('./form.html', (err, content) => {
        console.log(`Form data sent to client`);
        res.write(content);
        res.end();
      });
    } else if (req.method === 'POST' && req.url === '/form') {
      res.setHeader('Content-Type', 'text/html');
      let parsedJSONData = qs.parse(store);
      console.log(typeof parsedJSONData.name); //string
      res.write(
        `<h1>${parsedJSONData.name}</h1><h2>${parsedJSONData.email}</h2><h3>${parsedJSONData.age}</h3>`
      );
      res.end();
    }
  });
}
var server = http.createServer(handleRequest);
server.listen(5678, () => {
  console.log(`Server is listening on port 5678`);
});

const qs = require('querystring');

//  Path

let path = require('path');

console.log(__filename);

console.log(__dirname + '/app.js');

console.log('./index.html');

console.log(path.join(__dirname, '/index.html'));

// Capture data on server
let http = require('http');

function handleRequest(req, res) {
  let reqDataFormat = req.headers['content-type'];
  let store = '';

  req.on('data', (chunk) => {
    console.log(reqDataFormat);
    store += chunk;
    console.log(chunk);
    console.log(typeof chunk); // object
  });

  req.on('end', () => {
    if (
      reqDataFormat === 'application/json' &&
      req.url === '/' &&
      req.method === 'POST'
    ) {
      console.log(typeof store); //string
      res.statusCode = 201;
      res.end(store); // we can send back string. Just not an object
    } else if (
      reqDataFormat === 'application/x-www-form-urlencoded' &&
      req.url === '/' &&
      req.method === 'POST'
    ) {
      console.log(typeof store); // string aka queryString-> team=kxip&players=18&captain=KL%20Rahul
      let parsedQsData = qs.parse(store);
      console.log(typeof parsedQsData.captain); // KL Rahul -> String
      res.end(parsedQsData.captain);
    }
  });
}

let server = http.createServer(handleRequest);
// server.listen(3000, () => {
//   console.log(`Server is listening at port 3000`);
// });

// server which can handle both json/form data
// without specifying which format of data is being received.
function handleServerTwoRequest(req, res) {
  let reqDataFormat = req.headers['content-type'];
  let store = '';

  req.on('data', (chunk) => {
    console.log(reqDataFormat);
    store += chunk;
    console.log(chunk);
    console.log(typeof chunk); // object
  });

  req.on('end', () => {
    if (req.method === 'POST' && req.url === '/') {
      if (reqDataFormat === 'application/json') {
        let parsedJsonData = JSON.parse(store);
        res.setHeader('Content-Type', 'text/html');
        res.write(
          `<h1>${parsedJsonData.name}</h1><h2>${parsedJsonData.email}</h2>`
        );
        res.end();
      }
      if (reqDataFormat === 'application/x-www-form-urlencoded') {
        console.log(`This ------------${reqDataFormat}`);
        let parsedQsData = qs.parse(store);
        console.log(parsedQsData); //object
        let stringQsData = JSON.stringify(parsedQsData); // object to string converted
        console.log(stringQsData); //object

        res.write(`<h2>${JSON.parse(stringQsData).email}</h2>`); // string to object again using parse
        // res.end(JSON.stringify(parsedQsData)); //string
        res.end();
      }
    }
  });
}

let serverTwo = http.createServer(handleServerTwoRequest);
serverTwo.listen(9000, () => {
  console.log(`Server is listening at port 9000`);
});

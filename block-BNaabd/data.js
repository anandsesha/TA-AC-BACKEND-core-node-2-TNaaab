const http = require('http');
const qs = require('querystring');

function handleRequest(req, res) {
  // send different types of data from postman and check `req.headers` for `content-type
  var reqDataFormat = req.headers['content-type'];
  var store = '';

  //   When you recieve request data
  req.on('data', (chunk) => {
    console.log(reqDataFormat); // just checking what type of data came in request
    store = store + chunk;
  });

  // When you parse and send back response
  req.on('end', () => {
    if (reqDataFormat === 'application/json' && req.url === '/json') {
      let parsedData = JSON.parse(store);
      console.log(parsedData); // an object received like: { name: 'Anand Seshadri', email: 'anand@anand.com' }
      res.end(store);
    }
    if (
      reqDataFormat === 'application/x-www-form-urlencoded' &&
      req.url === '/form'
    ) {
      let parsedQsData = qs.parse(store);
      console.log(parsedQsData); // an object received like:  [Object: null prototype] { name: 'Arvind', email: 'razzz@random.com' }
      res.end(JSON.stringify(parsedQsData));
    }
  });
}

var server = http.createServer(handleRequest);

server.listen(7000, () => {
  console.log(`Server listening on port 7000`);
});

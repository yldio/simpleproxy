var http = require('http');

var request = require('request');
var fs = require('fs');
var path = require('path');

var serviceWorkerPath = process.env.SWPATH || path.join(__dirname, 'serviceworker.js');
var squareSpaceUrl = process.env.SQUARESPACEURL || 'https://fiona-yelland-geys.squarespace.com';
var port = +process.env.PORT || 1337;
var pathToIntercept = process.env.PATHTOINTERCEPT || '/service-worker.js';

console.log('listening on port ' + port);
console.log('patch code should be at ' + serviceWorkerPath);
console.log('we expect squarespace to be online at ' + squareSpaceUrl);
console.log('we are interception for the following url: ' + pathToIntercept);

var serviceWorkerCode = fs.readFileSync(serviceWorkerPath);

http.createServer(function (req, res) {
  if(req.url === pathToIntercept) {
    res.setHeader('content-type', 'application/javascript');
    return res.end(serviceWorkerCode);
  }
  req.pipe(request(squareSpaceUrl + req.url)).pipe(res);
}).listen(port);

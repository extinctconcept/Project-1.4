/*server.js*/

const HTTP = require('http');
const FS = require('fs');
const URL = require('url');
const PATH = require('path');

const hostname = '127.0.0.1';
const port = 3000;

var contentTypesByExtension = {
  '.html': "text/html",
  '.js':   "text/javascript",
  '.css':  "text/css"
};

const server = HTTP.createServer(function(req, res) {

  var url_path = "/html" + URL.parse(req.url).pathname;
  console.log(url_path);
  var extension = PATH.extname(url_path);
  console.log(extension);
  var filename = PATH.join(process.cwd(), url_path);

  FS.readFile(filename,function(error,pgResp)
    {
      if(error)
      {
        res.writeHead(404);
        res.write("file not found");
        console.log("File Not Found");
      } else {
        res.writeHead(200, {'Content-Type': contentTypesByExtension[extension]});
        console.log(contentTypesByExtension[extension]);
        res.write(pgResp);
      }
      res.end();
    });
});

server.listen(port, hostname, function() {
  console.log('Server running at http://'+ hostname + ':' + port + '/');
});
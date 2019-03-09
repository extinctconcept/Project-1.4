const HTTP = require('http');
const FS = require('fs');
const URL = require('url');
const PATH = require('path');
const EXPRESS = require('express');
const LOGIN = require("./login.js");

const hostname = '127.0.0.1';
const port = 3000;
const app = EXPRESS();

var contentTypesByExtension = {
    '.html': "text/html",
    '.js':   "text/javascript",
    '.css':  "text/css"
};
/*
function LoadFile(path)
{
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
}*/

app.use('/', EXPRESS.static('html/static/index.html'));
app.use('/login', LOGIN.login);
app.use('/register', LOGIN.register);
app.use(EXPRESS.static("html/static"));
app.use(function (req, res, next) {
  res.status(404).send("File Not Found.");
})

app.listen(port, () => console.log(`Server listening on port ${port}!`))

const HTTP = require('http');
const FS = require('fs');
const URL = require('url');
const PATH = require('path');
const EXPRESS = require('express');
const LOGIN = require("./login.js");
const COOKIES = require("./cookie.js");
const PROFILE = require("./profile.js");

const hostname = '127.0.0.1';
const port = 3000;
const app = EXPRESS();

var contentTypesByExtension = {
    '.html': "text/html",
    '.js':   "text/javascript",
    '.css':  "text/css"
};

app.use(COOKIES.cookie);
app.use('/', EXPRESS.static('html/static/index.html'));
app.use('/login', LOGIN.login);
app.use('/register', LOGIN.register);
app.use('/logout|/logout.html', LOGIN.logout);
app.use('/profile.html', PROFILE.profile);
app.use('/profile', PROFILE.view_profile);
app.use(EXPRESS.static("html/static"));
app.use(function (req, res, next) {
  res.status(404).send("File Not Found.");
})

app.listen(port, () => console.log(`Server listening on port ${port}!`))

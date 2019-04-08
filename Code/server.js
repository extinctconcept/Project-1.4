const HTTP = require('http');
const FS = require('fs');
const URL = require('url');
const PATH = require('path');
const EXPRESS = require('express');
const LOGIN = require("./login.js");
const COOKIES = require("./cookie.js");
const PROFILE = require("./profile.js");
const CORS = require('cors');
const REQUEST = require("request");

const hostname = '127.0.0.1';
const port = 3000;
const app = EXPRESS();

var contentTypesByExtension = {
    '.html': "text/html",
    '.js':   "text/javascript",
    '.css':  "text/css"
};

function Query_Games_Api(req,res,next)
{
  var jar = REQUEST.jar();
  jar.setCookie(REQUEST.cookie("__cfduid=dbfedfdd2af3b8fd49a4dc01195a5a6841554437156"), "https://api-v3.igdb.com/games/");

  var options = { method: 'GET',
    url: 'https://api-v3.igdb.com/games/',
    qs: { fields: 'name,cover.url,genres.name', limit:'34'},
    headers:
    { 'user-key': 'b75f7df0294c1201e3e195ee8a453ca9',
      accept: 'application/json' },
    jar: 'JAR' };

  REQUEST(options, function (error, response, body) {
    if (error) throw new Error(error);

    res.send(body);
  });


}

//app.use(CORS({origin: '*'}));
app.use(COOKIES.cookie);
app.use('/', EXPRESS.static('html/static/index.html'));
app.use('/login', LOGIN.login);
app.use('/register', LOGIN.register);
app.use('/logout|/logout.html', LOGIN.logout);
app.use('/profile.html', PROFILE.profile);
app.use('/profile/:username', PROFILE.view_profile);
app.use(EXPRESS.static("html/static"));
app.use('/games', Query_Games_Api);
app.use(function (req, res, next) {
  res.redirect("/index.html");
})

app.listen(port, () => console.log(`Server listening on port ${port}!`))

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
const db = require('./queries')
const port = 3000;
const app = EXPRESS();

var contentTypesByExtension = {
    '.html': "text/html",
    '.js':   "text/javascript",
    '.css':  "text/css"
};

function Query_Games_Api(req,res,next)
{
  res.send('[ { "id": 64979, "cover": { "id": 45788, "url": "//images.igdb.com/igdb/image/upload/t_thumb/a7n0s0rvvnab5yt2a3y6.jpg" }, "name": "World War II: Prisoner of War" }, { "id": 54981, "cover": { "id": 30672, "url": "//images.igdb.com/igdb/image/upload/t_thumb/bnjc9z49ze1izibk8zrl.jpg" }, "name": "Banned Memories: Yamanashi" }, { "id": 105842, "name": "Robots Vs Zombies: Transform To Race And Fight" }, { "id": 90512, "name": "Asian Riddles 4" }, { "id": 60779, "cover": { "id": 40630, "url": "//images.igdb.com/igdb/image/upload/t_thumb/ldtnb6pzymexvzw5linv.jpg" }, "genres": [ { "id": 9, "name": "Puzzle" } ], "name": "Fallen Shadows" }, { "id": 98774, "genres": [ { "id": 15, "name": "Strategy" }, { "id": 32, "name": "Indie" } ], "name": "Whitevale Defender" }, { "id": 104945, "genres": [ { "id": 32, "name": "Indie" } ], "name": "Woodpunk" }, { "id": 81332, "name": "Stick Fighter II" }, { "id": 69359, "cover": { "id": 34231, "url": "//images.igdb.com/igdb/image/upload/t_thumb/bbboosegdval1pmsvm9n.jpg" }, "name": "Sunken Secrets" }, { "id": 69530, "name": "Dai Senryaku VII: Modern Military Tactics" }, { "id": 91579, "name": "Racing Live" }, { "id": 104748, "name": "Space station - build your own ISS" }, { "id": 17584, "genres": [ { "id": 32, "name": "Indie" } ], "name": "Spirit Run: Fire vs. Ice" }, { "id": 29783, "genres": [ { "id": 31, "name": "Adventure" }, { "id": 32, "name": "Indie" } ], "name": "Unlucky Seven" }, { "id": 99008, "genres": [ { "id": 32, "name": "Indie" } ], "name": "Synther" }, { "id": 105254, "name": "Codenames" }, { "id": 110810, "genres": [ { "id": 13, "name": "Simulator" }, { "id": 32, "name": "Indie" } ], "name": "Running Naked Simulator 2019" }, { "id": 84208, "name": "Y2K: The Game" }, { "id": 25763, "cover": { "id": 18701, "url": "//images.igdb.com/igdb/image/upload/t_thumb/jngf8tel8hamvgetvvxx.jpg" }, "genres": [ { "id": 5, "name": "Shooter" }, { "id": 32, "name": "Indie" }, { "id": 33, "name": "Arcade" } ], "name": "Underload" }, { "id": 101139, "name": "Last Saver: Zombie Hunter Master" }, { "id": 93987, "name": "Pi Story" }, { "id": 91756, "name": "Aban Hawkins \u0026 the 1000 SPIKES" }, { "id": 111593, "genres": [ { "id": 32, "name": "Indie" } ], "name": "Oppai Puzzle" }, { "id": 29794, "genres": [ { "id": 31, "name": "Adventure" } ], "name": "Mystery Case Files: The Black Veil Collector\u0027s Edition" }, { "id": 60787, "cover": { "id": 40641, "url": "//images.igdb.com/igdb/image/upload/t_thumb/kijfitcdtoqvopggwfj6.jpg" }, "genres": [ { "id": 8, "name": "Platform" } ], "name": "Meme Run" }, { "id": 108593, "name": "Toot\u0027s Race" }, { "id": 66891, "cover": { "id": 48380, "url": "//images.igdb.com/igdb/image/upload/t_thumb/gtmrnyyhksf7rpoy8sfk.jpg" }, "name": "Zoo Frenzy" }, { "id": 57729, "cover": { "id": 38529, "url": "//images.igdb.com/igdb/image/upload/t_thumb/hreiw3altbjjvnv1vwb8.jpg" }, "genres": [ { "id": 9, "name": "Puzzle" } ], "name": "Laserbreak: Esacpe" }, { "id": 90545, "genres": [ { "id": 13, "name": "Simulator" }, { "id": 15, "name": "Strategy" }, { "id": 32, "name": "Indie" } ], "name": "Rento Fortune - Multiplayer Board Game" }, { "id": 52661, "name": "Pinball Heroes: Modnation Racers" }, { "id": 93939, "name": "Ranch Rush 2" }, { "id": 110811, "name": "PitterPot" }, { "id": 110812, "genres": [ { "id": 9, "name": "Puzzle" }, { "id": 31, "name": "Adventure" } ], "name": "The DOOR" }, { "id": 42380, "cover": { "id": 35330, "url": "//images.igdb.com/igdb/image/upload/t_thumb/axpjigmf8uqb9ouamhiz.jpg" }, "genres": [ { "id": 26, "name": "Quiz/Trivia" } ], "name": "Shounin yo, Taishi o Idake!!" } ]');
  /* This api has limited amount of requests, so lets wait for demos.
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
  });*/


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

app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

app.get('/', (request, response) => {
  response.json({ info: 'Node.js, Express, and Postgres API' })
})

app.get('/users', db.getUsers)

app.listen(port, () => console.log(`Server listening on port ${port}!`))

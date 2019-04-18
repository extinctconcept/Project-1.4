const COOKIES = require("cookies");
const EXPRESS = require('express');
const LOGIN = require("./login.js");
const URL = require('url');
const db = require('./queries')

module.exports.profile = function(req, res, next)
{
    var cookies = new COOKIES(req,res);
    sessionID = cookies.get('key');

    console.log("" + sessionID + " " + LOGIN.sessions[sessionID]);

    if(!sessionID || !LOGIN.sessions[sessionID])
    {
        EXPRESS.static("html/static/login.html")(req,res,next);
    }
    else
    {
        EXPRESS.static("html/static/profile.html")(req,res,next);
    }
}

module.exports.view_profile = function(req,res,next)
{
    var username = req.params.username;
    //Some sort of code for getting a profile that is different than the users.
    //var query_data = URL.parse(req.url,true).query;
    res.send("[]");
}

module.exports.get_profile_games = function(req, res, next)
{
    var cookies = new COOKIES(req,res);
    sessionID = cookies.get('key');
    console.log("Games of: " + sessionID + " " + LOGIN.sessions[sessionID]);
    if(!sessionID || !LOGIN.sessions[sessionID])
    {
        res.send("[]");
    }
    else
    {
        let games = db.getGamesByUser(LOGIN.sessions[sessionID]);
        console.log(games);
        res.send(JSON.stringify(games));
    }
}

module.exports.add_profile_games(req,res,next)
{

}

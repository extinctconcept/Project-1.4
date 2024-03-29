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
    res.setHeader('Content-Type', 'application/json');
    console.log("Games of: " + sessionID + " " + LOGIN.sessions[sessionID]);
    if(!sessionID || !LOGIN.sessions[sessionID])
    {
        console.log("no login sending empty json");
        res.send("[]");
    }
    else
    {
        let games;
        db.getGamesByUser(LOGIN.sessions[sessionID], (result) => {games = result
            console.log(games);
            res.status(200);
            res.send(JSON.stringify(games));
        });
    }
}

module.exports.add_profile_games = function(req,res,next)
{
    
    var query_data = URL.parse(req.url, true).query;
    let title = query_data.title;

    var cookies = new COOKIES(req,res);
    sessionID = cookies.get('key');
    console.log("Add game to: " + sessionID + " " + LOGIN.sessions[sessionID]);
    console.log(query_data);
    //res.setHeader('Content-Type', 'application/json');
    if(!sessionID || !LOGIN.sessions[sessionID])
    {
        EXPRESS.static("html/static/profile.html")(req,res,next);
        //res.send("0");
    }
    else
    {
        let game_id;
        db.createGame(LOGIN.sessions[sessionID], title, (result) => {
            game_id = result;
            res.redirect("profile.html");
        });
        //res.send(JSON.stringify(game_id));
    }
}


module.exports.getprofileexchanges = function(req,res,next)
{
    var cookies = new COOKIES(req,res);
    sessionID = cookies.get('key');
    if(!sessionID || !LOGIN.sessions[sessionID])
    {

    }
    else
    {
        db.getUser(LOGIN.sessions[sessionID], (user) =>{
            db.getExchangebyUserID(user.person_id, (exchanges) =>{
                if(!exchanges)
                {
                    res.status(200);
                    res.send("[]");
                }
                else
                {
                    console.log(exchanges);
                    res.status(200);
                    res.send(JSON.stringify(exchanges));
                }
            })
        });
    }

}
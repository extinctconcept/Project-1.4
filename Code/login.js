const EXPRESS = require('express');
const URL = require('url');
const FS = require('fs');
const COOKIES = require('cookies');
const DB = require("./queries")

var logins = { 'test': 'test' };
var sessions = ['test'];
var sessionID = 1;

function Query_Login(username, password)
{
    let database_pass;
    DB.getUser(username, (result) => {database_pass = result;});
    return password == database_pass.password;

        return logins[username] == password;
        //return username == 'test' && password == 'test';
}

function Query_Register(username,password)
{
    if(logins[username] !== undefined)
        return false;

    logins[username] = password;
    return true; // username is not already in the database.
}

module.exports.Query_Register = Query_Register;
module.exports.Query_Login = Query_Login;

module.exports.login = function(req, res, next)
{

    var query_data = URL.parse(req.url, true).query;
    console.log(query_data);
    if (Query_Login(query_data.username, query_data.password)) {
        var cookies = new COOKIES(req, res);
        cookies.set('key', sessionID, { httpOnly: false });
        sessions[sessionID] = query_data.username;
        sessionID += 1;

        EXPRESS.static("html/static/profile.html")(req, res, next);
        // really we want to shove information into this instead of doing a static serve
        // this is fine for now.  Either that or the page could request a json object later.
    }
    else {
        EXPRESS.static("html/static/login.html")(req, res, next);
    }
}

module.exports.register = function (req, res, next) {
    var query_data = URL.parse(req.url, true).query;
    console.log(query_data);

    if(Query_Register(query_data.username,query_data.password))
    {
        var cookies = new COOKIES(req, res);
        cookies.set('key', sessionID, { httpOnly: false });
        sessions[sessionID] = query_data.username;
        sessionID += 1;
        EXPRESS.static("html/static/profile.html")(req,res,next);
    }
    else
    {
        EXPRESS.static("html/static/login.html")(req,res,next);
    }

        // really we want to shove information into this instead of doing a static serve
        // this is fine for now.  Either that or the page could request a json object later.
}

module.exports.logout = function (req, res, next) {
    var cookies = new COOKIES(req, res);
    cookies.set('key', 0, { expires: new Date(), httpOnly: false });
    res.redirect("/index.html");
}

module.exports.sessions = sessions;

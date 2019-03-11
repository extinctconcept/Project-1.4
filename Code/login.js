const EXPRESS = require('express');
const URL = require('url');
const FS = require('fs');
const COOKIES = require('cookies');

var logins = {'test':'test'};
var sessions = ['test'];
var sessionID = 1;

function Query_Login(username, password)
{
    return logins[username] == password;
    //return username == 'test' && password == 'test';
}

module.exports.login = function(req, res, next)
{
    var query_data = URL.parse(req.url, true).query;
    console.log(query_data);
    var cookies = new COOKIES(req,res);
    if(Query_Login(query_data.username, query_data.password))
    {
        cookies.set('key',sessionID);
        sessions[sessionID] = query_data.username;
        sessionID += 1;

        EXPRESS.static("html/static/profile.html")(req,res,next);
        // really we want to shove information into this instead of doing a static serve
        // this is fine for now.  Either that or the page could request a json object later.
    }
    else
    {
        EXPRESS.static("html/static/login.html")(req,res,next);
    }
}

module.exports.register = function(req, res, next)
{
    var query_data = URL.parse(req.url, true).query;
    console.log(query_data);
    if(logins[query_data.username] === undefined)
    {
        logins[query_data.username] = query_data.password;
        EXPRESS.static("html/static/profile.html")(req,res,next);
        // really we want to shove information into this instead of doing a static serve
        // this is fine for now.  Either that or the page could request a json object later.
    }
    else
    {
        EXPRESS.static("html/static/login.html")(req,res,next);
    }
}

module.exports.logout = function(req,res,next)
{
    res.clearCookie('key');
}

module.exports.sessions = sessions;
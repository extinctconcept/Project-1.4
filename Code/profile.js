const COOKIES = require("cookies");
const EXPRESS = require('express');
const LOGIN = require("./login.js")

module.exports.profile = function(req, res, next)
{
    var cookies = new COOKIES(req,res);
    sessionID = cookies.get('key');
    
    console.log("" + sessionID + " " + LOGIN.sessions[sessionID]);

    if(!sessionID || !LOGIN.sessions[sessionID])
    {
        EXPRESS.static("html/static/login.html")(req,res,next)
    }
    else
    {
        EXPRESS.static("html/static/profile.html")(req,res,next);
    }
}
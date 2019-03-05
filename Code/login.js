const EXPRESS = require('express');
const URL = require('url');
const FS = require('fs');


function Query_Login(username, password)
{
    return username == 'test' && password == 'test';
}

module.exports.login = function(req, res, next)
{
    var query_data = URL.parse(req.url, true).query;
    console.log(query_data);
    if(Query_Login(query_data.username, query_data.password))
    {
        EXPRESS.static("html/static/profile.html")(req,res,next);
        // really we want to shove information into this instead of doing a static serve
        // this is fine for now.
    }
    else
    {
        EXPRESS.static("html/static/login.html")(req,res,next);
    }
}
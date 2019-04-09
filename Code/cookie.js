const EXPRESS = require('express');
const URL = require('url');
const FS = require('fs');
const COOKIES = require('cookies');

var session = 0;
module.exports.cookie = function(req, res, next)
{
    var cookies = new COOKIES(req,res);

    var lastVisit = cookies.get('LastVisit');

    cookies.set('LastVisit', new Date().toISOString());
    cookies.set('cookie', "", {httpOnly:false, sameSite:false});

    if(!lastVisit)
    {
        console.log("First Visit");
    }
    else
    {
        console.log("Last Visit " + lastVisit);
    }
    next();
}
const DB = require('./queries');

module.exports.requestgame = function(req,res,next)
{

}

module.exports.allgames = function(req,res,next)
{
    DB.getGames((result) =>{
        res.status(200);
        res.send(JSON.stringify(result));
    })
}
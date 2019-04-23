const DB = require('./queries');

module.exports.request_game = function(req,res,next)
{

}

module.exports.all_games = function(req,res,next)
{
    DB.getGames((result) =>{
        res.status(200);
        res.send(JSON.stringify(result));
    })
}
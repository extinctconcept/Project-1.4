const DB = require('./queries');

module.exports.requestgame(req,res,next)
{

}

module.exports.allgames(req,res,next)
{
    DB.getGames((result) =>{
        res.status(200);
        res.send(JSON.stringify(result));
    })
}
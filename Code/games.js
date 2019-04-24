const DB = require('./queries');
const URL = require('url');
const LOGIN = require('./login');

module.exports.request_game = function(req,res,next)
{
    var query_data = URL.parse(req.url, true).query;
    
    var cookies = new COOKIES(req,res);
    sessionID = cookies.get('key');

    if(!sessionID || !LOGIN.sessions[sessionID])
    {
        res.redirect("login.html");
    }
    else
    {
        DB.getGamesbyID(query_data.game_id, (result) => {
            console.log(result);
            if(result[0] === undefined)
            {
                res.redirect("index.html");
            }
            else
            {
                DB.getUserID(result.person_id,(owner) => {
                    DB.getUser(LOGIN.sessions[sessionID], (borrower) =>{

                        DB.createExchange(owner.person_id,borrower.person_id,query_data.game_id,(result)=>{
                            if(result === undefined)
                                res.redirect("index.html");
                            else
                                res.redirect("request.html");
                        });
                    })

                }
            }
        });
}
}

module.exports.all_games = function(req,res,next)
{
    DB.getGames((result) =>{
        res.status(200);
        res.send(JSON.stringify(result));
    })
}
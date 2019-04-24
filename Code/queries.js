const URL = require('url');
const {Pool} = require('pg');
const pool = new Pool({
  user: 'pi',
  host: 'localhost',
  database: 'project',
  password: 'Project4321',
  port: 5432,
})

module.exports.getUsers = (callback) => {
   pool.query('SELECT * FROM persons ORDER BY person_id ASC', (error, results) => {
      if (error) {
        results = {};//throw error
      }
      //response.status(200).json(results.rows)
      // console.log(results.rows);
      callback(results.rows);
    })
  }

module.exports.getUser = (username, callback) => {
    //module.exports.query_data = URL.parse(request.url, true).query;
    pool.query('SELECT * FROM persons WHERE username = $1', [username], (error, results) => {
    if(error) {
      callback(undefined);
        //throw(error)
    }
    else
    {
      callback(results.rows[0]);
    }
    // console.log(results.rows[0]);
    //response.status(200).json(results.rows)
  });
}

module.exports.getUserbyID = (person_id, callback) => {
  //module.exports.query_data = URL.parse(request.url, true).query;
  pool.query('SELECT * FROM persons WHERE person_id = $1', [person_id], (error, results) => {
  if(error) {
    callback(undefined);
      //throw(error)
  }
  else
  {
    callback(results.rows[0]);
  }
  // console.log(results.rows[0]);
  //response.status(200).json(results.rows)
});
}

module.exports.createUser = (password, username, first_name, last_name, email, callback) => {
   pool.query('INSERT INTO persons (password, username, first_name, last_name, email) values ($1, $2, $3, $4, $5)', 
      [password, username, first_name, last_name, email], (error, results) => {
      if (error) {
        results = {};//throw error
      }
      //response.status(201).send(`User added with ID: ${result.insertId}`)
      // callback(results.insertId;
      // console.log(results.insertId);
      callback(results.insertId);
    })
}

// this will return all games that have an exchange request
module.exports.getGamesByUserExchange = (username, callback) => {
  pool.query('SELECT * FROM game AS gm\
               LEFT JOIN persons AS pe ON (gm.person_id = pe.person_id) \
               LEFT JOIN exchange AS ex ON (pe.person_id = ex.owner_id) \
               WHERE pe.username = $1  ORDER BY game_id ASC',[username], (error, results) => {
     if (error) {
       results = {};//throw error
       callback(undefined);
     }
     else
    {
      callback(results.rows[0]);
    }
     
    //  console.log(results.rows);
   })
 }

// this will pull all games the user has posted
module.exports.getGamesByUser = (username, callback) => {
   pool.query('SELECT * FROM game LEFT JOIN persons ON (game.person_id = persons.person_id) WHERE persons.username = $1 ORDER BY game_id ASC',[username], (error, results) => {
      if (error) {
        throw error;
        results = {};
      }
      
      console.log(results.rows);
      //returing all rows breaks the test that is looking for a single game
      callback(results.rows);
    })
  }

  module.exports.getGamebyID = (game_id, callback) => {
    pool.query('SELECT * FROM game WHERE game_id = $1 ORDER BY game_id ASC',[game_id], (error, results) => {
       if (error) {
         throw error;
         results = {};
       }
       
       console.log(results.rows);
       //returing all rows breaks the test that is looking for a single game
       callback(results.rows);
     })
   }

module.exports.getGames = (callback) => {
   pool.query('SELECT * FROM game ORDER BY game_id ASC', (error, results) => {
      if (error) {
        results = {};//throw error;
      }
      // console.log(results.rows);
      callback(results.rows);
    })
  }

// returns the results of all games matching on search
module.exports.searchGames = (title, callback) => {
    pool.query('SELECT * FROM game WHERE LOWER(title) like LOWER($1) ORDER BY game_id ASC', ['%'+title+'%'],(error, results) => {
       if (error) {
         results = {};//throw error;
       }
       console.log(results.rows);
       callback(results.rows);
     })
   }

let getPersonId = (username, callback) => {
   pool.query('SELECT person_id FROM persons WHERE username = $1', [username], (error, results) => {
    if(error) {
      results = {};//throw error;
      callback(undefined);
    }
    else
    {
      if(results.rows[0] == undefined) callback(undefined);
      else callback(results.rows[0].person_id);
    }
    // callback(results.rows
    // console.log(results.rows);
  })
}

module.exports.createGame = (username, title, callback) => {
    let person_id;
    getPersonId(username, (result) => {
      person_id = result;
      console.log("id is: " + person_id + " " + title);
      pool.query('INSERT INTO game (person_id, title, availability_id) values ($1, $2, 1)', 
        [person_id, title], (error, results) => {
        if (error) {
          throw error;
          results = {};//throw error
        }
        else
        {
          callback(results.insertId);
        }
        //response.status(201).send(`User added with ID: ${result.insertId}`)
        // callback(results.insertId;
        // console.log(results.insertId);
      })
    });
}

// this should be called when someone wants to borrow a game
// you need to pass in the user's id who is making the request as well as the owners id 
module.exports.createExchange = (owner_id, borrower_id, game_id, callback) => {
  pool.query('INSERT INTO exchange (owner_id, borrower_id, game_id, exchange_date, return_date) \
              VALUES ($1, $2, $3, current_date, current_date + 14)',
    [owner_id, borrower_id, game_id],(error,results) => {
    if(error) {
      throw error;
    }
    console.log("Exchange created" + results.insertId);
    callback(results);
  })
}

module.exports.getExchangebyUserID = function(owner_id, callback)
{
  pool.query("SELECT * FROM exchange WHERE owner_id = $1", [owner_id],(error, results) =>{
    if(error)
    {
      throw error;
    }
    else
    {
      callback(results.rows);
    }
  })
}

// only the owner should be able to do this
module.exports.deleteExchange = (exchange_id, callback) => {
  pool.query('DELETE FROM exchange WHERE exchange_id = $1', [exchange_id], (error,results) => {
    if(error) {
      throw error;
    }
    // console.log(results);
    callback(results.row)
  })
}

module.exports.modifyGameExchangeType = (availability_id, game_id, callback) => {
  // note 1 = availalble || 2 = unavailable ||  3 = pending
  pool.query('UPDATE game AS gm \
              SET availability_id = $1 \
              WHERE game_id = $2',[availability_id, game_id],(error,results) =>{
      if(error) {
        throw error;
      }
      // console.log(results);
      callback(results)
    })
}

module.exports.viewGamesByUserAndStatus = (username, type, callback) => {
  // note type needs to be 1, 2, or 3
  pool.query('SELECT * FROM game LEFT JOIN persons ON (game.person_id = persons.person_id) WHERE persons.username = $1 AND game.availability_id = $2 ORDER BY game_id ASC',[username, type], (error, results) => {
    if (error) {
      throw error;
      results = {};
    }
    
    console.log(results.rows);
    //returing all rows breaks the test that is looking for a single game
    callback(results.rows);
  })
}

module.exports.viewGamesByStatus = (type, callback) => {
  // note type needs to be 1, 2, or 3
  pool.query('SELECT * FROM game LEFT JOIN persons ON (game.person_id = persons.person_id) WHERE game.availability_id = $1 ORDER BY game_id ASC',[type], (error, results) => {
    if (error) {
      throw error;
      results = {};
    }
    
    console.log(results.rows);
    //returing all rows breaks the test that is looking for a single game
    callback(results.rows);
  })
}

/*
module.exports = {
  createUser,
  createGame,
  createExchange,
  getUsers,
  getUser,
  getGames,
  getGamesByUser,
  getPersonId,
}*/

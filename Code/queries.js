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
      console.log(results.rows);
      callback(results.rows);
    })
  }

module.exports.getUser = (username, callback) => {
    //module.exports.query_data = URL.parse(request.url, true).query;
    pool.query('SELECT * FROM persons WHERE username = $1', [username], (error, results) => {
    if(error) {
        //throw(error)
    }
    console.log(results.rows[0]);
    callback(results.rows[0]);
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
      console.log(results.insertId);
      callback(results.insertId);
    })
}

module.exports.getGamesByUser = (username, callback) => {
   pool.query('SELECT * FROM game AS gm\
                JOIN persons AS pe ON (gm.person_id = pe.person_id) \
                JOIN exchange AS ex ON (pe.person_id = ex.owner_id) \
                WHERE pe.username = $1  ORDER BY game_id ASC',[username], (error, results) => {
      if (error) {
        results = {};//throw error
      }
      
      console.log(results.rows);
      callback(results.rows);
    })
  }

module.exports.getGames = (callback) => {
   pool.query('SELECT * FROM game ORDER BY game_id ASC', (error, results) => {
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
    }
    // callback(results.rows
    console.log(results.rows);
    callback(results.row[0].person_id);
  })
}

module.exports.createGame = (username, title, callback) => {
    let person_id;
    getPersonId(username, (result) => {person_id = result;});
    console.log("id is: " + person_id);
    pool.query('INSERT INTO game (person_id, title) values ($1, $2)', 
      [person_id, title], (error, results) => {
      if (error) {
        results = {};//throw error
      }
      //response.status(201).send(`User added with ID: ${result.insertId}`)
      // callback(results.insertId;
      console.log(results.insertId);
      callback(results.insertId);
    })
}

// this should be called when someone wants to borrow a game
// you need to pass in the user's id who is making the request as well as the owners id 
module.exports.createExchange = (reqeust, response) => {
  pool.query('INSERT INTO exchange (owner_id, borrower_id, game_id, exchange_date, return_date) \
              VALUES ($1, $2, $3, current_date, current_date + 14)',
  [owner_id, borrower_id, game_id],(error,results) => {
  if(error) {
    throw error;
  }
  console.log(results.rows);
  return results.rows
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

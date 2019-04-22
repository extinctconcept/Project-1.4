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

module.exports.getPersonId = (username, callback) => {
   pool.query('SELECT person_id FROM persons WHERE username = $1', [username], (error, results) => {
    if(error) {
      results = {};//throw error;
    }
    // callback(results.rows
    console.log(results.rows);
    callback(results.row[0]);
  })
}

module.exports.createGame = (username, title, callback) => {
    let id;
    module.exports.getPersonId(username, (result) => {id = result;});
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
/*
module.exports = {
  createUser,
  getUsers,
  getUser,
  getGames,
  getGamesByUser,
  createGame,
  getPersonId,
}*/

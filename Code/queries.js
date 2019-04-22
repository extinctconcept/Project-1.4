const URL = require('url');
const {Pool} = require('pg');
const pool = new Pool({
  user: 'pi',
  host: 'localhost',
  database: 'project',
  password: 'Project4321',
  port: 5432,
})

module.exports.getUsers = () => {
  return pool.query('SELECT * FROM persons ORDER BY person_id ASC', (error, results) => {
      if (error) {
        results = {};//throw error
      }
      //response.status(200).json(results.rows)
      console.log(results.rows);
      return results.rows;
    })
  }

module.exports.getUser = (username) => {
    //module.exports.query_data = URL.parse(request.url, true).query;
    return pool.query('SELECT * FROM persons WHERE username = $1', [username], (error, results) => {
    if(error) {
        //throw(error)
    }
    console.log(results.rows[0]);
    return results.rows[0];
    //response.status(200).json(results.rows)
  });
}

module.exports.createUser = (password, username, first_name, last_name, email) => {
  return pool.query('INSERT INTO persons (password, username, first_name, last_name, email) values ($1, $2, $3, $4, $5)', 
      [password, username, first_name, last_name, email], (error, results) => {
      if (error) {
        results = {};//throw error
      }
      //response.status(201).send(`User added with ID: ${result.insertId}`)
      // return results.insertId;
      console.log(results.insertId);
      return results.insertId;
    })
}

module.exports.getGamesByUser = (username) => {
  return pool.query('SELECT * FROM game AS gm\
                JOIN persons AS pe ON (gm.person_id = pe.person_id) \
                WHERE pe.username = $1  ORDER BY game_id ASC',[username], (error, results) => {
      if (error) {
        results = {};//throw error
      }
      
      console.log(results.rows);
      return results.rows;
    })
  }

module.exports.getGames = () => {
  return pool.query('SELECT * FROM game ORDER BY game_id ASC', (error, results) => {
      if (error) {
        results = {};//throw error;
      }
      console.log(results.rows);
      return results.rows;
    })
  }

module.exports.getPersonId = (username) => {
  return pool.query('SELECT person_id FROM persons WHERE username = $1', [username], (error, results) => {
    if(error) {
      results = {};//throw error;
    }
    // return results.rows
    console.log(results.rows);
    return results.row[0];
  })
}

module.exports.createGame = (username, title) => {
    let person_id = getPersonId(username);
    console.log("id is: " + person_id);
    pool.query('INSERT INTO game (person_id, title) values ($1, $2)', 
      [person_id, title], (error, results) => {
      if (error) {
        results = {};//throw error
      }
      //response.status(201).send(`User added with ID: ${result.insertId}`)
      // return results.insertId;
      console.log(results.insertId);
      return results.insertId;
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

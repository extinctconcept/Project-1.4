const URL = require('url');
const Pool = require('pg').Pool
const pool = new Pool({
  user: 'pi',
  host: 'localhost',
  database: 'project',
  password: 'Project4321',
  port: 5432,
})

const getUsers = (request, response) => {
    pool.query('SELECT * FROM persons ORDER BY person_id ASC', (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
  }

const getUser = (request, response) => {
    const query_data = URL.parse(request.url, true).query;
    console.log(query_data.username);
    pool.query('SELECT * FROM persons WHERE username = $1', [query_data.username], (error, results) => {
    if(error) {
        throw(error)
    }
    response.status(200).json(results.rows)
  });
}

const createUser = (request, response) => {
  const {
    password,
    username,
    first_name,
    last_name,
    email
    } = request.body

    pool.query('INSERT INTO persons (password, username, first_name, last_name, email) values ($1, $2, $3, $4, $5)', 
      [password, username, first_name, last_name, email], (error, results) => {
      if (error) {
        throw error
      }
      response.status(201).send(`User added with ID: ${result.insertId}`)
    })
}

const getGamesByUser = (request, response) => {
    const query_data = URL.parse(request.url, true).query;
    pool.query('SELECT * FROM game AS gm\
                JOIN persons AS pe ON (gm.person_id = pe.person_id) \
                WHERE pe.username = $1  ORDER BY game_id ASC',[query_data.username], (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
  }

const getGames = (request, response) => {
    pool.query('SELECT * FROM game ORDER BY id ASC', (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
  }

const createGame = (request, response) => {
  // const {
  //   password,
  //   username,
  //   first_name,
  //   last_name,
  //   email
  //   } = request.body

  //   pool.query('INSERT INTO persons (password, username, first_name, last_name, email) values ($1, $2, $3, $4, $5)', 
  //     [password, username, first_name, last_name, email], (error, results) => {
  //     if (error) {
  //       throw error
  //     }
  //     response.status(201).send(`User added with ID: ${result.insertId}`)
  //   })  
}

module.exports = {
  createUser,
  getUsers,
  getUser,
  getGames,
  getGamesByUser,
}
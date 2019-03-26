const { Pool, Client } = require('pg')

const pool = new Pool({
  user: 'postgres',
  host: 'database.server.com',
  database: 'project',
  password: 'postgres',
  port: 3211,
})

pool.query('SELECT NOW()', (err, res) => {
  console.log(err, res)
  pool.end()
})

const client = new Client({
  user: 'postgres',
  host: 'database.server.com',
  database: 'project',
  password: 'postgres',
  port: 3211,
})
client.connect()

client.query('SELECT NOW()', (err, res) => {
  console.log(err, res)
  client.end()
})

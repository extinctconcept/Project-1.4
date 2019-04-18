//First we 'require' the 'pg' module
var pg = require('pg');
//Next we define a connection string. The string contains the
//connection protocol, username, password, host, post, and database name.

//A localhost PostgreSQL database's connection string is simple.
var connectionString = 'postgres://localhost/project';

//We use the 'pg' module's recommended client pooling API
//We pass the connect function the database connection string, and a callback function
//'onConnect'. We define that function.
pg.connect(connectionString, onConnect);

function onConnect(err, client, done) {
  //Err - This means something went wrong connecting to the database.
  if (err) {
    console.error(err);
    process.exit(1);
  }

  //For now let's end client
  client.end();
}

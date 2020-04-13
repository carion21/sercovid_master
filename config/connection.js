const mysql = require('mysql')
const dev = {
  'host'     : 'localhost',
  'user'     : 'carion',
  'password' : 'root',
  'database' : 'sercovid19',
  'socketPath':'/var/run/mysqld/mysqld.sock',
  'port'     : 3306
}
const prod = {
  'host'     : 'us-cdbr-iron-east-02.cleardb.net',
  'user'     : 'b7d39afd4db7ac',
  'password' : 'b9c6403f',
  'database' : 'heroku_74ca943e08777b8'
}


const env   = dev


const HOST  = env.host
const USER  = env.user
const PASS  = env.password
const DATA  = env.database
const PORT  = env.port
const SOCKET= env.socketPath

// config base de données en local

const connection = mysql.createConnection({
  host     : HOST,
  user     : USER,
  password : PASS,
  database : DATA,
  port     : PORT,
  socketPath:SOCKET 
})

connection.connect((err) => {
  if (err) {
    //connection.end()
    throw err       
  }
  console.log("Base de donnée Connectée avec l'id : " + connection.threadId)
  //console.log(connection)
  //connection.end()
});

/**
connection.query('SELECT * FROM Individu', function (error, results, fields) {
  if (error) {
    console.error('error connecting: ' + err.stack)
    //throw error
  }
  console.log('Le contenu est: ', results[0])
});
**/

//connection.end();

module.exports  = connection


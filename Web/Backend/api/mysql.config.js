//Mysql connection middleware
const util = require('util')
const mysql = require('mysql');
var db = mysql.createPool({
  connectionLimit: 10,
  host     : 'localhost',
  user     : 'root',
  password : 'root',
  database: 'capybara'
});

db.getConnection(function(err, connection) {
  if (err) {
    console.error('error connecting: ' + err);
    return false;
  }
  console.log('MySQL Connection Established: ', connection.threadId);
  if (connection) connection.release()

  return
});

db.query = util.promisify(db.query)
module.exports = db
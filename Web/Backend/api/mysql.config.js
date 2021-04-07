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
    console.error('MySQL Connection Error: ' + err);
    return false;
  }
  if (connection) connection.release()

  return
});

db.on('acquire', function (connection) {
  console.log('MySQL Connection Acquired: ', connection.threadId);
});

db.on('release', function (connection) {
  console.log('MySQL Connection Released: ', connection.threadId);
});

db.query = util.promisify(db.query)
module.exports = db
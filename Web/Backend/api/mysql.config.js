//Mysql connection middleware
const util = require('util')
const mysql = require('mysql');
var db = mysql.createPool({
  connectionLimit: 10,
  host     : '165.232.161.150',
  user     : 'root',
  password : 'KOJ(i9kJUH!',
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
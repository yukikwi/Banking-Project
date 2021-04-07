//Mysql connection middleware
const util = require('util')
const mysql = require('mysql');
var db = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'root',
  database: 'capybara'
});

db.connect(function(err, connection) {
    if (err) {
        console.error('error connecting: ' + err.stack);
        return false;
    }
    
    console.log('connected as id ' + db.threadId);
});

db.query = util.promisify(db.query)
module.exports = db
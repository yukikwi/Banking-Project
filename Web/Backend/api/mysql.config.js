//Mysql connection middleware
var mysql      = require('mysql');
var db = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'root',
  database: 'capybara'
});

db.connect(function(err) {
    if (err) {
        console.error('error connecting: ' + err.stack);
        return false;
    }
    
    console.log('connected as id ' + db.threadId);
});
module.exports = db
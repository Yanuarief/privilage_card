var mysql = require('mysql');

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "mysql",
    database: "2006_privilage_card",
    charset: 'utf8mb4',
    multipleStatements: true
});

con.connect(function(err) {
    if (err) throw err;
});

module.exports = con;
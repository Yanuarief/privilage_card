var mysql = require('mysql');

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "mysql",
    database: "cms_baru",
    charset: 'utf8mb4',
    multipleStatements: true
});

con.connect(function(err) {
    if (err) throw err;
});

module.exports = con;
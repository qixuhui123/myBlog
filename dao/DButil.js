var mysql =  require("mysql");

function createConnection() {
    var connection = mysql.createConnection({
        host:"192.168.56.1",
        port:"3306",
        user: "root",
        password:"Q82004531",
        database:"my_blog"
    })
    return connection;
}

module.exports.createConnection = createConnection;
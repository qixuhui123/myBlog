var dbutil = require("./DButil");

function insertTag(tag,ctime,utime,success) {
    var insertSql = "insert into tags (`tag`,`ctime`,`utime`) value (?,?,?)";
    var params = [tag,ctime,utime];

    var connection = dbutil.createConnection();
    connection.connect();
    connection.query(insertSql, params, function (error, result) {
        if(error == null){
            success(result);
        }else{
            console.log(error)
        }
        connection.end();
    })
}
function queryTag(tag,success) {
    var insertSql = "select * from tags where tag = ?";
    var params = [tag];

    var connection = dbutil.createConnection();
    connection.connect();
    connection.query(insertSql, params, function (error, result) {
        if(error == null){
            success(result);
        }else{
            throw new Error("错误")
        }
        connection.end();
    })
}
function queryAllTag(success) {
    var insertSql = "select * from tags ;";
    var params = [];

    var connection = dbutil.createConnection();
    connection.connect();
    connection.query(insertSql, params, function (error, result) {
        if(error == null){
            success(result);
        }else{
            throw new Error("错误")
        }
        connection.end();
    })
}


module.exports.insertTag =  insertTag;
module.exports.queryTag = queryTag;
module.exports.queryAllTag = queryAllTag;
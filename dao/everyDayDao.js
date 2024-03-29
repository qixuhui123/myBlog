var dbutil = require("./DButil");

function insertEveryDay(content,ctime,success) {
    var insertSql = "insert into every_day (`content`,`ctime`) values (?,?)";
    var params = [content,ctime];
    
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

function queryEveryDay(success) {
    var querySql = "select * from every_day order by id desc limit 1";
    var params = [];
    var connection = dbutil.createConnection();
    connection.connect();
    connection.query(querySql,params, function (error, result) {
        if(error == null){
            success(result);
        }else{
            throw new Error("错误")
        }
        connection.end();
    })
}

module.exports.insertEveryDay = insertEveryDay;
module.exports.queryEveryDay = queryEveryDay;
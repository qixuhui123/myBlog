var dbutil = require("./DButil");

function insertComment(blogId,parent,parentName,userName,email,contents,ctime,utime,success) {
    var insertSql = "insert into comments (`blog_id`,`parent`,`parent_name`,`user_name`,`email`,`contents`,`ctime`,`utime`) values (?,?,?,?,?,?,?,?)";
    var params = [blogId,parent,parentName,userName,email,contents,ctime,utime];

    var connection = dbutil.createConnection();
    connection.connect();
    connection.query(insertSql, params, function (error, result) {
        if(error == null){
            success(result);
        }else{
            console.log(error);
        }
        connection.end();
    })
}
function queryCommentsByBlogId(blogId,success) {
    var querySql ="select * from  comments where blog_id = ?"
    var params = [blogId];
    var connection = dbutil.createConnection();
    connection.connect();
    connection.query(querySql, params, function (error, result) {
        if(error == null){
            success(result);
        }else{
            console.log(error);
        }
        connection.end();
    })
}

function queryCommentsCountByBlogId(blogId,success) {
    var querySql ="select count(1) as count from comments where blog_id = ?;"
    var params = [blogId];
    var connection = dbutil.createConnection();
    connection.connect();
    connection.query(querySql, params, function (error, result) {
        if(error == null){
            success(result);
        }else{
            console.log(error);
        }
        connection.end();
    })
}

function queryNewComments(size,success) {
    var querySql ="select * from comments order by id desc limit ?;"
    var params = [size];
    var connection = dbutil.createConnection();
    connection.connect();
    connection.query(querySql, params, function (error, result) {
        if(error == null){
            success(result);
        }else{
            console.log(error);
        }
        connection.end();
    })
}


module.exports.insertComment = insertComment;
module.exports.queryCommentsByBlogId = queryCommentsByBlogId;
module.exports.queryCommentsCountByBlogId = queryCommentsCountByBlogId;
module.exports.queryNewComments = queryNewComments;
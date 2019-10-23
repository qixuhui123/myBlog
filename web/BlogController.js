var blogDao = require("../dao/blogDao");
var tagsDao = require("../dao/tagaDao");
var tagsBlogMappingDao = require("../dao/tagBlogMappingDao");
var timeUtil = require("../util/timeUtil");
var respUtil = require("../util/RespUtil");
var url = require("url");
var path = new  Map();



function queryHotBlog(request,response) {
    blogDao.queryHotBlog(5,function (result) {
        response.writeHead(200);
        response.write(respUtil.writeResult("success" , "添加成功", result));
        response.end();
    })
}

path.set("/queryHotBlog",queryHotBlog);


function queryAllBlog(request,response) {
    blogDao.queryAllBlog(function (result) {
        response.writeHead(200);
        response.write(respUtil.writeResult("success" , "添加成功", result));
        response.end();
    })
}

path.set("/queryAllBlog",queryAllBlog);


function queryBlogCount(request,response) {
    blogDao.queryBlogCount(function (result) {
        response.writeHead(200);
        response.write(respUtil.writeResult("success" , "添加成功", result));
        response.end();
    })
}

path.set("/queryBlogCount",queryBlogCount);


function queryBlogById(request,response) {

    var params = url.parse(request.url, true).query;
    blogDao.queryBlogById(parseInt(params.bid),function (result) {
        response.writeHead(200);
        response.write(respUtil.writeResult("success" , "添加成功", result));
        response.end();
        blogDao.addViews(parseInt(params.bid),function (result) {})
    })
}

path.set("/queryBlogById",queryBlogById);

function queryBlogByPage(request,response){
    var params = url.parse(request.url, true).query;
    blogDao.queryBlogByPage(parseInt(params.page),parseInt(params.pageSize),function(result){
        for(var i = 0; i< result.length; i++){
            result[i].content = result[i].content.replace(/<img[\w\W]*>/, "");
            result[i].content = result[i].content.replace(/<[\w\W]{1,5}>/g, "")
            result[i].content = result[i].content.substring(0,300);

        }
        response.writeHead(200);
        response.write(respUtil.writeResult("success" , "添加成功", result));
        response.end();
    })
}

path.set("/queryBlogByPage",queryBlogByPage);

function editBlog(request,response){
    var params = url.parse(request.url, true).query;
    var tags = params.tags.replace(/ /g).replace("，",",")
    request.on("data",function(data){
        blogDao.insertBlog(params.title, data.toString(),0,tags,timeUtil.getNow(),timeUtil.getNow(),function (result) {
            // console.log(tags,params.title,1)
            response.writeHead(200);
            response.write(respUtil.writeResult("success" , "添加成功", null));
            response.end();
            var blogId = result.insertId;
            var tagList = tags.split(",");
            for(var i = 0; i<tagList.length; i++){
                if(tagList[i] == ""){
                    continue;
                }
                queryTag(tagList[i],blogId);

            }
        })
    })
}
path.set("/editBlog",editBlog);

function queryTag(tag, blogId) {
    tagsDao.queryTag(tag, function (result) {
        if(result == null || result.length == 0){
            insertTag(tag,blogId)
        }else {
            tagsBlogMappingDao.insertTagBlogMapping(result[0].id, blogId,timeUtil.getNow(),timeUtil.getNow(),function () {
                
            })
        }
    })
}

function insertTag(tag,blogId) {
    tagsDao.insertTag(tag, timeUtil.getNow(),timeUtil.getNow(),function (result) {
        insertTagBlogMapping(result.insertId,blogId)
    });
}

function insertTagBlogMapping(tagId,blogId) {
    tagsBlogMappingDao.insertTagBlogMapping(tagId,blogId,timeUtil.getNow(),timeUtil.getNow(),function (result) {
        
    })
}


module.exports.path = path;
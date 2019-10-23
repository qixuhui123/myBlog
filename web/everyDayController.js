var path = new Map();
var everyDao = require("../dao/everyDayDao");
var timeUtil = require("../util/timeUtil");
var respUtil = require("../util/RespUtil");

function editEveryDay(resquest, response){
    resquest.on("data",function(data){
        everyDao.insertEveryDay(data.toString().trim(), timeUtil.getNow(),function (result) {
            response.writeHead(200);
            response.write(respUtil.writeResult("success","添加成功",null));
            response.end();
        })
    })
}

path.set("/editEveryDay",editEveryDay);

function queryEveryDay(resquest, response){
    everyDao.queryEveryDay(function(result){
        response.writeHead(200);
        response.write(respUtil.writeResult("success","添加成功",result));
        response.end();
    })
}

path.set("/queryEveryDay",queryEveryDay);



module.exports.path = path;
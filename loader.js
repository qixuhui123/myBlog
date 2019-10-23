var fs = require("fs");
var globalConfig = require("./config");

var controllerSet = [];
var pathMap = new Map();


var files = fs.readdirSync(globalConfig["web_path"]);

for(var i = 0; i < files.length; i++){
    var temp = require("./" + globalConfig["web_path"] +  "/" + files[i]);
    if(temp.path){
        for(var [k,v] of temp.path){
            if(pathMap.get(k) == null){
                pathMap.set(k,v);
            }else {
                throw new Error("url path异常 ，url:" + k);
            }
        }
        controllerSet.push(temp)
    }
}

module.exports = pathMap;




var fs = require("fs");

var globalConfig = {};

var conf = fs.readFileSync("server.conf").toString().split("\r\n");

for(var i = 0; i< conf.length; i++){
    globalConfig[conf[i].split("=")[0].trim()] = conf[i].split("=")[1].trim()
}

module.exports = globalConfig;
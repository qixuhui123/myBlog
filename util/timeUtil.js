function getNow(){
    var oldTime = (new Date()).getTime();
    return parseInt(oldTime);


}
getNow()
module.exports.getNow = getNow;

var blogDetall = new Vue({
    el: "#blog_detall",
    data:{
        title: "",
        content: "",
        ctime: "",
        tags: "",
        views: ""
    },
    computed:{
        
    },
    created: function () {

        var searchUrlParams = location.search.indexOf("?") > -1 ? location.search.split("?")[1].split("&") : "";
        if(searchUrlParams == ""){

            return;
        }
        var bid = -1;
        for(var i = 0 ; i<searchUrlParams.length; i++){
            if(searchUrlParams[i].split("=")[0] == "bid"){
                try{
                    bid = parseInt(searchUrlParams[i].split("=")[1]);
                }catch (e){
                    console.log(e);
                }
            }
        }
        axios({
            method:"get",
            url:"/queryBlogById?bid=" + bid
        }).then(function (resp) {
            var result = resp.data.data[0];
            blogDetall.title = result.title;
            blogDetall.content = result.content.replace(/<\/?.+?\/?>/g,"");
            function changeTime(time){
                var commonTime = "";
                time = time * 1000;
                if(time){
                    var unixTimestamp = new Date(time*1) ;
                    commonTime = unixTimestamp.toLocaleString();
                }
                return commonTime;
            }
            blogDetall.ctime = changeTime(result.ctime);
            blogDetall.tags = result.tags;
            blogDetall.views = result.views;
        }).catch(function (resp) {
            console.log(resp,"请求失败");
        })
    }
});


var sendComment = new Vue({
    el: "#send_comment",
    data:{
        vcode:"",
        rightCode:""
    },
    computed:{
        changeCode:function () {
            return function () {
                axios({
                    method:"get",
                    url: "/queryRandomCode"
                }).then(function (resp) {
                    // console.log(resp)
                    sendComment.vcode = resp.data.data.data;
                    sendComment.rightCode = resp.data.data.text;
                }).catch(function (resp) {
                    console.log(resp,"请求错误")
                });
            }
        },
        sendComment:function () {
            return function () {
                var code = document.getElementById("comment_code").value;
                if(code != sendComment.rightCode){
                    alert("验证码有误");
                    return;
                }else {
                    alert("验证码正确");
                }

                var searchUrlParams = location.search.indexOf("?") > -1 ? location.search.split("?")[1].split("&") : "";
                if(searchUrlParams == ""){
                    return;
                }
                var bid = -1;
                for(var i = 0 ; i<searchUrlParams.length; i++){
                    if(searchUrlParams[i].split("=")[0] == "bid"){
                        try{
                            bid = parseInt(searchUrlParams[i].split("=")[1]);
                        }catch (e){
                            console.log(e);
                        }
                    }
                }

                var reply = document.getElementById("comment_reply").value;
                var replyName = document.getElementById("comment_reply_name").value;
                var name = document.getElementById("comment_name").value;
                var email = document.getElementById("comment_email").value;
                var content = document.getElementById("comment_content").value;
                axios({
                    method: "get",
                    url: "/addComment?bid=" + bid + "&parent=" + reply + "&userName=" + name + "&email=" + email + "&content=" + content + "&parentName=" + replyName
                }).then(function (resp) {
                    console.log(resp)

                }).catch(function (resp) {
                    console.log(resp,"请求错误")
                });
            }
        }
    },
    created:function () {
        this.changeCode();
    }
});


var blogComments = new Vue({
    el: "#blog_comments",
    data:{
        userName :'',
        total:0,
        comments:[]
     },
    computed:{
        reply: function () {
            return function(commentId,userName){
                document.getElementById("comment_reply").value = commentId;
                document.getElementById("comment_reply_name").value = userName;
                location.href = "#send_comment";
            }
        }
    },
    created:function(){
            var searcheUrlParams = location.search.indexOf("?") > -1 ? location.search.split("?")[1].split("&") : "";
            var bid = -10;
            for(var i = 0 ; i< searcheUrlParams.length; i++){
                if(searcheUrlParams[i].split("=")[0] == "bid"){
                    try {
                        bid = searcheUrlParams[i].split("=")[1];
                    }catch (e){
                        console.log(e);
                    }
                }
            }
            axios({
                method:"get",
                url:"/queryCommentsByBlogId?bid=" + bid
            }).then(function (resp) {
                function changeTime(time){
                    var commonTime = "";
                    time = time * 1000;
                    if(time){
                        var unixTimestamp = new Date(time*1) ;
                        commonTime = unixTimestamp.toLocaleString();
                    }
                    return commonTime;
                }
                blogComments.comments = resp.data.data
                blogComments.comments[0].ctime = changeTime(resp.data.data[0].ctime)
                for(var i =0; i<blogComments.comments.length;i ++){

                    if (blogComments.comments[i].parent > -1){
                        blogComments.comments[i].options = "回复@" +  blogComments.comments[i].parent_name;
                    }
                }
            }).catch(function (resp) {
                console.log(resp,"请求错误")
            });
        axios({
            method:"get",
            url: "/queryCommentsCountByBlogId?bid=" + bid
        }).then(function (resp) {

            blogComments.total = resp.data.data[0].count;

        }).catch(function (resp) {
            console.log(resp,"请求错误")
        });
        }

});
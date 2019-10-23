var randomTags = new Vue({
    el: "#random_tags",
    data: {
        tags:[]
    },
    computed:{
        randomColor: function(){
            return function(){
                var red = Math.random() * 255 + 50;
                var green = Math.random() * 255 + 50;
                var blue = Math.random() * 255 + 50;
                return "rgb(" + red  + "," + green + "," + blue + ")"
            }
        },
        randomSize:function(){
            return function(){
                var size = Math.random() * 20 + 12  ;
                return size + "px"
            }
        }
    },
    created: function(){
        axios({
            method: "get",
            url: "/queryRandomTags"
        }).then(function (resp) {
           var result = [];

            for(var i =0; i< resp.data.data.length; i++){
                result.push({text:resp.data.data[i].tag,link:"/?tag=" + resp.data.data[i].tag})
            }
            randomTags.tags = result;
        })
    }
});

var newHot = new Vue({
    el: '#new_hot',
    data:{
        titleList:[
            {title:"这是一个链接",link:"http://www.baidu.com"},
            {title:"这是一个链接",link:"http://www.baidu.com"},
            {title:"这是一个链接",link:"http://www.baidu.com"},
            {title:"这是一个链接",link:"http://www.baidu.com"},
            {title:"这是一个链接",link:"http://www.baidu.com"},
            {title:"这是一个链接",link:"http://www.baidu.com"},
            {title:"这是一个链接",link:"http://www.baidu.com"},
            {title:"这是一个链接",link:"http://www.baidu.com"},
            {title:"这是一个链接",link:"http://www.baidu.com"}
        ]
    },
    computed:{},
    created:function(){
        axios({
            method: "get",
            url: "/queryHotBlog"
        }).then(function (resp) {
            var result = [];
            for(var i = 0;i < resp.data.data.length; i++){
                var temp = {}
                temp.title = resp.data.data[i].title;
                temp.link = "/blog_detall.html?bid=" + resp.data.data[i].id;
                result.push(temp);
            }
            newHot.titleList = result;
        })
    }
});

var newComments = new Vue({
    el: "#new_comments",
    data:{
        commentList:[
            {name:"这里是用户名",date:"2018-10-10",comment:"这里是一大串评论，巴拉巴拉..."},
            {name:"这里是用户名",date:"2018-10-10",comment:"这里是一大串评论，巴拉巴拉..."},
            {name:"这里是用户名",date:"2018-10-10",comment:"这里是一大串评论，巴拉巴拉..."},
            {name:"这里是用户名",date:"2018-10-10",comment:"这里是一大串评论，巴拉巴拉..."},
            {name:"这里是用户名",date:"2018-10-10",comment:"这里是一大串评论，巴拉巴拉..."},
            {name:"这里是用户名",date:"2018-10-10",comment:"这里是一大串评论，巴拉巴拉..."},
            {name:"这里是用户名",date:"2018-10-10",comment:"这里是一大串评论，巴拉巴拉..."},
            {name:"这里是用户名",date:"2018-10-10",comment:"这里是一大串评论，巴拉巴拉..."},
            {name:"这里是用户名",date:"2018-10-10",comment:"这里是一大串评论，巴拉巴拉..."}
        ]
    },
    computed:{},
    created:function(){
        axios({
            method: "get",
            url: "/queryNewComments"
        }).then(function (resp) {
            var result = [];
            for(var i = 0;i < resp.data.data.length; i++){
                var temp = {}
                temp.name = resp.data.data[i].user_name;
                temp.date = resp.data.data[i].ctime;
                temp.comment = resp.data.data[i].contents;

                result.push(temp);
            }
            newComments.commentList = result;
        })
    }
});
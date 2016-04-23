/*导航栏组建，需要传入用户信息作为组建的状态
*/
var Navbar = React.createClass({displayName: "Navbar",
  getInitialState: function() {
      return {
          messageList:[
            {"id":"111",
            "hint":"荣老师邀请你评审陆云昊的文章"},
            {"id":"112",
            "hint":"荣老师邀请你评审陆云昊ddd的文章"}
          ],
          hasMessage:false

      };
  },
  read:function(e){
    var sucess=false;
	$.ajax({
		url: "./php/readnotice.php",
		async : false,  
		success : function(data){
			sucess=true; 
		}
	});
	if(sucess){
		this.setState({hasMessage:false});
	}
    //TODO:标记信息已读
  },
  logOut:function(e){
    $.ajax({
		url: "./php/logout.php",
		async : false,  
		success : function(data){
			 window.location.href = "./login.html";
		}
	});
  },

  loadMessageFromServer:function(){
    $.ajax({
    url: "./php/message.php",//TODO:complete with the url api
    dataType: 'json',
    cache: false,
    success: function(data) {
      this.setState({messageList: data});
    }.bind(this),
    error: function(xhr, status, err) {
      console.error("", status, err.toString());
    }.bind(this)
    });
    this.setState({hasMessage:this.state.messageList.length!=0});
  },
  componentDidMount:function() {
    this.loadMessageFromServer();
  },
  render: function() {
    var unread = this.state.hasMessage?React.createElement("span", {className: "navbar-unread"}, "1"):null;

    var messages;
    if(this.state.messageList.length > 0){
        messages = this.state.messageList.map(function(message){
          var goReview = function(e){
          e.preventDefault();
          var target = "review.html?id=" + message.id.toString();
          location.href=target;

        };
          return (
              React.createElement("li", null, React.createElement("a", {onClick: goReview}, " ", message.hint))
              
          );
        });
    } else {
        messages = React.createElement("li", null, React.createElement("a", null, "暂无消息"))
    }

    return (
      React.createElement("div", null, 
      React.createElement("nav", {className: "navbar navbar-inverse navbar-fixed-top", role: "navigation"}, 
      React.createElement("div", {className: "navbar-header"}, 
        React.createElement("button", {type: "button", className: "navbar-toggle", "data-toggle": "collapse", "data-target": "#example-navbar-collapse"}, 
          React.createElement("span", {className: "sr-only"}), 
          React.createElement("span", {className: "icon-bar"}), 
          React.createElement("span", {className: "icon-bar"}), 
          React.createElement("span", {className: "icon-bar"})
        ), 
        React.createElement("a", {className: "navbar-brand", href: "#fake"}, React.createElement("span", {className: "text-primary"}, "审"))
      ), 
      React.createElement("div", {className: "collapse navbar-collapse", id: "example-navbar-collapse"}, 
        React.createElement("ul", {className: "nav navbar-nav"}, 
          React.createElement("li", null, React.createElement("a", {href: "index.html"}, "评审")), 
          React.createElement("li", null, React.createElement("a", {href: "task.html"}, "任务")), 
          React.createElement("li", null, React.createElement("a", {onClick: this.read, className: "dropdown-toggle", "data-toggle": "dropdown"}, "通知", unread), 
              React.createElement("ul", {className: "dropdown-menu"}, 
                messages
              )
          ), 
          React.createElement("li", {className: "dropdown"}, 
            React.createElement("a", {className: "dropdown-toggle", "data-toggle": "dropdown"}, 
               this.props.profile.name, React.createElement("b", {className: "caret"})
            ), 
            React.createElement("ul", {className: "dropdown-menu"}, 
               React.createElement("li", null, React.createElement("a", {href: "contact.html"}, "联系人")), 
               React.createElement("li", null, React.createElement("a", {href: "info.html"}, "账号信息")), 
               React.createElement("li", null, React.createElement("a", {href: "#", onClick: this.logOut}, "退出"))
            )
         )
      )
      )
    )
    )
    );
  }
});

/*任务描述信息*/
var TaskDescription = React.createClass({displayName: "TaskDescription",
    render:function(){
      var state = this.props.state?"评审中":"评审结束";
      return(
        React.createElement("div", {className: "tile col-lg-10 col-md-10 col-sm-12 col-lg-offset-1 col-md-offset-1 shadow"}, 
          React.createElement("div", {className: "row"}, 
            React.createElement("label", {className: "col-lg-2 col-md-2 col-sm-3 col-xs-3"}, "名称:"), 
            React.createElement("label", {className: "col-lg-10 col-md-10 col-sm-9 col-xs-9 text-primary text-left"}, this.props.title)
          ), 

          React.createElement("div", {className: "row"}, 
            React.createElement("label", {className: "col-lg-2 col-md-2 col-sm-3 col-xs-3"}, "地址:"), 
            React.createElement("a", {className: "col-lg-10 col-md-10 col-sm-9 col-xs-9 text-primary text-left", href: this.props.url, target: "_blank"}, this.props.url)
          ), 

          React.createElement("div", {className: "row"}, 
            React.createElement("label", {className: "col-lg-2 col-md-2 col-sm-3 col-xs-3"}, "类型:"), 
            React.createElement("label", {className: "col-lg-10 col-md-10 col-xs-9 col-sm-9 text-primary text-left"}, this.props.type)
          ), 

          React.createElement("div", {className: "row"}, 
            React.createElement("label", {className: "col-lg-2 col-md-2 col-sm-3 col-xs-3"}, "状态:"), 
            React.createElement("label", {className: "col-lg-10 col-md-10 col-sm-9 col-xs-9 text-primary text-left"}, state)
          ), 

          React.createElement("div", {className: "row"}, 
            React.createElement("label", {className: "col-lg-2 col-md-2 col-sm-3 col-xs-3"}, "描述:"), 
            React.createElement("p", {className: "col-lg-10 col-md-10 col-sm-9 col-xs-9 text-primary text-left"}, this.props.content)
          )
        )
      );
    }
});

/*评审展示模块*/
var Review = React.createClass({displayName: "Review",
  editReview:function(){
    this.props.editReview(this.props.review.id);
  },
  render:function(){
    var doc = React.createElement("div", null, React.createElement("span", null, "第", this.props.review.page, "页"), React.createElement("br", null), React.createElement("span", null, "第", this.props.review.row, "行"));
    var code = React.createElement("div", null, React.createElement("span", null, this.props.review.page), React.createElement("br", null), React.createElement("span", null, "第", this.props.review.row, "行"));
    var location = this.props.type=="文档评审"?doc:code;
    return(
        React.createElement("div", {className: "col-lg-10 col-md-10 col-sm-12 col-xs-12 col-lg-offset-1 col-md-offset-1 row-bottom"}, 
          React.createElement("div", {className: "row divline shadow"}, 
            React.createElement("div", {className: "divhead col-lg-2 col-md-2 col-sm-2 col-xs-12"}, 
              location
            ), 

            React.createElement("div", {className: "divbody col-lg-9 col-md-9 col-sm-9 col-xs-12"}, 
              React.createElement("p", null, this.props.review.content)
            ), 

            React.createElement("div", {className: "divact col-lg-1 col-md-1 col-sm-1 col-xs-12 text-center", onClick: this.editReview}, 
              "编辑"
            )

          )
        )
    );
  }
});

/*评审编辑模态框*/
var ReviewEditModal = React.createClass({displayName: "ReviewEditModal",
  componentDidMount:function(){
      $(this.refs.modal).modal('show');
      $(this.refs.modal).on('hidden.bs.modal', this.props.handleHideModal);
  },
  confirmEdition:function(){
    var content = this.refs.content.value.trim();
    if(!content){
      return;
    }
    this.props.confirmEdition(this.props.review.id,content);
    $(this.refs.modal).modal('toggle');
  },
  render:function(){
    return (
      React.createElement("div", {ref: "modal", className: "modal fade", tabIndex: "-1", role: "dialog"}, 
      React.createElement("div", {className: "modal-dialog modal-lg"}, 
        React.createElement("div", {className: "modal-content"}, 
          React.createElement("div", {className: "modal-header"}, 
            React.createElement("button", {type: "button", className: "close", "data-dismiss": "modal", "aria-label": "Close"}, React.createElement("span", {"aria-hidden": "true"}, "×")), 
            React.createElement("h4", {className: "modal-title", id: "gridSystemModalLabel"}, "编辑")
          ), 
          React.createElement("div", {className: "modal-body"}, 
            React.createElement("form", {className: "form-horizontal"}, 
              React.createElement("div", {className: "form-group"}, 
                React.createElement("textarea", {ref: "content", rows: "3", className: "form-control", defaultValue: this.props.review.content}
                )
              ), 
              React.createElement("div", {className: "form-group"}, 
                React.createElement("button", {type: "button", onClick: this.confirmEdition, className: "btn btn-primary"}, "确认编辑")
              )
            )
          )
        )
      )
    )
    );
  }
});


/*评审编写模块*/
var ReviewWriter = React.createClass({displayName: "ReviewWriter",
  getInitialState:function() {
      return {
        pageClass:"input-group row-bottom",
        pageHolder:"",
        rowClass:"input-group row-bottom",
        rowHolder:""
      };
  },
  submitReview:function(e){
    e.preventDefault();
    var page = this.refs.page.value.trim();
    var row = this.refs.row.value.trim();
    var content = this.refs.content.value;
    if(!page||!row||!content){
      return;
    }
    var reg = /^[0-9]*[1-9][0-9]*$/;
    if(this.props.type=="文档评审"){
      if(reg.test(page)){
        if(reg.test(row)){
          var review = {"page":page,"row":row,"content":content};
          this.refs.page.value = "";
          this.refs.row.value = "";
          this.refs.content.value = "";
          this.setState({pageClass:"input-group row-bottom",pageHolder:"",rowClass:"input-group row-bottom",rowHolder:""});

          this.props.addReview(review);
        } else {
          var errorRow = "input-group row-bottom has-error";
          var errorHolder = "文档行数格式错误！";
          this.refs.row.value = "";
          this.setState({pageClass:"input-group row-bottom",pageHolder:"",rowClass:errorRow,rowHolder:errorHolder});
        }
      } else {
        var errorPage = "input-group row-bottom has-error";
        var errorHolder = "文档页数格式错误！";
        this.refs.page.value = "";
        this.setState({pageClass:errorPage,pageHolder:errorHolder});
      }
    } else {
      if(reg.test(row)){
        var review = {"page":page,"row":row,"content":content};
        this.refs.page.value = "";
        this.refs.row.value = "";
        this.refs.content.value = "";
        this.setState({rowClass:"input-group row-bottom",rowHolder:""});

        this.props.addReview(review);
      } else {
        var errorRow = "input-group row-bottom has-error";
        var errorHolder = "文档行数格式错误！";
        this.refs.row.value = "";
        this.setState({pageClass:"input-group row-bottom",pageHolder:"",rowClass:errorRow,rowHolder:errorHolder});
      }
    }

  },
  render:function(){
    var page = this.props.type=="文档评审"?React.createElement("div", {className: this.state.pageClass}, React.createElement("div", {className: "input-group-addon"}, "第"), React.createElement("input", {type: "text", ref: "page", className: "form-control", placeholder: this.state.pageHolder}), React.createElement("div", {className: "input-group-addon"}, "页")):React.createElement("div", {className: "input-group row-bottom"}, React.createElement("div", {className: "input-group-addon"}, "文件名"), React.createElement("input", {type: "text", ref: "page", className: "form-control"}));
    return(
      React.createElement("div", {className: "tile col-lg-10 col-md-10 col-sm-12 col-lg-offset-1 col-md-offset-1"}, 
        React.createElement("form", {onSubmit: this.submitReview}, 
          page, 
          React.createElement("div", {className: this.state.rowClass}, 
            React.createElement("div", {className: "input-group-addon"}, "第"), 
            React.createElement("input", {type: "text", ref: "row", className: "form-control", placeholder: this.state.rowHolder}), 
            React.createElement("div", {className: "input-group-addon"}, "行")
          ), 
          React.createElement("div", {className: "form-group"}, 
            React.createElement("textarea", {className: "form-control", rows: "3", placeholder: "评审内容", ref: "content"})
          ), 
          React.createElement("button", {className: "btn btn-block btn-primary", type: "submit"}, "提交")
        )
      )

    );
  }
});

/*评审展示和编辑的结合模块，掌握状态信息*/
var ReviewPanel = React.createClass({displayName: "ReviewPanel",
  getInitialState:function() {
      return {
        reviewList:[
          {
            "id":"1111",
            "page":"5",
            "row":"9",
            "content":"文档写道“某些情况下b神可以带领队友走向胜利”，其中“某些”使用不准确，没有指出具体情况"
          },
          {
            "id":"1112",
            "page":"5",
            "row":"11",
            "content":"文档写道“某些情况下b神可以带领队友走向胜利”，其中“某些”使用不准确，没有指出具体情况,打开房间阿斯利康大家立刻精神的快乐都是减肥了科技发达时考虑范式大积分卡上就打开了房间里看圣诞节啊风口浪尖阿斯顿了房间里撒打开进风口拉萨的建立开放式的拉开将"
          },
          { 
            "id":"1113",
            "page":"5",
            "row":"25",
            "content":"文档写道“某些情况下b神可以带领队友走向胜利”，其中“某些”使用不准确，没有指出具体情况"
          },
          {
            "id":"1114",
            "page":"6",
            "row":"9",
            "content":"文档写道“某些情况下b神可以带领队友走向胜利”，其中“某些”使用不准确，没有指出具体情况"
          },
          {
            "id":"1115",
            "page":"7",
            "row":"9",
            "content":"文档写道“某些情况下b神可以带领队友走向胜利”，其中“某些”使用不准确，没有指出具体情况"
          },
          {
            "id":"1116",
            "page":"8",
            "row":"9",
            "content":"文档写道“某些情况下b神可以带领队友走向胜利”，其中“某些”使用不准确，没有指出具体情况"
          }
        ],
        showModal:false,
        review:{}
      };
  },
  componentDidMount: function() {
	var query = location.search.substring(1);
    var id = query.split("=")[1];
	
    $.ajax({
      url: "./php/deficiencylist.php?type=review&id="+id,//TODO:get customer profile url
      dataType: 'json',
      cache: false,
      success: function(data) {
        this.setState({reviewList: data});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error("", status, err.toString());//TODO:as same as above
      }.bind(this)
    });
  },
  addReview:function(review){
    var freshList = this.state.reviewList;

    review.writer = this.props.id;
    review.task = this.props.task;
    $.ajax({  
		type : "post",  
		url : "./php/adddeficiency.php",  
		data : review,  
		async : false,  
		success : function(data){
			//status = data;
		}
	}); 
    //TODO:submit to server
    freshList.push(review);
    this.setState({reviewList:freshList});
  },
  handleHideModal:function(){
    this.setState({showModal:false});
  },
  handleShowModal:function(){
    this.setState({showModal:true});
  },
  editReview:function(id){
    for(var i = 0;i < this.state.reviewList.length; i++){
      if(this.state.reviewList[i].id == id ){
        this.setState({review:this.state.reviewList[i]});
        break;
      }
    }
    this.handleShowModal();
  },
  confirmEdition:function(id,content){
    var updated = JSON.parse(JSON.stringify(this.state.reviewList));
    for(var i =0;i < updated.length; i++){
      if(updated[i].id == id){
        updated[i].content = content;
        this.setState({reviewList:updated});
        break;
      }
    }
    $.ajax({
		type : "post",  
		url : "./php/updatedeficiency.php",  
		data : {id:id, content:content},  
		async : false,  
		success : function(data){
			//status = data;
		}
	});
  },
  render:function(){
    var reviews = [];
    for(var i = 0;i < this.state.reviewList.length;i++){
      var temp = React.createElement(Review, {type: this.props.type, review: this.state.reviewList[i], editReview: this.editReview});
      reviews.push(temp);
    }
    var writer = this.props.state?React.createElement(ReviewWriter, {type: this.props.type, addReview: this.addReview}):null;

    return(
      React.createElement("div", {className: "container"}, 
        reviews, 
        writer, 
        this.state.showModal?React.createElement(ReviewEditModal, {confirmEdition: this.confirmEdition, 
             review: this.state.review, handleHideModal: this.handleHideModal}):null
      )
    );
  }
});

/*组装所有的组件的reviewpage*/
var ReviewPage = React.createClass({displayName: "ReviewPage",
  getInitialState:function() {
      return {
           profile:{
            "id":"11111",
            "name":"屋顶上的羊驼",
            "mail":"maomao75979@gmail.com",
            "passworld":"123456",
            "group":["所有联系人","代码评审组","文档评审组","公司"]
          },
          review:{
            "id":"112",
           "title":"陆云昊的毕业论文",
           "url":"https://www.github.com",
           "type":"文档评审",
           "state":true,
           "content":"论文内容包含对中国dota的局势分析，请仔细评审。"
          }
      };
  },
  componentDidMount: function() {
    $.ajax({
      url: "./php/userinfo.php",//TODO:get customer profile url
      dataType: 'json',
      cache: false,
      success: function(data) {
        this.setState({profile: data});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error("", status, err.toString());//TODO:as same as above
      }.bind(this)
    });
	
	var id;
	var reg = new RegExp("(^|&)id=([^&]*)(&|$)");
	var r = window.location.search.substr(1).match(reg);
    if (r != null) id= unescape(r[2]);
	
    
    //TODO:根据id获取review数据
	$.ajax({
      url: "./php/review.php?id="+id,//TODO:get customer profile url
      dataType: 'json',
      cache: false,
      success: function(data) {
        this.setState({review: data});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error("", status, err.toString());//TODO:as same as above
		//window.location.href="./index.html";
      }.bind(this)
    });
  },


  render: function(){
    var id = this.state.review.id;
    var title = this.state.review.title;
    var url = this.state.review.url;
    var type = this.state.review.type;
    var state = this.state.review.state;
    var content = this.state.review.content;
    return(
      React.createElement("div", null, 
        React.createElement(Navbar, {profile: this.state.profile}), 
        React.createElement("br", null), 
        React.createElement("br", null), 
        React.createElement("div", {className: "container"}, 
        React.createElement(TaskDescription, {title: title, url: url, type: type, state: state, content: content})
        ), 
        React.createElement(ReviewPanel, {type: type, state: state, id: this.state.profile.id, task: id})
      )
    );
  }
});

ReactDOM.render(React.createElement(ReviewPage, null), document.getElementById("app"));
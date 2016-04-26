/*导航栏组建，需要传入用户信息作为组建的状态
*/
var Navbar = React.createClass({displayName: "Navbar",
  getInitialState: function() {
      return {
          messageList:[],
          hasMessage:false

      };
  },
  read:function(e){
    $.ajax({
		url: "./php/readnotice.php",
		success : function(data){
			this.setState({hasMessage:false});
		}.bind(this)
	});
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
	async : false,  
    cache: false,
    success: function(data) {
      this.setState({messageList: data});
	  this.setState({hasMessage:data.length!=0});
    }.bind(this),
    error: function(xhr, status, err) {
      console.error("", status, err.toString());
    }.bind(this)
    });
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
    componentDidMount:function() {
  },
    render:function(){
      var state = this.props.state=="true"?"评审中":"评审结束";
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

/*位置信息组件*/
var Position = React.createClass({displayName: "Position",
  render:function(){
    var doc = React.createElement("div", null, React.createElement("span", null, "第", this.props.page, "页"), React.createElement("br", null), React.createElement("span", null, "第", this.props.row, "行"));
    var code = React.createElement("div", null, React.createElement("span", null, this.props.page), React.createElement("br", null), React.createElement("span", null, "第", this.props.row, "行"));
    var location = this.props.type=="文档评审"?doc:code;
    return location;
  }
});

/*图例组件，给出不同颜色评审的状态*/
var Explain = React.createClass({displayName: "Explain",
  render:function(){
    return(
      React.createElement("div", {className: "col-lg-10 col-md-10 col-sm-12 col-lg-offset-1 col-md-offset-1"}, 
        React.createElement("div", {className: "row"}, 
          React.createElement("div", {className: "col-lg-3 col-lg-offset-1 col-md-3 col-md-offset-1 col-sm-3 col-sm-offset-1 col-xs-4"}, 
            React.createElement("span", {className: "normal-span"}, "　　"), React.createElement("label", {className: "text-primary"}, "一般评审")
          ), 
          React.createElement("div", {className: "col-lg-3 col-lg-offset-1 col-md-3 col-md-offset-1 col-sm-3 col-sm-offset-1 col-xs-4"}, 
            React.createElement("span", {className: "merge-span"}, "　　"), React.createElement("label", {className: "text-primary"}, "合并评审")
          ), 
          React.createElement("div", {className: "col-lg-3 col-lg-offset-1 col-md-3 col-md-offset-1 col-sm-3 col-sm-offset-1 col-xs-4"}, 
            React.createElement("span", {className: "denied-span"}, "　　"), React.createElement("label", {className: "text-primary"}, "否决评审")
          )
        )
      )
    );
  }
});

/*评审展示组件*/
var MerReview = React.createClass({displayName: "MerReview",
  choose:function(){
    var ifChoose = this.refs.choose.checked;
    this.props.updateChoose(this.props.review.id,ifChoose);
  },
  deny:function(){
    this.props.deny(this.props.review.id);

  },
  edit:function(){
    this.props.editReview(this.props.review.id);
  },
  render:function(){
    return(
      React.createElement("div", {className: "col-lg-10 col-md-10 col-sm-12 col-xs-12 col-lg-offset-1 col-md-offset-1 row-bottom"}, 
        React.createElement("div", {className: "row divline shadow"}, 
          React.createElement("div", {className: "divchoose col-lg-1 log-md-1 col-sm-1 col-xs-12"}, 
            React.createElement("input", {type: "checkbox", className: "choose", ref: "choose", onClick: this.choose, "data-toggle": "checkbox"})
          ), 

          React.createElement("div", {className: "divuser col-lg-1 col-md-1 col-sm-1 col-xs-12"}, 
            this.props.review.reviewer
          ), 

          React.createElement("div", {className: "divhead col-lg-2 col-md-2 col-sm-2 col-xs-12"}, 
            React.createElement(Position, {type: this.props.type, page: this.props.review.page, row: this.props.review.row})
          ), 

          React.createElement("div", {className: "divbody col-lg-7 col-md-7 col-sm-7 col-xs-12"}, 
            React.createElement("p", null, this.props.review.content)
          ), 

          React.createElement("div", {className: "divact col-lg-1 col-md-1 col-sm-1 col-xs-12 text-center"}, 
            React.createElement("p", {onClick: this.deny}, "否决"), 
            React.createElement("p", {onClick: this.edit}, "编辑")
          )
        )
      )
    );
  }
});

/*合并展示组件*/
var Merged = React.createClass({displayName: "Merged",
  componentDidMount:function() {
    $(this.refs.tooltip).tooltip();
  },
  componentDidUpdate:function(prevProps, prevState) {
    $(this.refs.tooltip).tooltip();
  },
  split:function(){
    this.props.split(this.props.review.id);
  },
  edit:function(){
    this.props.editReview(this.props.review.id);
  },
  choose:function(){
    var ifChoose = this.refs.choose.checked;
    this.props.updateChoose(this.props.review.id,ifChoose);
  },
  render:function(){
    var children = this.props.source.join("<hr>");
    return(
      React.createElement("div", {className: "col-lg-10 col-md-10 col-sm-12 col-xs-12 col-lg-offset-1 col-md-offset-1 row-bottom"}, 
        React.createElement("div", {className: "row divline shadow"}, 
          React.createElement("div", {className: "divchoose col-lg-1 log-md-1 col-sm-1 col-xs-12"}, 
            React.createElement("input", {ref: "choose", type: "checkbox", className: "choose", onClick: this.choose, "data-toggle": "checkbox"})
          ), 

          React.createElement("div", {className: "divuser col-lg-1 col-md-1 col-sm-1 col-xs-12"}, 
            this.props.review.reviewer
          ), 

          React.createElement("div", {className: "divhead col-lg-2 col-md-2 col-sm-2 col-xs-12"}, 
            React.createElement(Position, {type: this.props.type, page: this.props.review.page, row: this.props.review.row})
          ), 

          React.createElement("div", {ref: "tooltip", "data-placement": "top", "data-toggle": "tooltip", "data-html": "true", "data-original-title": children, 
             className: "divmerge col-lg-7 col-md-7 col-sm-7 col-xs-12 dropup"}, 
            React.createElement("p", null, this.props.review.content)
          ), 

          React.createElement("div", {className: "divact col-lg-1 col-md-1 col-sm-1 col-xs-12 text-center"}, 
            React.createElement("p", {onClick: this.split}, "拆分"), 
            React.createElement("p", {onClick: this.edit}, "编辑")
          )
        )
      )
    );
  }
});
/*被否决展示组件*/
var Denied = React.createClass({displayName: "Denied",
  undo:function(){
    this.props.undo(this.props.review.id);
  },
  render:function(){
    return(
      React.createElement("div", {className: "col-lg-10 col-md-10 col-sm-12 col-xs-12 col-lg-offset-1 col-md-offset-1 row-bottom"}, 
        React.createElement("div", {className: "row divline shadow"}, 
          React.createElement("div", {className: "divuser col-lg-1 col-md-1 col-sm-1 col-xs-12"}, 
            this.props.review.reviewer
          ), 

          React.createElement("div", {className: "divhead col-lg-2 col-md-2 col-sm-2 col-xs-12"}, 
            React.createElement(Position, {type: this.props.type, page: this.props.review.page, row: this.props.review.row})
          ), 

          React.createElement("div", {className: "divdenied col-lg-8 col-md-8 col-sm-8 col-xs-12"}, 
            React.createElement("p", null, this.props.review.content)
          ), 

          React.createElement("div", {className: "divact col-lg-1 col-md-1 col-sm-1 col-xs-12 text-center", onClick: this.undo}, 
            "撤销"
          )
        )
      )
    );
  }
});

/*合并列表组件*/
var MergeList = React.createClass({displayName: "MergeList",
  updateChoose:function(id,state){
    this.props.updateChoose(id,state);
  },
  undo:function(id){
    this.props.undo(id);
  },
  split:function(id){
    this.props.split(id);
  },
  deny:function(id){

    this.props.deny(id);
  },

  render:function(){
    var list = [];
    for(var i = 0;i < this.props.reviewList.length;i++){
      var temp = this.props.reviewList[i];
      var result;
      if(temp.state=="评审"){
        result = React.createElement(MerReview, {editReview: this.props.editReview, 
         review: temp, type: this.props.type, updateChoose: this.updateChoose, deny: this.deny});
        list.push(result);
      } else if(temp.state=="被否决"){
        result = React.createElement(Denied, {review: temp, type: this.props.type, undo: this.undo})
        list.push(result);
      } else if(temp.state=="合并"){
        var source = [];
        for(var j = 0;j < this.props.reviewList.length;j++){
          if(temp.children.indexOf(this.props.reviewList[j].id) >= 0){
            var info = this.props.reviewList[j].reviewer + "：" + this.props.reviewList[j].content;
            source.push(info);
          }
        }
        result = React.createElement(Merged, {review: temp, source: source, type: this.props.type, 
                           updateChoose: this.updateChoose, split: this.split, editReview: this.props.editReview})
        list.push(result);
      }
    }
    return(
      React.createElement("div", {className: "container"}, 
        list
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

/*合并模态框组件*/
var MergeModal = React.createClass({displayName: "MergeModal",
  componentDidMount:function(){
      $(this.refs.modal).modal('show');
      $(this.refs.modal).on('hidden.bs.modal', this.props.handleHideModal);
      $(this.refs.positon).select2();
  },
  confirmMerge:function(){
    $(this.refs.modal).modal('toggle');
    var positon = this.refs.positon.value;
    var content = this.refs.content.value.trim();
    if(!content){
      return;
    }
    var pos = positon.split(",");
    this.props.confirmMerge(pos[0],pos[1],content);
  },
  render:function(){
    var text = this.props.contents.join("||");
    var options = [];
    if(this.props.type=="文档评审"){
      for(var i = 0;i < this.props.pos.length;i++){
        var posValue = this.props.pos[i].page + "," + this.props.pos[i].row;
        var temp = React.createElement("option", {value: posValue}, "第", this.props.pos[i].page, "页，第", this.props.pos[i].row, "行");
        options.push(temp);
      }    
    } else {
      for(var i = 0;i < this.props.pos.length;i++){
        var posValue = this.props.pos[i].page + "," + this.props.pos[i].row;
        var temp = React.createElement("option", {value: posValue}, this.props.pos[i].page, "，第", this.props.pos[i].row, "行");
        options.push(temp);
      }
    }
    
    return(
      React.createElement("div", {ref: "modal", className: "modal fade", tabIndex: "-1", role: "dialog"}, 
      React.createElement("div", {className: "modal-dialog modal-lg"}, 
        React.createElement("div", {className: "modal-content"}, 
          React.createElement("div", {className: "modal-header"}, 
            React.createElement("button", {type: "button", className: "close", "data-dismiss": "modal", "aria-label": "Close"}, React.createElement("span", {"aria-hidden": "true"}, "×")), 
            React.createElement("h4", {className: "modal-title", id: "gridSystemModalLabel"}, "合并评审")
          ), 
          React.createElement("div", {className: "modal-body"}, 
            React.createElement("form", {className: "form-horizontal"}, 
            React.createElement("div", {className: "form-group"}, 
              React.createElement("select", {className: "form-control  select select-primary", "data-toggle": "select", ref: "positon"}, 
                options
              )
            ), 
            React.createElement("div", {className: "form-group"}, 
              React.createElement("textarea", {ref: "content", rows: "3", className: "form-control", defaultValue: text}
              )
            ), 
            React.createElement("div", {className: "form-group"}, 
              React.createElement("button", {type: "button", onClick: this.confirmMerge, className: "btn btn-primary"}, "确认合并")
            )
            )
          )
        )
      )
    )

    );
  }
});

/*组装所有的组件的app*/
var Merge = React.createClass({displayName: "Merge",

  getInitialState:function() {
      return {
          profile:{id: undefined, name: undefined, mail: undefined, group: []} ,
          review:{},
          reviewList:[],
          chooseList:{},
          showModal:false,
          pos:[],
          contents:[],
          showEditModal:false,
          editReview:{}
      };
  },
  handleHideModal:function(){
    this.setState({showModal:false});
  },
  handleShowModal:function(){
    this.setState({showModal:true});
  },
  handleShowEditModal:function(){
    this.setState({showEditModal:true});
  },
  handleHideEditModal:function(){
    this.setState({showEditModal:false});
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
	
     $.ajax({
      url: "./php/deficiencylist.php?type=merge&id="+id,//TODO:get customer profile url
      dataType: 'json',
      cache: false,
      success: function(data) {
		var list = {};
		for(var defi in data){
			//console.log(data[defi].id);
			var defiId = data[defi].id;
			list[defiId]=false;
		}
		
		//console.log(list);
        this.setState({reviewList: data});
		this.setState({chooseList: list});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error("", status, err.toString());//TODO:as same as above
      }.bind(this)
    });
  },
  merge:function(e){
    e.preventDefault();
    var chosen = [];
    var updatedPos = [];
    var updatedContents = [];
    var count = 0;

    for(var key in this.state.chooseList){
      if(this.state.chooseList[key]){
		console.log(key);
        count++;
        var po = {};
        for(var i =0;i < this.state.reviewList.length;i++){
          if(this.state.reviewList[i].id==key){
            po["page"] = this.state.reviewList[i].page;
            po["row"] = this.state.reviewList[i].row;
            updatedPos.push(po);
            updatedContents.push(this.state.reviewList[i].content);
          }
        }
      }
    }
    if(count<=1){
      return;
    }
	//alert("1321");
    this.setState({pos:updatedPos,contents:updatedContents});
    this.handleShowModal();
  },
  confirmMerge:function(page,row,content){
    var children =[];
    var outOfDate = [];//存放被合并的合并评审的数组下标
    var outOfDateServer = [];//存放被合并的合并评审的id
    for(var key in this.state.chooseList){//找到所有的被合并评审，和过期的合并评审
      if(this.state.chooseList[key]){
        for(var i =0;i < this.state.reviewList.length;i++){
          if(this.state.reviewList[i].id==key){
            if(this.state.reviewList[i].state=="评审"){
              children.push(this.state.reviewList[i].id);
            } else {
              outOfDate.push(i);
              outOfDateServer.push(this.state.reviewList[i].id);
              children = children.concat(this.state.reviewList[i].children);
            }
          }
        }
      }
    }
    var merged = {};
    merged["page"] = page;
    merged["row"] = row;
    merged["reviewer"] = this.state.profile.name;
    merged["state"] = "合并";
    merged["content"] = content;
	merged["deleted"] = outOfDateServer;
    merged["children"] = children;
	
	var post_data = merged;
	post_data["action"] = "merge";
    var id;// 用来接受服务器的合并id
    $.ajax({
      url: "./php/merge.php",//TODO:将合并后的信息上传到服务器，服务器返回一个id，即合并的id;同时将被合并的合并评审删除
      dataType: 'json',
	  async : false,
	  type : "post",  
	  data: post_data,
      cache: false,
      success: function(data) {
        id = data;
        //id = "22222";
      }.bind(this),
      error: function(xhr, status, err) {
        //console.error("", status, err.toString())
       // id = "22222";
      }.bind(this)
    });
    merged["id"] = id;
    var updated = JSON.parse(JSON.stringify(this.state.reviewList));
    var index;
    //删除被合并的合并评审
    for(var i = 0;i < outOfDate.length;i++){
      updated.splice(outOfDate[i]-i,1);
    }

    //隐藏被合并的普通评审
    for(var i = 0;i < updated.length;i++){
      if(children.indexOf(updated[i].id) >= 0){
        updated[i].state = "被合并";
      }
    }

    // 插入新的合并评审
    for(var i = 0;i < updated.length;i++){
      if(this.compare(updated[i],merged)){
        index = i;
        break;
      }
    }
    if(index == undefined){
      index = updated.length -1;
    }
	
	
    //更新被选中的情况
    var updatedChoose = JSON.parse(JSON.stringify(this.state.chooseList));
    updatedChoose[merged.id] = false;
    for(var key in updatedChoose){
      updatedChoose[key] = false;
    }
    this.setState({chooseList:updatedChoose});
    updated.splice(index,0,merged);
    this.setState({reviewList:updated});
    
    $("[type='checkbox']").attr("checked",false);
  },
  compare:function(review1,review2){//比较两个评审的位置前后
    var type = localStorage["rs_type"];
    if(type=="文档评审"){
      var page1 = review1.page;
      var page2 = review2.page;
      if(page1 > page2){
        return true;
      } else if(page1 == page2) {
        var row1 = parseInt(review1.row, 10);
        var row2 = parseInt(review2.row, 10);
        if(row1 > row2){
          return true;
        } else if(row1 == row2){
          return false;
        } else {
          return false;
        }
      } else {
        return false;
      }

    } else {//代码评审位置比较
      var page1 = parseInt(review1.page, 10);
      var page2 = parseInt(review2.page, 10);
      if(page1 > page2){
        return true;
      } else if(page1 == page2){
        var row1 = parseInt(review1.row, 10);
        var row2 = parseInt(review2.row, 10);
        if(row1 > row2){
          return true;
        } else if(row1 == row2){
          return false;
        } else {
          return false;
        }
      } else {
        return false;
      }
    }

  },
  editReview:function(id){
    for(var i = 0;i < this.state.reviewList.length; i++){
      if(this.state.reviewList[i].id == id ){
        this.setState({editReview:this.state.reviewList[i]});
        break;
      }
    }
    this.handleShowEditModal();
  },
  confirmEdition:function(id,content){
    var sucess = false;
	$.ajax({  
		type : "post",  
		url : "./php/merge.php",  
		data : {action:'edit', defiId:id, content:content},  
		async : false,  
		success : function(data){
			sucess = true;
		}
	}); 
    //TODO:服务器更新编辑
	if(sucess){
		var updated = JSON.parse(JSON.stringify(this.state.reviewList));
		for(var i =0;i < updated.length; i++){
			if(updated[i].id == id){
				updated[i].content = content;
				this.setState({reviewList:updated});
				break;
			}
		}
	}
  },

  //将某个评审的状态从“评审”变成“被否决”
  deny:function(id){
	var sucess = false;
    $.ajax({ 
		type : "post",  
		url : "./php/merge.php",  
		data : {action:'deny', defiId:id},  
		async : false,  
		success : function(data){
			sucess = true;
		}
	}); 
    //TODO:提交到服务器
	if(sucess){
		var updated = JSON.parse(JSON.stringify(this.state.reviewList));
		for(var i = 0;i < updated.length;i++){
			if(updated[i].id==id){
				updated[i].state = "被否决";
				this.setState({reviewList:updated});
				break;
			}
		}	
	}
	
  },
  split:function(id){
    var updated = JSON.parse(JSON.stringify(this.state.reviewList));
    var children;
    var index;
    for(var i =0;i < updated.length;i++){
      if(updated[i].id==id){
        children = updated[i].children;
        index = i;
      }
    }
	var sucess = false;
	$.ajax({ 
		type : "post",  
		url : "./php/merge.php",  
		data : {action:'split', defiId:id},  
		async : false,  
		success : function(data){
			sucess = true;
		}
	}); 
	if(sucess){
		 //删除被拆分的合并评审
		updated.splice(index,1);
		//TODO:通知服务器
		//释放被合并的评审
		for(var i =0;i < updated.length;i++){
		  if(children.indexOf(updated[i].id) >= 0){
			updated[i].state = "评审";
		  }
		}
		this.setState({reviewList:updated});
	}
  },
  //将某个评审的状态从“被否决”变成“评审”
  undo:function(id){
	var sucess = false;
	$.ajax({ 
		type : "post",  
		url : "./php/merge.php",  
		data : {action:'undeny', defiId:id},  
		async : false,  
		success : function(data){
			sucess = true;
		}
	}); 
    //TODO:提交到服务器
	
	if(sucess){
		var updated = JSON.parse(JSON.stringify(this.state.reviewList));
		for(var i = 0;i < updated.length;i++){
		if(updated[i].id==id){
			updated[i].state = "评审";
			this.setState({reviewList:updated});
			break;
		  }
		}
	}
  },
  updateChoose:function(id,state){
    var updated = JSON.parse(JSON.stringify(this.state.chooseList));
    for(var key in updated){
      if(key==id){
        updated[key] = state;
        this.setState({chooseList:updated});
        break;
      }
    }
  },
  completeMerge:function(){
    var target = "report.html?id="+ this.state.review.id;
    location.href = target;
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
      React.createElement("div", {className: "container"}, 
        React.createElement(Explain, null)
      ), 
      
      React.createElement(MergeList, {updateChoose: this.updateChoose, editReview: this.editReview, 
       undo: this.undo, split: this.split, deny: this.deny, reviewList: this.state.reviewList, type: type}), 

      React.createElement("div", {className: "container"}, 
        React.createElement("div", {className: "col-lg-10 col-md-10 col-sm-12 col-xs-12 col-lg-offset-1 col-md-offset-1"}, 
          React.createElement("button", {type: "button", onClick: this.completeMerge, className: "btn btn-primary btn-block"}, "完成合并，查看报表")
        )
      ), 

      React.createElement("div", {className: "fixed-bottom"}, 
        React.createElement("button", {type: "button", onClick: this.merge, className: "round-button shadow"}, "合")
      ), 
      this.state.showModal?React.createElement(MergeModal, {type: type, handleHideModal: this.handleHideModal, confirmMerge: this.confirmMerge, pos: this.state.pos, contents: this.state.contents}):null, 
      this.state.showEditModal?React.createElement(ReviewEditModal, {confirmEdition: this.confirmEdition, 
             review: this.state.editReview, handleHideModal: this.handleHideEditModal}):null
      )
    );
  }
});

ReactDOM.render(React.createElement(Merge, null), document.getElementById("app"));





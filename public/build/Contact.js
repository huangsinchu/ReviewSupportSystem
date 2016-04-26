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

/*联系人组中的某一行，可删除的行*/
var DBranch = React.createClass({displayName: "DBranch",
  delete:function(e){
    e.preventDefault();
    this.props.deleteContact(this.props.mail);
  },
  render:function(){
    return(
      React.createElement("li", null, React.createElement("span", {ref: "mail", value: this.props.mail}, this.props.mail), React.createElement("a", {onClick: this.delete}, "删除"))
    );
  }
});

/*一个联系人组组件*/
var TreeLine = React.createClass({displayName: "TreeLine",
  deleteContact:function(mail){
    this.props.deleteContact(mail);
  },
  render:function(){
    var children = [];
    for(var i = 0;i < this.props.content.length; i++){
      var child = this.props.line=="所有联系人"?React.createElement(DBranch, {mail: this.props.content[i], deleteContact: this.deleteContact}):React.createElement("li", null, React.createElement("span", null, this.props.content[i]));
      children.push(child);
    }
    return(
      
      React.createElement("li", null, 
        React.createElement("span", null, this.props.line), 
        React.createElement("ul", null, 
        children
        )
      )
    );
  }
});

/*联系人编辑面板*/
var ContactPanel = React.createClass({displayName: "ContactPanel",
  getInitialState:function() {
      return {
        searchState:"input-group",
        searchHolder:"请输入联系人的邮箱",
        searchMail:""
      };
  },
  componentWillUpdate:function() {
    $('[data-toggle="checkbox"]').radiocheck();
  },
  componentDidMount:function() {
     $(function () {
  $('.tree li:has(ul)').addClass('parent_li').find(' > span').attr('title', 'Collapse this branch');
  $('.tree li.parent_li > span').on('click', function (e) {
    var children = $(this).parent('li.parent_li').find(' > ul > li');
    if (children.is(":visible")) {
      children.hide('fast');
      $(this).attr('title', 'Expand this branch').find(' > i').addClass('icon-plus-sign').removeClass('icon-minus-sign');
    } else {
      children.show('fast');
      $(this).attr('title', 'Collapse this branch').find(' > i').addClass('icon-minus-sign').removeClass('icon-plus-sign');
    }
    e.stopPropagation();
  });
});   
  },
  check:function(mail){
    var id = this.props.profile.id;
	var status = 0;
    //TODO:检查服务器，没有该账户返回0，已经添加返回1，尚未添加返回2
	$.ajax({
		type : "post",  
		url : "./php/checkcontact.php",  
        data : {mail:mail},  
		async : false,  
		success : function(data){
			status = data;
		}
	});
    return status;
  },
  search:function(e){
    e.preventDefault();
    var mail = this.refs.mail.value.trim();
    if(!mail){
      return;
    }
    var state = this.check(mail);
    if(state==0){
      this.refs.mail.value = "";
      this.setState({searchState:"input-group has-error",searchHolder:"你所查询联系人不存在！"});
    } else if(state==1) {
      this.refs.mail.value = "";
      this.setState({searchState:"input-group has-error",searchHolder:"你已经添加过该联系人！"});
    } else {
      this.refs.mail.value = "";
      this.setState({searchState:"input-group",searchHolder:"请输入联系人的邮箱"});
      this.setState({searchMail:mail})
      $("#makeGroups").modal("toggle");
    }


  },
  deleteContact:function(mail){
    this.props.deleteContact(mail);
  },
  makeGroups:function(){
    var chosenGroups = [];
    for(var i in this.props.profile.group){
      if($("#"+this.props.profile.group[i]).is(":checked")){
        chosenGroups.push(this.props.profile.group[i]);
      }
    }
    this.props.makeGroups(chosenGroups,this.state.searchMail);
    $("#makeGroups").modal("toggle");
  },
  render:function(){
    var list = [];
    for(var key in this.props.contactors){
      var temp = React.createElement(TreeLine, {line: key, content: this.props.contactors[key], deleteContact: this.deleteContact})
      list.push(temp);
    }
    var options = [];
    for(var i in this.props.profile.group){
      if(this.props.profile.group[i]!="所有联系人"){
        var temp = React.createElement("label", {className: "checkbox text-primary"}, 
                    React.createElement("input", {id: this.props.profile.group[i], type: "checkbox", "data-toggle": "checkbox"}), 
                      this.props.profile.group[i]
                   );
        options.push(temp);
      }
    }
    return(
    React.createElement("div", {className: "col-lg-12 col-md-12 col-sm-12 col-xs-12 "}, 
      React.createElement("form", {className: "form-horizontal", onSubmit: this.search}, 
        React.createElement("div", {className: this.state.searchState}, 
          React.createElement("input", {type: "mail", className: "form-control", placeholder: this.state.searchHolder, ref: "mail"}), 
          React.createElement("span", {className: "input-group-btn"}, 
            React.createElement("button", {type: "submit", className: "btn btn-default"}, "搜索")
          )
        )
      ), 
      React.createElement("hr", null), 
      React.createElement("div", {className: "tree well"}, 
        React.createElement("ul", null, 
        list
        )
      ), 

      React.createElement("div", {className: "modal fade", id: "makeGroups", tabIndex: "-1", role: "dialog"}, 
        React.createElement("div", {className: "modal-dialog modal-lg"}, 
          React.createElement("div", {className: "modal-content"}, 
            React.createElement("div", {className: "modal-header"}, 
              React.createElement("button", {type: "button", className: "close", "data-dismiss": "modal", "aria-label": "Close"}, React.createElement("span", {"aria-hidden": "true"}, "×")), 
              React.createElement("h5", {className: "modal-title", id: "gridSystemModalLabel"}, "添加分组")
            ), 
            React.createElement("div", {className: "modal-body"}, 
              React.createElement("label", {className: "checkbox text-primary"}, 
                React.createElement("input", {type: "checkbox", id: "所有联系人", checked: "checked", disabled: "disabled", "data-toggle": "checkbox"}), 
                  "所有联系人"
              ), 
              options, 
              React.createElement("button", {type: "button", className: "btn btn-primary", onClick: this.makeGroups}, "确认分组")
            )
          )
        )
      )
    )
    );
  }
});


/*组编辑面板*/
var GroupPanel = React.createClass({displayName: "GroupPanel",
  componentDidMount:function() {
    $(".tagsinput").tagsinput();  
  },
  updateGroup:function(e){
    e.preventDefault();
    var groups = this.refs.groups.value.trim();
    if(groups==""){
      this.props.updateGroupInServer("所有联系人");
    } else {
      this.props.updateGroupInServer("所有联系人,"+groups);
    }
    

  },

  render:function(){
    var groups = this.props.group.concat([]);
    groups.shift();
    var groupStr = "";
    for(var i =0; i < groups.length; i++){
      groupStr += groups[i] + ",";
    } 
    return(
      React.createElement("div", {className: "container"}, 
        React.createElement("div", {className: "col-lg-12 col-md-12 col-sm-12 col-xs-12"}, 
        React.createElement("h3", null, "编辑分组"), 
        React.createElement("form", {onSubmit: this.updateGroup}, 
          React.createElement("div", {className: "tagsinput-primary"}, 
            React.createElement("input", {className: "tagsinput", ref: "groups", value: groupStr})
          ), 
          React.createElement("button", {type: "submit", className: "btn btn-primary"}, "更新分组")
        )
        )
      )
    );
  }
});

/*组装所有的组件的app*/

var ContactPage = React.createClass({displayName: "ContactPage",
  
  getInitialState:function() {
      return {
          profile:{id: undefined, name: undefined, mail: undefined, group: []} ,
          contactors:{}
      };
  },
  componentWillMount: function() {
    $.ajax({
      url: "./php/userinfo.php",//TODO:get customer profile url
      dataType: 'json',
	  async : false, 
      cache: false,
      success: function(data) {
        this.setState({profile: data});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error("", status, err.toString());//TODO:as same as above
      }.bind(this)
    });
    $.ajax({
      url: "./php/contact.php",//TODO:get customer profile url
      dataType: 'json',
      cache: false,
      success: function(data) {
        this.setState({contactors: data});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error("", status, err.toString());//TODO:as same as above
      }.bind(this)
    });
  },

  updateGroupInServer:function(newGroups){
    var newProfile = {};
    var groups = newGroups.split(",");

    newProfile["id"] = this.state.profile.id;
    newProfile["name"] = this.state.profile.name;
    newProfile["passworld"] = this.state.profile.password;
    newProfile["mail"] = this.state.profile.mail;
    newProfile["group"] = groups;
    this.setState({profile:newProfile});

    var updated = JSON.parse(JSON.stringify(this.state.contactors));
    var temp = [];
    for(var key in updated){
      if(groups.indexOf(key)==-1){
        delete updated[key];
      } else {
        temp.push(key);
      }
    }
    for(var i=0;i < groups.length;i++){
      if(temp.indexOf(groups[i])==-1){
        updated[groups[i]] = [];
      }
    }
    this.setState({contactors:updated});

    
    //TODO:提交服务器
    $.ajax({
	  type : "post",
      url: "./php/updategroup.php",//TODO:get customer profile url
      dataType: 'json',
	  data : {'groups':groups},
      cache: false,
      success: function(data) {
       // this.setState({profile: data});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error("", status, err.toString());//TODO:as same as above
      }.bind(this)
    });
  },
  deleteContact:function(mail){
    var deleted = {};
    for(var key in this.state.contactors){
      var updateList = [];
      for(var i =0;i < this.state.contactors[key].length;i++){
        if(this.state.contactors[key][i]!=mail){
          updateList.push(this.state.contactors[key][i]);
        }
      }
      deleted[key] = updateList;
    }
    this.setState({contactors:deleted});
    
	$.ajax({  
		type : "post",  
		url : "./php/updatecontact.php",  
		data : {action:"delete",mail:mail},  
		async : false,  
		success : function(data){
			//status = data;
		}
	}); 
	//TODO:服务器删除联系人，将某个用户所有组中的这个联系人删除
  },
  makeGroups:function(groups,mail){
	var sucess = false;
    //alert(groups)
    //TODO:将添加过后的联系人更新到服务器,其中groups是选中的组名，mail是被添加联系人的邮件
	$.ajax({  
		type : "post",  
		url : "./php/updatecontact.php",  
		data : {action:"add", mail:mail, groups:groups},  
		async : false,  
		success : function(data){
			
		}
	}); 
	if(sucess){
		var updated = JSON.parse(JSON.stringify(this.state.contactors));
		for(var i in groups){
		  updated[groups[i]].push(mail);
		}
		this.setState({contactors:updated});
	}
  },

  render: function(){
    
    return(
      React.createElement("div", null, 
        React.createElement(Navbar, {profile: this.state.profile}), 
        React.createElement("br", null), 
        React.createElement("br", null), 
        React.createElement("div", {className: "container"}, 
          React.createElement(ContactPanel, {profile: this.state.profile, deleteContact: this.deleteContact, makeGroups: this.makeGroups, contactors: this.state.contactors})
        ), 
        React.createElement("hr", null), 
        React.createElement(GroupPanel, {group: this.state.profile.group, updateGroupInServer: this.updateGroupInServer})
      )
    );
  }
});

ReactDOM.render(React.createElement(ContactPage, null), document.getElementById("app"));


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
/* 信息编辑面板，可以修改必要的个人信息*/
var EditPanel = React.createClass({displayName: "EditPanel",
  getInitialState:function() {
      return {
          inputState:{
            "op":"form-group",
            "np":"form-group",
            "opHolder":"",
            "cpHolder":""
          },
          name:this.props.profile.name
      };
  },

  updateInfo:function(e){
      e.preventDefault();
      var name = this.refs.name.value.trim();
      var op = this.refs.op.value;
      var np = this.refs.np.value;
      var cp = this.refs.cp.value;
      if (!name) {
        return;
      }
      var newProfile = this.props.profile;
      newProfile.name = name;
      if(!op||!np||!cp){
        this.props.updateProfile(newProfile);
      } else {
		if(np==cp){
            newProfile.password = np;
            var status = this.props.updateProfile(op,newProfile);
			if(status==1){
				this.refs.op.value = "";
				this.refs.np.value = "";
				this.refs.cp.value = "";
				var newState = this.state.inputState;
				newState.op = "form-group has-success";
				newState.np = "form-group has-success";
				newState.opHolder = "密码修改成功";
				newState.cpHolder = "";
				this.setState({inputState:newState});
			}else{
				var newState = this.state.inputState;
			  newState.op = "form-group has-error";
			  this.refs.op.value = "";
			  newState.opHolder = "原密码输入错误！";
			  this.setState({inputState:newState});
			}
            
          }else{//np!=cp
            var newState = this.state.inputState;
            newState.op = "form-group";
            newState.np = "form-group has-error";
            this.refs.np.value = "";
            this.refs.cp.value = "";
            newState.opHolder = "";
            newState.cpHolder = "确认密码与新密码不一致！";
            this.setState({inputState:newState});
          }
		
      }
  },
  handleChange:function(event){
    this.setState({name: event.target.value});
  },
  render:function(){
    return(
      React.createElement("div", {className: "container"}, 
      React.createElement("div", {className: "jumbotron"}, 
      React.createElement("form", {className: "form-horizontal", onSubmit: this.updateInfo}, 

        React.createElement("div", {className: "form-group"}, 
          React.createElement("label", {for: "name-input", className: "control-label col-sm-2 col-md-2 col-lg-2"}, "昵称"), 
          React.createElement("div", {className: "col-sm-8 col-md-8 col-lg-8"}, 
            React.createElement("input", {type: "text", className: "form-control", ref: "name", value: this.state.name, onChange: this.handleChange})
          )
        ), 

        React.createElement("div", {className: "form-group"}, 
          React.createElement("label", {className: "control-label col-sm-2 col-md-2 col-lg-2"}, "邮箱"), 
          React.createElement("label", {className: "text-primary col-sm-8 col-md-8 col-lg-8"}, this.props.profile.mail)
        ), 

        React.createElement("div", {className: this.state.inputState.op}, 
          React.createElement("label", {for: "op-input", className: "control-label col-sm-2 col-md-2 col-lg-2"}, "原密码"), 
          React.createElement("div", {className: "col-sm-8 col-md-8 col-lg-8"}, 
            React.createElement("input", {type: "password", className: "form-control", id: "op-input", ref: "op", placeholder: this.state.inputState.opHolder})
          )
        ), 

        React.createElement("div", {className: this.state.inputState.np}, 
          React.createElement("label", {for: "np-input", className: "control-label col-sm-2 col-md-2 col-lg-2"}, "新密码"), 
          React.createElement("div", {className: "col-sm-8 col-md-8 col-lg-8"}, 
            React.createElement("input", {type: "password", className: "form-control", id: "np-input", ref: "np"})
          )
        ), 

        React.createElement("div", {className: this.state.inputState.np}, 
          React.createElement("label", {for: "cp-input", className: "control-label col-sm-2 col-md-2 col-lg-2"}, "确认新密码"), 
          React.createElement("div", {className: "col-sm-8 col-md-8 col-lg-8"}, 
            React.createElement("input", {type: "password", className: "form-control", id: "cp-input", ref: "cp", placeholder: this.state.inputState.cpHolder})
          )
        ), 

        React.createElement("div", {className: "form-group"}, 
           React.createElement("div", {className: "col-sm-offset-2 col-md-offset-2 col-lg-offset-2 col-md-4 col-lg-2 col-sm-8"}, 
              React.createElement("button", {type: "submit", className: "btn btn-primary"}, "确认修改")
            )
        )

      )
      )
      )
    );
  }
});

/*组装所有的组件的app*/

var InfoPage = React.createClass({displayName: "InfoPage",
  componentWillMount: function() {
    $.ajax({
      url: "./php/userinfo.php",//TODO:get customer profile url
	  async : false, 
      dataType: 'json',
      cache: false,
      success: function(data) {
        this.setState({profile: data});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error("", status, err.toString());//TODO:as same as above
      }.bind(this)
    });

  },

  getInitialState:function() {
      return {
           profile:{id: undefined, name: undefined, mail: undefined, group: []}  
      };
  },
  updateProfile:function(op,newProfile){
	var status = 2;
	var p = newProfile;
	p.oldpassword = op;
    $.ajax({  
		type : "post",  
		url : "./php/updateuserinfo.php",  
		data : p,  
		async : false,  
		success : function(data){
			status = data;
		}
	});

	return status;
  },

  render: function(){
    
    return(
      React.createElement("div", null, 
        React.createElement(Navbar, {profile: this.state.profile}), 
      React.createElement("br", null), 
      React.createElement("br", null), 
      React.createElement("br", null), 
        React.createElement(EditPanel, {profile: this.state.profile, updateProfile: this.updateProfile})
      )
    );
  }
});

ReactDOM.render(React.createElement(InfoPage, null), document.getElementById("app"));


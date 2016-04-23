var LoginForm = React.createClass({displayName: "LoginForm",
	getInitialState:function() {
	    return {
	       mailState:"form-group",
	       mailHolder:"请输入邮箱",
	       passState:"form-group",
	       passHolder:"请输入密码"
	    };
	},
	login:function(event){
		event.preventDefault();
		var mail = this.refs.mail.value.trim();
		var password = this.refs.password.value.trim();
		if(!mail||!password){
			return;
		}
		var status = 2;
		//TODO:提交到服务器，返回状态码，没有用户返回1，密码错误返回2，成功返回3
		$.ajax({  
        	type : "post",  
        	url : "./php/login.php",  
        	data : {mail:mail,password:password},  
          	async : false,  
          	success : function(data){
				status = data;
			}
		}); 
		
		if(status==1){
			this.refs.mail.value="";
			this.setState({mailState:"form-group has-error",
	       		mailHolder:"用户不存在",
	       		passState:"form-group",
	       		passHolder:"密码"});

		} else if (status==2){
			this.refs.password.value="";
			this.setState({mailState:"form-group",
	       		mailHolder:"邮箱",
	       		passState:"form-group has-error",
	       		passHolder:"密码错误"});
		} else {
			location.href = "index.html";

		}
	},
	render:function(){
		return(
			React.createElement("div", {className: "login-form col-lg-4 col-lg-offset-4 col-md-8 col-md-offset-2 col-sm-10 col-sm-offset-1 col-xs-12"}, 
				React.createElement("form", {className: "form-horizontal", onSubmit: this.login}, 
					React.createElement("div", {className: this.state.mailState}, 
						React.createElement("input", {type: "mail", placeholder: this.state.mailHolder, ref: "mail", className: "form-control"}), 
						React.createElement("label", {className: "login-field-icon fui-mail"})
					), 

					React.createElement("div", {className: this.state.passState}, 
						React.createElement("input", {type: "password", placeholder: this.state.passHolder, ref: "password", className: "form-control"}), 
						React.createElement("label", {className: "login-field-icon fui-lock"})
					), 

					React.createElement("button", {className: "btn btn-primary btn-lg btn-block", type: "submit"}, "登陆")			

				)
			)
		);
	}
});

var SignupForm = React.createClass({displayName: "SignupForm",
	getInitialState:function() {
	    return {
	       mailState:"form-group",
	       mailHolder:"邮箱",
	       passconfirmState:"form-group",
	       passconfirmHolder:"确认密码"
	    };
	},
	signup:function(event){
		event.preventDefault();
		var mail = this.refs.mail.value.trim();
		var name = this.refs.name.value.trim();
		var password = this.refs.password.value.trim();
		var passconfirm = this.refs.passconfirm.value.trim();
		if(!mail||!name||!password||!passconfirm){
			return;
		}
		if(password != passconfirm){
			this.refs.password.value = "";
			this.refs.passconfirm.value = "";
			this.setState({mailState:"form-group",
	       		mailHolder:"邮箱",
	       		passconfirmState:"form-group has-error",
	       		passconfirmHolder:"密码不一致"});
		}
		var status = 1;
		//TODO:将信息发送到服务器，如果成功返回1，如果邮箱已经被注册，返回2
		$.ajax({  
        	type : "post",  
        	url : "./php/register.php",  
        	data : {mail:mail,name:name,password:password},  
          	async : false,  
          	success : function(data){
				status = data;
			}
		}); 
		
		if(status == 1){
			this.props.hint();
		} else if (status == 2){
			this.refs.mail.value = "";
			this.refs.password.value = "";
			this.refs.passconfirm.value = "";
			this.setState({mailState:"form-group has-error",
	       		mailHolder:"邮箱已被注册",
	       		passconfirmState:"form-group",
	       		passconfirmHolder:"确认密码"});	
		} else if (status == 3){
			this.refs.mail.value = "";
			this.refs.password.value = "";
			this.refs.passconfirm.value = "";
			this.setState({mailState:"form-group has-error",
	       		mailHolder:"邮箱格式不正确",
	       		passconfirmState:"form-group",
	       		passconfirmHolder:"确认密码"});	
		}
	},
	render:function(){
		return(
			React.createElement("div", {className: "login-form col-lg-4 col-lg-offset-4 col-md-8 col-md-offset-2 col-sm-10 col-sm-offset-1 col-xs-12"}, 
				React.createElement("form", {className: "form-horizontal", onSubmit: this.signup}, 
					React.createElement("div", {className: this.state.mailState}, 
						React.createElement("input", {type: "mail", placeholder: this.state.mailHolder, ref: "mail", className: "form-control"}), 
						React.createElement("label", {className: "login-field-icon fui-mail"})
					), 

					React.createElement("div", {className: "form-group"}, 
						React.createElement("input", {type: "text", placeholder: "昵称", ref: "name", className: "form-control"}), 
						React.createElement("label", {className: "login-field-icon fui-user"})
					), 

					React.createElement("div", {className: "form-group"}, 
						React.createElement("input", {type: "password", placeholder: "密码", ref: "password", className: "form-control"}), 
						React.createElement("label", {className: "login-field-icon fui-lock"})
					), 

					React.createElement("div", {className: this.state.passconfirmState}, 
						React.createElement("input", {type: "password", placeholder: this.state.passconfirmHolder, ref: "passconfirm", className: "form-control"}), 
						React.createElement("label", {className: "login-field-icon fui-lock"})
					), 

					React.createElement("button", {className: "btn btn-primary btn-block", type: "submit"}, "注册")			

				)
			)

		);
	}
});


var Login = React.createClass({displayName: "Login",
	getInitialState:function() {
	    return {
	       hideHint:true,
	       showLogin:true
	    };
	},
	hint:function(){
		this.setState({hideHint:false});
	},
	loginPanel:function(){
		this.setState({showLogin:true});
	},
	signupPanel:function(){
		this.setState({showLogin:false});
	},
	render:function(){
		var panel = this.state.showLogin ? React.createElement(LoginForm, null) : React.createElement(SignupForm, {hint: this.hint});
		var main = (
				React.createElement("div", null, 
					React.createElement("div", {className: "container row-bottom"}, 
						
						React.createElement("div", {className: "centerblock"}, 
						React.createElement("div", {className: "btn-group"}, 
							React.createElement("button", {type: "button", onClick: this.loginPanel, className: "btn btn-primary"}, "登录"), 
							React.createElement("button", {type: "button", onClick: this.signupPanel, className: "btn btn-primary"}, "注册")
						)
						)
						
					), 

					React.createElement("div", {className: "container"}, 
						panel
					)
				)
		);
		var hint = (
			React.createElement("div", {className: "container"}, 
				React.createElement("div", {className: " col-lg-4 col-lg-offset-4 col-md-8 col-md-offset-2 col-sm-10 col-sm-offset-1 col-xs-12"}, 
					React.createElement("p", {className: "text-primary"}, "注册已完成，请去邮箱激活帐户！")
				)
			)
			);
		return(
			React.createElement("div", null, 
				React.createElement("div", {className: "container"}, 
					React.createElement("div", {className: "row text-center"}, 
						React.createElement("h1", null, "审")
					)
				), 
				this.state.hideHint ? main : hint
			)
		);
	}
});

ReactDOM.render(React.createElement(Login, null), document.getElementById("app"));
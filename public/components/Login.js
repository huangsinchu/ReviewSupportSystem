var LoginForm = React.createClass({
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
			<div className="login-form col-lg-4 col-lg-offset-4 col-md-8 col-md-offset-2 col-sm-10 col-sm-offset-1 col-xs-12">
				<form className="form-horizontal" onSubmit={this.login}>
					<div className={this.state.mailState}>
						<input type="mail" placeholder={this.state.mailHolder} ref="mail" className="form-control"/>
						<label className="login-field-icon fui-mail"></label>
					</div>

					<div className={this.state.passState}>
						<input type="password" placeholder={this.state.passHolder} ref="password" className="form-control"/>
						<label className="login-field-icon fui-lock"></label>
					</div>

					<button className="btn btn-primary btn-lg btn-block" type="submit">登陆</button>			

				</form>
			</div>
		);
	}
});

var SignupForm = React.createClass({
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
		if(status == 1){
			this.props.hint();
		} else if (status == 2){
			this.refs.mail.value = "";
			this.refs.name.value = "";
			this.refs.password.value = "";
			this.refs.passconfirm.value = "";
			this.setState({mailState:"form-group has-error",
	       		mailHolder:"邮箱已被注册",
	       		passconfirmState:"form-group",
	       		passconfirmHolder:"确认密码"});	
		}
	},
	render:function(){
		return(
			<div className="login-form col-lg-4 col-lg-offset-4 col-md-8 col-md-offset-2 col-sm-10 col-sm-offset-1 col-xs-12">
				<form className="form-horizontal" onSubmit={this.signup}>
					<div className={this.state.mailState}>
						<input type="mail" placeholder={this.state.mailHolder} ref="mail" className="form-control"/>
						<label className="login-field-icon fui-mail"></label>
					</div>

					<div className="form-group">
						<input type="text" placeholder="昵称" ref="name" className="form-control" />
						<label className="login-field-icon fui-user"></label>
					</div>

					<div className="form-group">
						<input type="password" placeholder="密码" ref="password" className="form-control"/>
						<label className="login-field-icon fui-lock"></label>
					</div>

					<div className={this.state.passconfirmState}>
						<input type="password" placeholder={this.state.passconfirmHolder} ref="passconfirm" className="form-control" />
						<label className="login-field-icon fui-lock"></label>
					</div>

					<button className="btn btn-primary btn-block" type="submit">注册</button>			

				</form>
			</div>

		);
	}
});


var Login = React.createClass({
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
		var panel = this.state.showLogin ? <LoginForm /> : <SignupForm hint = {this.hint}/>;
		var main = (
				<div>
					<div className="container row-bottom">
						
						<div className="centerblock">
						<div className="btn-group">
							<button type="button" onClick={this.loginPanel} className="btn btn-primary">登录</button>
							<button type="button" onClick={this.signupPanel} className="btn btn-primary">注册</button>
						</div>
						</div>
						
					</div>

					<div className="container">
						{panel}
					</div>
				</div>
		);
		var hint = (
			<div className="container">
				<div className=" col-lg-4 col-lg-offset-4 col-md-8 col-md-offset-2 col-sm-10 col-sm-offset-1 col-xs-12">
					<p className="text-primary">注册已完成，请去邮箱激活帐户！</p>
				</div>
			</div>
			);
		return(
			<div>
				<div className="container">
					<div className="row text-center">
						<h1>审</h1>
					</div>
				</div>
				{this.state.hideHint ? main : hint}
			</div>
		);
	}
});

ReactDOM.render(<Login/>, document.getElementById("app"));
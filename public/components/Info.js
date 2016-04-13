/*导航栏组建，需要传入用户信息作为组建的状态
*/
var Navbar = React.createClass({
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
    this.setState({hasMessage:false});
    //TODO:标记信息已读
  },

  loadMessageFromServer:function(){
    $.ajax({
    url: "",//TODO:complete with the url api
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
    setInterval(this.loadCommentsFromServer,3000);
  },
  render: function() {
    var unread = this.state.hasMessage?<span className="navbar-unread">1</span>:null;

    var messages;
    if(this.state.messageList.length > 0){
        messages = this.state.messageList.map(function(message){
          var goReview = function(e){
          e.preventDefault();
          var target = "review.html?id=" + message.id.toString();
          location.href=target;

        };
          return (
              <li><a onClick={goReview}> {message.hint}</a></li>
              
          );
        });
    } else {
        messages = <li><a>暂无消息</a></li>
    }

    return (
      <div>
      <nav className="navbar navbar-inverse navbar-fixed-top" role="navigation">
      <div className="navbar-header">
        <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#example-navbar-collapse">
          <span className="sr-only"></span>
          <span className="icon-bar"></span>
          <span className="icon-bar"></span>
          <span className="icon-bar"></span>
        </button>
        <a className="navbar-brand" href="#fake"><span className="text-primary">审</span></a>
      </div>
      <div className="collapse navbar-collapse" id="example-navbar-collapse">
        <ul className="nav navbar-nav">
          <li><a href="index.html">评审</a></li>
          <li><a href="task.html">任务</a></li>
          <li><a onClick={this.read} className="dropdown-toggle" data-toggle="dropdown">通知{unread}</a>
              <ul className="dropdown-menu">
                {messages}
              </ul>
          </li>
          <li className="dropdown">
            <a className="dropdown-toggle" data-toggle="dropdown">
               {this.props.profile.name}<b className="caret"></b>
            </a>
            <ul className="dropdown-menu">
               <li><a href="contact.html">联系人</a></li>
               <li><a href="info.html">账号信息</a></li>
            </ul>
         </li>
      </ul>
      </div>
    </nav>
    </div>
    );
  }
});
/* 信息编辑面板，可以修改必要的个人信息*/
var EditPanel = React.createClass({
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
        if (op==this.props.profile.password){
          if(np==cp){
            newProfile.password = np;
            this.props.updateProfile(newProfile);
            this.refs.op.value = "";
            this.refs.np.value = "";
            this.refs.cp.value = "";
            var newState = this.state.inputState;
            newState.op = "form-group has-success";
            newState.np = "form-group has-success";
            newState.opHolder = "密码修改成功";
            newState.cpHolder = "";
            this.setState({inputState:newState});
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
        } else { //wrong password
          var newState = this.state.inputState;
          newState.op = "form-group has-error";
          this.refs.op.value = "";
          newState.opHolder = "原密码输入错误！";
          this.setState({inputState:newState});
        }
      }
  },
  handleChange:function(event){
    this.setState({value: event.target.value});
  },
  render:function(){
    return(
      <div className="container">
      <div className="jumbotron">
      <form className="form-horizontal" onSubmit={this.updateInfo}>

        <div className="form-group">
          <label for="name-input" className="control-label col-sm-2 col-md-2 col-lg-2">昵称</label>
          <div className="col-sm-8 col-md-8 col-lg-8">
            <input type="text" className="form-control" ref="name" value={this.state.name} onchange={this.handleChange}/>
          </div>
        </div>

        <div className="form-group">
          <label className="control-label col-sm-2 col-md-2 col-lg-2" >邮箱</label>
          <label className="text-primary col-sm-8 col-md-8 col-lg-8" >{this.props.profile.mail}</label>
        </div>

        <div className={this.state.inputState.op}>
          <label for="op-input" className="control-label col-sm-2 col-md-2 col-lg-2">原密码</label>
          <div className="col-sm-8 col-md-8 col-lg-8">
            <input type="password" className="form-control" id="op-input" ref="op" placeholder={this.state.inputState.opHolder} />
          </div>
        </div>

        <div className={this.state.inputState.np}>
          <label for="np-input" className="control-label col-sm-2 col-md-2 col-lg-2">新密码</label>
          <div className="col-sm-8 col-md-8 col-lg-8">
            <input type="password" className="form-control" id="np-input" ref="np" />
          </div>
        </div>

        <div className={this.state.inputState.np}>
          <label for="cp-input" className="control-label col-sm-2 col-md-2 col-lg-2">确认新密码</label>
          <div className="col-sm-8 col-md-8 col-lg-8">
            <input type="password" className="form-control" id="cp-input" ref="cp"  placeholder={this.state.inputState.cpHolder} />
          </div>
        </div>

        <div className="form-group">
           <div className="col-sm-offset-2 col-md-offset-2 col-lg-offset-2 col-md-4 col-lg-2 col-sm-8">
              <button type="submit" className="btn btn-primary">确认修改</button>
            </div>
        </div>

      </form>
      </div>
      </div>
    );
  }
});

/*组装所有的组件的app*/

var InfoPage = React.createClass({
  componentDidMount: function() {
    $.ajax({
      url: "",//TODO:get customer profile url
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
           profile:{
            "id":"11111",
            "name":"屋顶上的羊驼",
            "mail":"maomao75979@gmail.com",
            "passworld":"123456",
            "group":["所有联系人","代码评审组","文档评审组","公司"]
          } 
      };
  },
  updateProfile:function(newProfile){
    //TODO:update in server
    this.setState({profile:newProfile});
  },

  render: function(){
    
    return(
      <div>
        <Navbar profile={this.state.profile} />
      <br/>
      <br/>
      <br/>
        <EditPanel profile={this.state.profile} updateProfile={this.updateProfile}/>
      </div>
    );
  }
});

ReactDOM.render(<InfoPage/>, document.getElementById("app"));


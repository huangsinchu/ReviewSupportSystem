/*导航栏组建，需要传入用户信息作为组建的状态
*/
var Navbar = React.createClass({
  getInitialState: function() {
      return {
          messageList:[
            {"url":"http://www.google.com",
            "content":"荣老师邀请你评审陆云昊的文章"},
            {"url":"http://www.google.com",
            "content":"荣老师邀请你评审陆云昊大爷的文章"}
          ]
      };
  },
  read:function(e){
    this.props.readMessage();
  },
  render: function() {
    var unread = this.props.profile.hasMessage=="true"?<span className="navbar-unread">1</span>:null;

    var messages;
    if(this.state.messageList.length > 0){
        messages = this.state.messageList.map(function(message){
          return (
              <li><a href={message.url}>{message.content}</a></li>
              
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

/*组装所有的组件的app*/

var ContactPage = React.createClass({
  readMessage:function(){
    var newProfile = this.state.profile;
    newProfile.hasMessage = false;
    this.setState({profile:newProfile});
  },

  getInitialState:function() {
      return {
           profile:{
            "name":"屋顶上的羊驼",
            "mail":"maomao75979@gmail.com",
            "hasMessage":"true"
          } 
      };
  },

  render: function(){
    
    return(
      <div>
        <Navbar profile={this.state.profile} readMessage={this.readMessage} />
      <br/>
      <br/>
       
      </div>
    );
  }
});

ReactDOM.render(<ContactPage/>, document.getElementById("app"));


/*导航栏组建，需要传入用户信息作为组建的状态
*/
var Navbar = React.createClass({
  getInitialState: function() {
      return {
          messageList:[
            {"id":"111",
            "title":"陆云昊的毕业论文",
            "url":"https://www.github.com",
            "type":"文档评审",
            "state":true,
            "content":"论文内容",
            "hint":"荣老师邀请你评审陆云昊的文章"},
            {"id":"111",
            "title":"陆云昊的毕业论文",
            "url":"https://www.github.com",
            "type":"文档评审",
            "state":true,
            "content":"论文内容",
            "hint":"荣老师邀请你评审陆云昊大爷的文章"}
          ],
          hasMessage:false

      };
  },
  read:function(e){
    this.setState({hasMessage:false});
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
          localStorage["rs_id"] = message.id.toString();
          localStorage["rs_title"] = message.title.toString();
          localStorage["rs_url"] = message.url.toString();
          localStorage["rs_type"] = message.type.toString();
          localStorage["rs_state"] = message.state.toString();
          localStorage["rs_content"] = message.content.toString();
          location.href="review.html";

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
/*组装所有的组件的app*/

var ContactPage = React.createClass({
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
            "name":"屋顶上的羊驼",
            "mail":"maomao75979@gmail.com"
          } 
      };
  },

  render: function(){
    
    return(
      <div>
        <Navbar profile={this.state.profile} />
      <br/>
      <br/>
       
      </div>
    );
  }
});

ReactDOM.render(<ContactPage/>, document.getElementById("app"));


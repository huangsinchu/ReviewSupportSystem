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

/*联系人组中的某一行，可删除的行*/
var DBranch = React.createClass({
  delete:function(e){
    e.preventDefault();
    this.props.deleteContact(this.props.mail);
  },
  render:function(){
    return(
      <li><span ref="mail" value={this.props.mail}>{this.props.mail}</span><a onClick={this.delete}>删除</a></li>
    );
  }
});

/*一个联系人组组件*/
var TreeLine = React.createClass({
  deleteContact:function(mail){
    this.props.deleteContact(mail);
  },
  render:function(){
    var children = [];
    for(var i = 0;i < this.props.content.length; i++){
      var child = this.props.line=="所有联系人"?<DBranch mail={this.props.content[i]} deleteContact={this.deleteContact} />:<li><span>{this.props.content[i]}</span></li>;
      children.push(child);
    }
    return(
      
      <li>
        <span>{this.props.line}</span>
        <ul>
        {children}
        </ul>
      </li>
    );
  }
});

/*联系人编辑面板*/
var ContactPanel = React.createClass({
  search:function(e){
    e.preventDefault();

  },
  deleteContact:function(mail){
    this.props.deleteContact(mail);
  },
  render:function(){
    var list = [];
    for(var key in this.props.contactors){
      var temp = <TreeLine line={key} content={this.props.contactors[key]} deleteContact={this.deleteContact}/>
      list.push(temp);
    }
    return(
    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 ">
      <form className="form" onSubmit={this.search}>
        <div className="input-group">
          <input type="mail" className="form-control" placeholder="请输入联系人的邮箱" ref="mail" /> 
          <span className="input-group-btn">
            <button type="submit" className="btn btn-default">搜索</button>
          </span>
        </div>
      </form >
      <hr />
      <div className="tree well">
        <ul>
        {list}
        </ul>
      </div>

    </div>
    );
  }
});


/*组编辑面板*/
var GroupPanel = React.createClass({
  componentDidMount:function() {
    $(".tagsinput").tagsinput();  
  },
  updateGroup:function(e){
    e.preventDefault();
    var groups = this.refs.groups.value.trim();
    this.props.updateGroupInServer("所有联系人,"+groups);

  },

  render:function(){
    var groups = this.props.group.concat([]);
    groups.shift();
    var groupStr = "";
    for(var i =0; i < groups.length; i++){
      groupStr += groups[i] + ",";
    } 
    return(
      <div className="container">
        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
        <h3>编辑分组</h3>
        <form onSubmit={this.updateGroup}>
          <div className="tagsinput-primary">
            <input className="tagsinput" ref="groups" value={groupStr} />
          </div>
          <button type="submit" className="btn btn-primary">更新分组</button>
        </form>
        </div>
      </div>
    );
  }
});

/*组装所有的组件的app*/

var ContactPage = React.createClass({
  
  getInitialState:function() {
      return {
           profile:{
            "id":"11111",
            "name":"屋顶上的羊驼",
            "mail":"maomao75979@gmail.com",
            "passworld":"123456",
            "group":["所有联系人","代码评审组","文档评审组","公司","学校"]
          },
          contactors:{
            "所有联系人":["a@gmail.com","b@gmail.com","c@gmail.com","d@gmail.com","e@gmail.com","f@gmail.com","g@gmail.com","h@gmail.com","i@gmail.com","j@gmail.com","k@gmail.com","l@gmail.com"],
            "文档评审组":["a@gmail.com","b@gmail.com","c@gmail.com","d@gmail.com","e@gmail.com"],
            "代码评审组":["d@gmail.com","e@gmail.com","f@gmail.com","g@gmail.com","h@gmail.com"],
            "公司":["f@gmail.com","g@gmail.com","h@gmail.com","i@gmail.com"],
            "学校":["i@gmail.com","j@gmail.com","k@gmail.com","l@gmail.com"]
          }
      };
  },
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
    $.ajax({
      url: "",//TODO:get customer profile url
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
    //TODO:服务器删除联系人，将某个用户所有组中的这个联系人删除
  },

  render: function(){
    
    return(
      <div>
        <Navbar profile={this.state.profile} />
        <br/>
        <br/>
        <div className="container">
          <ContactPanel deleteContact={this.deleteContact} contactors={this.state.contactors} />
        </div>
        <hr/>
        <GroupPanel group={this.state.profile.group} updateGroupInServer={this.updateGroupInServer}/>
       
      </div>
    );
  }
});

ReactDOM.render(<ContactPage/>, document.getElementById("app"));


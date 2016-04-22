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
  logOut:function(e){
    Session['logged_mail'] = null;
    href.location = "login.html";
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
               <li><a href="#" onClick={this.logOut}>账号信息</a></li>
            </ul>
         </li>
      </ul>
      </div>
    </nav>
    </div>
    );
  }
});
/*单个任务组件*/
var Task = React.createClass({
  componentDidMount:function() {
    $(this.refs.tooltip).tooltip();
  },
  review:function(e){
      e.preventDefault();
      var taget = "review.html?id=" + this.props.task.id.toString();
      location.href=taget;
  },

  render:function(){
    var state = this.props.task.type+"----"+(this.props.task.state?"评审中":"评审结束");
    var colorHead = this.props.task.state?"palette palette-peter-river shadow":"palette palette-concrete shadow";
    var colorTail = this.props.task.state?"palette palette-belize-hole shadow":"palette palette-silver shadow";
    var button = this.props.task.state?<button onClick={this.review} className="btn btn-primary">进入评审</button>:<button onClick={this.review} className="btn btn-primary">查看纪录</button>;
    var text = this.props.task.content;
    if (text.length>17){
      var shortText = text.substr(0,17)+"...";  
    } else if(text.length<17) {
      var shortText = text;
    } else {
      var shortText = text; 
    }
    
    return (
      <div className="col-lg-3 col-md-6 col-sm-12 row-bottom">
        <dl className={colorHead}>
            <dt>{this.props.task.title}</dt>
            <dd><a className="text-success" href={this.props.task.url}>内容地址</a></dd>
        </dl>
        <dl className={colorTail}>
          <dt className="text-primary">{state}</dt>
          <dd data-toggle="tooltip" ref="tooltip" data-placement="bottom" title={text}>{shortText}</dd>
        </dl>
        <dl className={colorTail}>
          <dd>{button}</dd>
        </dl>
      </div>        
    );
  }
});


/*任务列表组件，由多个人物组件组成*/
var TaskList = React.createClass({

  getInitialState:function(){
      return {
          taskList:[
          {"id":"111",
           "title":"陆云昊的毕业论文",
           "url":"https://www.github.com",
           "type":"文档评审",
           "state":true,
           "content":"论文内容"
          },
          {"id":"112",
            "title":"陆云昊的毕业论文",
           "url":"https://www.github.com",
           "type":"文档评审",
           "state":false,
           "content":"论文内容包含对中国dota的局势分析，请仔细评审。"
          },
          {"id":"113",
            "title":"陆云昊的毕业论文",
           "url":"https://www.github.com",
           "type":"文档评审",
           "state":true,
           "content":"论文内容包含对中国dota的局势分析，请仔细评审。"
          },
          {"id":"114",
            "title":"陆云昊的毕业论文",
           "url":"https://www.github.com",
           "type":"文档评审",
           "state":false,
           "content":"论文内容包含对中国dota的局势分析，请仔细评审。"
          },
          {"id":"115",
            "title":"陆云昊的毕业论文",
           "url":"https://www.github.com",
           "type":"代码评审",
           "state":true,
           "content":"论文内容包含对中国dota的局势分析，请仔细评审。论文内容包含对中国dota的局势分析，请仔细评审。论文内容包含对中国dota的局势分析，请仔细评审。"
          },
          {"id":"116",
            "title":"陆云昊的毕业论文",
           "url":"https://www.github.com",
           "type":"文档评审",
           "state":false,
           "content":"论文内容包含对中国dota的局势分析，请仔细评审。"
          },
          {"id":"117",
            "title":"陆云昊的毕业论文",
           "url":"https://www.github.com",
           "type":"文档评审",
           "state":true,
           "content":"论文内容包含对中国dota的局势分析，请仔细评审。"
          }
          ],
          showList:[
          {"id":"111",
           "title":"陆云昊的毕业论文",
           "url":"https://www.github.com",
           "type":"文档评审",
           "state":true,
           "content":"论文内容"
          },
          {"id":"112",
            "title":"陆云昊的毕业论文",
           "url":"https://www.github.com",
           "type":"文档评审",
           "state":false,
           "content":"论文内容包含对中国dota的局势分析，请仔细评审。"
          },
          {"id":"113",
            "title":"陆云昊的毕业论文",
           "url":"https://www.github.com",
           "type":"文档评审",
           "state":true,
           "content":"论文内容包含对中国dota的局势分析，请仔细评审。"
          },
          {"id":"114",
            "title":"陆云昊的毕业论文",
           "url":"https://www.github.com",
           "type":"文档评审",
           "state":false,
           "content":"论文内容包含对中国dota的局势分析，请仔细评审。"
          },
          {"id":"115",
            "title":"陆云昊的毕业论文",
           "url":"https://www.github.com",
           "type":"文档评审",
           "state":true,
           "content":"论文内容包含对中国dota的局势分析，请仔细评审。论文内容包含对中国dota的局势分析，请仔细评审。论文内容包含对中国dota的局势分析，请仔细评审。"
          },
          {"id":"116",
            "title":"陆云昊的毕业论文",
           "url":"https://www.github.com",
           "type":"文档评审",
           "state":false,
           "content":"论文内容包含对中国dota的局势分析，请仔细评审。"
          },
          {"id":"117",
            "title":"陆云昊的毕业论文",
           "url":"https://www.github.com",
           "type":"文档评审",
           "state":true,
           "content":"论文内容包含对中国dota的局势分析，请仔细评审。"
          }
          ]
        };
  },
  componentDidMount: function() {
    $.ajax({
      url: "./php/task.php",//TODO:get customer profile url
      dataType: 'json',
      cache: false,
      success: function(data) {
        this.setState({taskList: data,showList:data});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error("", status, err.toString());//TODO:as same as above
      }.bind(this)
    });
    $(this.refs.filter).radiocheck();
  },

  filter:function(e){

    var ifFilter = this.refs.filter.checked;

    if (ifFilter) {
      var tasks = this.state.showList;
      var filtered = [];
      for (var i = 0; i < tasks.length; i++) {
        if (tasks[i].state){
          filtered.push(tasks[i]);
        }
      }
      this.setState({showList:filtered});
    } else {
      var preList = this.state.taskList;
      this.setState({showList:preList});
    }

  },

  render:function(){

    var Tasks = this.state.showList.map(function(t){
        return (
          <Task task={t} />
        );
    });
    return(
      <div className="container">   
        <div className="row">
          <div className=" col-lg-3 col-md-6 col-sm-10 col-xs-10">
          <label className="checkbox text-primary" for="filter">
            <input type="checkbox" ref="filter" onChange={this.filter} data-toggle="checkbox"/>
            只显示正在进行的评审
          </label>
          </div>
        </div>   
        <hr/>   
        <div className="row">           
          {Tasks}    
        </div>
      </div>
    );
  }
});

/*组装所有的组件的app*/

var TaskPage = React.createClass({
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

  render: function(){
    
    return(
      <div>
        <Navbar profile={this.state.profile}/>
      <br/>
      <br/>
        <TaskList />
      </div>
    );
  }
});

ReactDOM.render(<TaskPage/>, document.getElementById("app"));


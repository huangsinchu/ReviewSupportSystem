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

/*单个任务组件*/
var Task = React.createClass({
  componentDidMount:function() {
    $('[data-toggle="tooltip"]').tooltip();

  },
  render:function(){
    var state = this.props.task.type+"----"+(this.props.task.state?"评审中":"评审结束");
    var colorHead = this.props.task.state?"palette palette-peter-river":"palette palette-concrete";
    var colorTail = this.props.task.state?"palette palette-belize-hole":"palette palette-silver";
    var button = this.props.task.state?<button onClick="" className="btn btn-primary">进入评审</button>:<button onClick="" className="btn btn-primary">查看纪录</button>;
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
          <dd data-toggle="tooltip" data-placement="bottom" title={text}>{shortText}</dd>
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

  componentDidMount:function() {
    $('[data-toggle="checkbox"]').radiocheck();
  },

  filter:function(e){

    var ifFilter = $("#filter").is(":checked");

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
          <div className="col-offset-1">
            <label className="checkbox" for="filter">
              <input type="checkbox" value="doing" id="filter" ref="filter" onClick={this.filter} data-toggle="checkbox"/>
              只显示正在进行的评审
            </label>
          </div>
          <hr/>
          {Tasks}    
        </div>
      </div>
    );
  }
});

/*组装所有的组件的app*/

var TaskPage = React.createClass({
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
        <Navbar profile={this.state.profile} readMessage={this.readMessage}/>
      <br/>
      <br/>
        <TaskList />
      </div>
    );
  }
});

ReactDOM.render(<TaskPage/>, document.getElementById("app"));


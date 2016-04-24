/*导航栏组建，需要传入用户信息作为组建的状态
*/
var Navbar = React.createClass({displayName: "Navbar",
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
/*单个任务组件*/
var Task = React.createClass({displayName: "Task",
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
    var button = this.props.task.state?React.createElement("button", {onClick: this.review, className: "btn btn-primary"}, "进入评审"):React.createElement("button", {onClick: this.review, className: "btn btn-primary"}, "查看纪录");
    var text = this.props.task.content;
    if (text.length>17){
      var shortText = text.substr(0,17)+"...";  
    } else if(text.length<17) {
      var shortText = text;
    } else {
      var shortText = text; 
    }
    
    return (
      React.createElement("div", {className: "col-lg-3 col-md-6 col-sm-12 row-bottom"}, 
        React.createElement("dl", {className: colorHead}, 
            React.createElement("dt", null, this.props.task.title), 
            React.createElement("dd", null, React.createElement("a", {className: "text-success", href: this.props.task.url}, "内容地址"))
        ), 
        React.createElement("dl", {className: colorTail}, 
          React.createElement("dt", {className: "text-primary"}, state), 
          React.createElement("dd", {"data-toggle": "tooltip", ref: "tooltip", "data-placement": "bottom", title: text}, shortText)
        ), 
        React.createElement("dl", {className: colorTail}, 
          React.createElement("dd", null, button)
        )
      )        
    );
  }
});


/*任务列表组件，由多个人物组件组成*/
var TaskList = React.createClass({displayName: "TaskList",

  getInitialState:function(){
      return {
          taskList:[],
          showList:[]
        };
  },
  componentWillMount: function() {
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
          React.createElement(Task, {task: t})
        );
    });
    return(
      React.createElement("div", {className: "container"}, 
        React.createElement("div", {className: "row"}, 
          React.createElement("div", {className: " col-lg-3 col-md-6 col-sm-10 col-xs-10"}, 
          React.createElement("label", {className: "checkbox text-primary", for: "filter"}, 
            React.createElement("input", {type: "checkbox", ref: "filter", onChange: this.filter, "data-toggle": "checkbox"}), 
            "只显示正在进行的评审"
          )
          )
        ), 
        React.createElement("hr", null), 
        React.createElement("div", {className: "row"}, 
          Tasks
        )
      )
    );
  }
});

/*组装所有的组件的app*/

var TaskPage = React.createClass({displayName: "TaskPage",
 componentWillMount: function() {
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
            
          } 
      };
  },

  render: function(){
    
    return(
      React.createElement("div", null, 
        React.createElement(Navbar, {profile: this.state.profile}), 
      React.createElement("br", null), 
      React.createElement("br", null), 
        React.createElement(TaskList, null)
      )
    );
  }
});

ReactDOM.render(React.createElement(TaskPage, null), document.getElementById("app"));


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

/*任务描述信息*/
var TaskDescription = React.createClass({
    render:function(){
      var state = this.props.state=="true"?"评审中":"评审结束";
      return(
        <div className="tile col-lg-10 col-md-10 col-sm-12 col-lg-offset-1 col-md-offset-1 shadow">
          <div className="row">
            <label className="col-lg-2 col-md-2 col-sm-3 col-xs-3">名称:</label>
            <label className="col-lg-10 col-md-10 col-sm-9 col-xs-9 text-primary text-left">{this.props.title}</label>
          </div>

          <div className="row">
            <label className="col-lg-2 col-md-2 col-sm-3 col-xs-3">地址:</label>
            <a className="col-lg-10 col-md-10 col-sm-9 col-xs-9 text-primary text-left" href={this.props.url} target="_blank">{this.props.url}</a>
          </div>

          <div className="row">
            <label className="col-lg-2 col-md-2 col-sm-3 col-xs-3">类型:</label>
            <label className="col-lg-10 col-md-10 col-xs-9 col-sm-9 text-primary text-left">{this.props.type}</label>
          </div>

          <div className="row">
            <label className="col-lg-2 col-md-2 col-sm-3 col-xs-3">状态:</label>
            <label className="col-lg-10 col-md-10 col-sm-9 col-xs-9 text-primary text-left">{state}</label>
          </div>

          <div className="row">
            <label className="col-lg-2 col-md-2 col-sm-3 col-xs-3">描述:</label>
            <p className="col-lg-10 col-md-10 col-sm-9 col-xs-9 text-primary text-left">{this.props.content}</p>
          </div>
        </div>
      );
    }
});

/*评审展示模块*/
var Review = React.createClass({
  render:function(){
    var doc = <div><span>第{this.props.review.page}页</span><br/><span>第{this.props.review.row}行</span></div>;
    var code = <div><span>{this.props.review.page}</span><br/><span>第{this.props.review.row}行</span></div>;
    var location = this.props.type=="文档评审"?doc:code;
    return(
        <div className="col-lg-10 col-md-10 col-sm-12 col-xs-12 col-lg-offset-1 col-md-offset-1 row-bottom">
          <div className="row divline shadow">
            <div className="divhead col-lg-2 col-md-2 col-sm-2 col-xs-12" >
              {location}
            </div>

            <div className="divbody col-lg-10 col-md-10 col-sm-10 col-xs-12">
              <p>{this.props.review.content}</p>
            </div>
          </div>
        </div>
    );
  }
});

/*评审编写模块*/
var ReviewWriter = React.createClass({
  getInitialState:function() {
      return {
        pageClass:"input-group row-bottom",
        pageHolder:"",
        rowClass:"input-group row-bottom",
        rowHolder:""
      };
  },
  submitReview:function(e){
    e.preventDefault();
    var page = this.refs.page.value.trim();
    var row = this.refs.row.value.trim();
    var content = this.refs.content.value;
    if(!page||!row||!content){
      return;
    }
    var reg = /^[0-9]*[1-9][0-9]*$/;
    if(this.props.type=="文档评审"){
      if(reg.test(page)){
        if(reg.test(row)){
          var review = {"page":page,"row":row,"content":content};
          this.refs.page.value = "";
          this.refs.row.value = "";
          this.refs.content.value = "";
          this.setState({pageClass:"input-group row-bottom",pageHolder:"",rowClass:"input-group row-bottom",rowHolder:""});

          this.props.addReview(review);
        } else {
          var errorRow = "input-group row-bottom has-error";
          var errorHolder = "文档行数格式错误！";
          this.refs.row.value = "";
          this.setState({pageClass:"input-group row-bottom",pageHolder:"",rowClass:errorRow,rowHolder:errorHolder});
        }
      } else {
        var errorPage = "input-group row-bottom has-error";
        var errorHolder = "文档页数格式错误！";
        this.refs.page.value = "";
        this.setState({pageClass:errorPage,pageHolder:errorHolder});
      }
    } else {
      if(reg.test(row)){
        var review = {"page":page,"row":row,"content":content};
        this.refs.page.value = "";
        this.refs.row.value = "";
        this.refs.content.value = "";
        this.setState({rowClass:"input-group row-bottom",rowHolder:""});

        this.props.addReview(review);
      } else {
        var errorRow = "input-group row-bottom has-error";
        var errorHolder = "文档行数格式错误！";
        this.refs.row.value = "";
        this.setState({pageClass:"input-group row-bottom",pageHolder:"",rowClass:errorRow,rowHolder:errorHolder});
      }
    }

  },
  render:function(){
    var page = this.props.type=="文档评审"?<div className={this.state.pageClass}><div className="input-group-addon">第</div><input type="text" ref="page" className="form-control" placeholder={this.state.pageHolder} /><div className="input-group-addon">页</div></div>:<div className="input-group row-bottom"><div className="input-group-addon">文件名</div><input type="text" ref="page" className="form-control" /></div>;
    return(
      <div className="tile col-lg-10 col-md-10 col-sm-10 col-lg-offset-1 col-md-offset-1 col-sm-offset-1">
        <form onSubmit={this.submitReview}>
          {page}
          <div className={this.state.rowClass}>
            <div className="input-group-addon">第</div>
            <input type="text" ref="row" className="form-control" placeholder={this.state.rowHolder} />
            <div className="input-group-addon">行</div>
          </div>
          <div className="form-group">
            <textarea className="form-control" rows="3" placeholder="评审内容" ref="content"></textarea>
          </div>
          <button className="btn btn-block btn-primary" type="submit">提交</button>
        </form>
      </div>

    );
  }
});

/*评审展示和编辑的结合模块，掌握状态信息*/
var ReviewPanel = React.createClass({
  addReview:function(review){
    var freshList = this.state.reviewList;
    freshList.push(review);
    this.setState({reviewList:freshList});

    review.writer = this.props.id;
    review.task = this.props.task;
    
    //TODO:submit to server
  },
  getInitialState:function() {
      return {
        reviewList:[
          {
            "page":"5",
            "row":"9",
            "content":"文档写道“某些情况下b神可以带领队友走向胜利”，其中“某些”使用不准确，没有指出具体情况"
          },
          {
            "page":"5",
            "row":"11",
            "content":"文档写道“某些情况下b神可以带领队友走向胜利”，其中“某些”使用不准确，没有指出具体情况,打开房间阿斯利康大家立刻精神的快乐都是减肥了科技发达时考虑范式大积分卡上就打开了房间里看圣诞节啊风口浪尖阿斯顿了房间里撒打开进风口拉萨的建立开放式的拉开将"
          },
          {
            "page":"5",
            "row":"25",
            "content":"文档写道“某些情况下b神可以带领队友走向胜利”，其中“某些”使用不准确，没有指出具体情况"
          },
          {
            "page":"6",
            "row":"9",
            "content":"文档写道“某些情况下b神可以带领队友走向胜利”，其中“某些”使用不准确，没有指出具体情况"
          },
          {
            "page":"7",
            "row":"9",
            "content":"文档写道“某些情况下b神可以带领队友走向胜利”，其中“某些”使用不准确，没有指出具体情况"
          },
          {
            "page":"8",
            "row":"9",
            "content":"文档写道“某些情况下b神可以带领队友走向胜利”，其中“某些”使用不准确，没有指出具体情况"
          }
        ]
      };
  },
  componentDidMount: function() {
    $.ajax({
      url: "",//TODO:get customer profile url
      dataType: 'json',
      cache: false,
      success: function(data) {
        this.setState({reviewList: data});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error("", status, err.toString());//TODO:as same as above
      }.bind(this)
    });
  },
  render:function(){
    if(this.props.type=="文档评审"){       
      var reviews = this.state.reviewList.map(function(review){
        return(
          <Review type="文档评审" review={review} />
        );
      });
    } else {
      var reviews = this.state.reviewList.map(function(review){
        return(
          <Review type="代码评审" review={review} />
        );
      });
    }
    var writer = this.props.state=="true"?<ReviewWriter type={this.props.type} addReview={this.addReview}/>:null;

    return(
      <div className="container">
        {reviews}
        {writer}
      </div>
    );
  }
});

/*组装所有的组件的reviewpage*/
var ReviewPage = React.createClass({
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


  render: function(){
    var id = localStorage["rs_id"];
    var title = localStorage["rs_title"];
    var url = localStorage["rs_url"];
    var type = localStorage["rs_type"];
    var state = localStorage["rs_state"];
    var content = localStorage["rs_content"];
    
    // localStorage.removeItem("rs_id");
    // localStorage.removeItem("rs_url");
    // localStorage.removeItem("rs_type");
    // localStorage.removeItem("rs_title");
    // localStorage.removeItem("rs_state");
    // localStorage.removeItem("rs_content");
    return(
      <div>
        <Navbar profile={this.state.profile}/>
        <br/>
        <br/>
        <div className="container">
        <TaskDescription title={title} url={url} type={type} state={state} content={content} />
        </div>
        <ReviewPanel type={type} state={state} id={this.state.profile.id} task={id} />
      </div>
    );
  }
});

ReactDOM.render(<ReviewPage/>, document.getElementById("app"));
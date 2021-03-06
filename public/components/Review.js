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
               <li><a href="#" onClick={this.logOut}>退出</a></li>
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
      var state = this.props.state?"评审中":"评审结束";
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
  editReview:function(){
    this.props.editReview(this.props.review.id);
  },
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

            <div className="divbody col-lg-9 col-md-9 col-sm-9 col-xs-12">
              <p>{this.props.review.content}</p>
            </div>

            <div className="divact col-lg-1 col-md-1 col-sm-1 col-xs-12 text-center" onClick={this.editReview}>
              编辑
            </div>

          </div>
        </div>
    );
  }
});

/*评审编辑模态框*/
var ReviewEditModal = React.createClass({
  componentDidMount:function(){
      $(this.refs.modal).modal('show');
      $(this.refs.modal).on('hidden.bs.modal', this.props.handleHideModal);
  },
  confirmEdition:function(){
    var content = this.refs.content.value.trim();
    if(!content){
      return;
    }
    this.props.confirmEdition(this.props.review.id,content);
    $(this.refs.modal).modal('toggle');
  },
  render:function(){
    return (
      <div ref="modal" className="modal fade" tabIndex="-1" role="dialog">
      <div className="modal-dialog modal-lg">
        <div className="modal-content">
          <div className="modal-header">
            <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
            <h4 className="modal-title" id="gridSystemModalLabel">编辑</h4>
          </div>
          <div className="modal-body">
            <form className="form-horizontal">
              <div className="form-group">
                <textarea ref="content" rows="3" className="form-control" defaultValue={this.props.review.content}>
                </textarea>
              </div>
              <div className="form-group">
                <button type="button" onClick={this.confirmEdition} className="btn btn-primary">确认编辑</button>
              </div>
            </form>
          </div>
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
      <div className="tile col-lg-10 col-md-10 col-sm-12 col-lg-offset-1 col-md-offset-1">
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
  getInitialState:function() {
      return {
        reviewList:[
          {
            "id":"1111",
            "page":"5",
            "row":"9",
            "content":"文档写道“某些情况下b神可以带领队友走向胜利”，其中“某些”使用不准确，没有指出具体情况"
          },
          {
            "id":"1112",
            "page":"5",
            "row":"11",
            "content":"文档写道“某些情况下b神可以带领队友走向胜利”，其中“某些”使用不准确，没有指出具体情况,打开房间阿斯利康大家立刻精神的快乐都是减肥了科技发达时考虑范式大积分卡上就打开了房间里看圣诞节啊风口浪尖阿斯顿了房间里撒打开进风口拉萨的建立开放式的拉开将"
          },
          { 
            "id":"1113",
            "page":"5",
            "row":"25",
            "content":"文档写道“某些情况下b神可以带领队友走向胜利”，其中“某些”使用不准确，没有指出具体情况"
          },
          {
            "id":"1114",
            "page":"6",
            "row":"9",
            "content":"文档写道“某些情况下b神可以带领队友走向胜利”，其中“某些”使用不准确，没有指出具体情况"
          },
          {
            "id":"1115",
            "page":"7",
            "row":"9",
            "content":"文档写道“某些情况下b神可以带领队友走向胜利”，其中“某些”使用不准确，没有指出具体情况"
          },
          {
            "id":"1116",
            "page":"8",
            "row":"9",
            "content":"文档写道“某些情况下b神可以带领队友走向胜利”，其中“某些”使用不准确，没有指出具体情况"
          }
        ],
        showModal:false,
        review:{}
      };
  },
  componentDidMount: function() {
	var query = location.search.substring(1);
    var id = query.split("=")[1];
	
    $.ajax({
      url: "./php/deficiencylist.php?type=review&id="+id,//TODO:get customer profile url
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
  addReview:function(review){
    var freshList = this.state.reviewList;

    review.writer = this.props.id;
    review.task = this.props.task;
    $.ajax({  
		type : "post",  
		url : "./php/adddeficiency.php",  
		data : review,  
		async : false,  
		success : function(data){
			//status = data;
		}
	}); 
    //TODO:submit to server
    freshList.push(review);
    this.setState({reviewList:freshList});
  },
  handleHideModal:function(){
    this.setState({showModal:false});
  },
  handleShowModal:function(){
    this.setState({showModal:true});
  },
  editReview:function(id){
    for(var i = 0;i < this.state.reviewList.length; i++){
      if(this.state.reviewList[i].id == id ){
        this.setState({review:this.state.reviewList[i]});
        break;
      }
    }
    this.handleShowModal();
  },
  confirmEdition:function(id,content){
    var updated = JSON.parse(JSON.stringify(this.state.reviewList));
    for(var i =0;i < updated.length; i++){
      if(updated[i].id == id){
        updated[i].content = content;
        this.setState({reviewList:updated});
        break;
      }
    }
    $.ajax({
		type : "post",  
		url : "./php/updatedeficiency.php",  
		data : {id:id, content:content},  
		async : false,  
		success : function(data){
			//status = data;
		}
	});
  },
  render:function(){
    var reviews = [];
    for(var i = 0;i < this.state.reviewList.length;i++){
      var temp = <Review type={this.props.type} review={this.state.reviewList[i]} editReview={this.editReview} />;
      reviews.push(temp);
    }
    var writer = this.props.state?<ReviewWriter type={this.props.type} addReview={this.addReview}/>:null;

    return(
      <div className="container">
        {reviews}
        {writer}
        {this.state.showModal?<ReviewEditModal confirmEdition={this.confirmEdition}
             review={this.state.review} handleHideModal={this.handleHideModal} />:null}
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
          },
          review:{
            "id":"112",
           "title":"陆云昊的毕业论文",
           "url":"https://www.github.com",
           "type":"文档评审",
           "state":true,
           "content":"论文内容包含对中国dota的局势分析，请仔细评审。"
          }
      };
  },
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
	
	var id;
	var reg = new RegExp("(^|&)id=([^&]*)(&|$)");
	var r = window.location.search.substr(1).match(reg);
    if (r != null) id= unescape(r[2]);
	
    
    //TODO:根据id获取review数据
	$.ajax({
      url: "./php/review.php?id="+id,//TODO:get customer profile url
      dataType: 'json',
      cache: false,
      success: function(data) {
        this.setState({review: data});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error("", status, err.toString());//TODO:as same as above
		//window.location.href="./index.html";
      }.bind(this)
    });
  },


  render: function(){
    var id = this.state.review.id;
    var title = this.state.review.title;
    var url = this.state.review.url;
    var type = this.state.review.type;
    var state = this.state.review.state;
    var content = this.state.review.content;
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
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

/*用于展示评审计划的展示框组件*/

 var ReviewPlan = React.createClass({
  componentDidMount: function() {
    $('[data-toggle="tooltip"]').tooltip();
  },
  edit:function(){
    var id = "#"+this.props.reviewPlan.id;
    console.log(id);
    $(id).modal("toggle");
  },
  render: function(){
  	var id = "#"+this.props.reviewPlan.id;
    var state = this.props.reviewPlan.type+"----"+this.props.reviewPlan.target+"----"+(this.props.reviewPlan.state?"评审中":"评审结束");
    var colorHead = this.props.reviewPlan.state?"palette palette-peter-river shadow":"palette palette-concrete shadow";
    var colorTail = this.props.reviewPlan.state?"palette palette-belize-hole shadow":"palette palette-silver shadow";
    var text = this.props.reviewPlan.content;
    if (text.length > 17){
      var shortText = text.substr(0,17)+"...";  
    } else if(text.length < 17) {
      var shortText = text;
    } else {
      var shortText = text; 
    }
    var disabled = this.props.reviewPlan.state?"disabled":null;
    
    return(
        <div className="col-lg-3 col-md-6 col-sm-12 row-bottom">
            <dl className={colorHead}>
                <dt>{this.props.reviewPlan.title}</dt>
                <dd><a className="text-success" href={this.props.reviewPlan.url}>内容地址</a></dd>
              </dl>
              <dl className={colorTail}>
                <dt className="text-primary">{state}</dt>
                <dd data-toggle="tooltip" data-placement="bottom" title={text}>{shortText}</dd>
              </dl>
              <dl className={colorTail}>
                <dd>
                <div className="btn-group" role="group">
                  <button className="btn btn-primary" type="button" onClick={this.edit}>编辑</button>
                  <button className="btn btn-info" type="button" disabled={disabled} onClick="">合并</button>
                  <button className="btn btn-primary" type="button" onClick="">报表</button>
                </div>
                </dd>
              </dl>
         </div>        
    );
  }
 });


 /*评审计划的输入表单*/
var ReviewPlanForm = React.createClass({
    handleSubmit:function(e){
      e.preventDefault();
      var title = this.refs.title.value.trim();
      var type = this.refs.type.value;
      var url = this.refs.url.value.trim();
      var content = this.refs.content.value.trim();
      var target = this.refs.target.value;
      
      if(!title||!url||!content){
        return;
      }
      var newplan = {title:title,type:type,url:url,content:content,target:target,state:true};
      this.props.addReviewPlan(newplan);
      this.refs.title.value = "";
      this.refs.type.value= "文档评审";
      this.refs.url.value= "";
      this.refs.content.value= "";
      this.refs.target.value= "所有联系人";
      return;
    },
    componentDidMount: function() {
       $('[data-toggle="select"]').select2();
    },

    render:function(){
      return(
        <div className="tile col-lg-6 col-md-6 col-sm-12 col-xs-12 row-bottom">
          <form onSubmit={this.handleSubmit}>
            <div className="form-group">
              <input type="text" className="form-control" placeholder="项目名称" ref="title"/>
            </div>
            <div className="form-group">
              <select className="form-control select select-primary" data-toggle="select" defaultValue="文档评审" ref="type">
                <option value="文档评审">文档评审</option>
                <option value="代码评审">代码评审</option>
              </select>
            </div> 
            <div className="form-group">
              <input type="url" className="form-control" placeholder="下载地址" ref="url"/>
            </div>
            <div className="form-group">
              <textarea className="form-control" rows="3" placeholder="内容描述" ref="content"></textarea>
            </div>  
            <div className="form-group">
              <select className="form-control select select-primary" data-toggle="select" defaultValue="所有联系人" ref="target">
                <option value="所有联系人">所有联系人</option>
                <option value="代码评审组">代码评审组</option>
                <option value="文档评审组">文档评审组</option>
                <option value="公司">公司</option>
              </select>
            </div>
            <div className="form-group">
              <button type="submit" className="btn btn-primary">生成计划</button>
            </div>         
          </form>
        </div>
      );
    }
});

/*编辑模态框*/
var EditModal = React.createClass({
  handleEdit: function(e){
    e.preventDefault();
    var id = this.props.reviewPlan.id;
    var titleKey = "title" + id;
    var typeKey = "type"+id;
    var urlKey = "url"+id;
    var contentKey = "content"+id;
    var targetKey = "target"+id;

    var title = this.refs.titleKey.value.trim();
    var type = this.refs.typeKey.value;
    var url = this.refs.urlKey.value.trim();
    var content = this.refs.contentKey.value.trim();
    var target = this.refs.targetKey.value;
    var state = $("#state-choose"+id).is(":checked");
    if(!title||!url||!content){
        return;
    }
    var newplan = {id:id,title:title,type:type,url:url,content:content,target:target,state:state};
    
    this.props.updateReviewPlan(newplan);
  },
  componentDidMount: function() {
    console.log(this.props.reviewPlan.id);
    $('[data-toggle="select"]').select2();
    $('[data-toggle="switch"]').bootstrapSwitch();
    $('[data-toggle="tooltip"]').tooltip();
  },

	render: function(){
    var id = this.props.reviewPlan.id;
    var titleKey = "title" + id;
    var typeKey = "type"+id;
    var urlKey = "url"+id;
    var contentKey = "content"+id;
    var targetKey = "target"+id;
    var stateKey = "state-choose"+id;
    var checkBox = this.props.reviewPlan.state?<input type="checkbox" data-toggle="switch" id={stateKey} checked/>:<input type="checkbox" data-toggle="switch" id={stateKey}/>;
		return(
      	<div className="modal fade" id={this.props.reviewPlan.id} tabindex="-1" role="dialog">
  			<div className="modal-dialog modal-lg">
   				<div className="modal-content">
              <div className="modal-header">
        				<button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
        				<h4 className="modal-title" id="gridSystemModalLabel">评审计划</h4>
      				</div>
      				<div className="modal-body">
	      				<form className="form-horizontal" onSubmit={this.handleEdit}>
	      					<div className="form-group">
	      						<label for="title-input" className="col-sm-2 control-label">标题</label>
	      						<div className="col-sm-10">
	      							<input type="text" className="form-control" id="title-input" ref={titleKey} defaultValue={this.props.reviewPlan.title} />
	      						</div>
	      					</div>

	      					<div className="form-group">
	      						<label for="type-choose" className="col-sm-2 control-label">类型</label>
	      						<div className="col-sm-10">
	      							<select id="type-choose" className="form-control  select select-primary" data-toggle="select" ref={typeKey} defaultValue={this.props.reviewPlan.type} ref="target">
                						<option value="文档评审">文档评审</option>
                						<option value="代码评审">代码评审</option>
              						</select>
	      						</div>
	      					</div>

	      					<div className="form-group">
	      						<label for="url-input" className="col-sm-2 control-label">地址</label>
	      						<div className="col-sm-10">
	      							<input type="url" className="form-control" id="url-input" ref={urlKey} defaultValue={this.props.reviewPlan.url} />
	      						</div>
	      					</div>

	      					<div className="form-group">
	      						<label for="content-input" className="col-sm-2 control-label">描述</label>
	      						<div className="col-sm-10">
	      							<textarea type="text" className="form-control" id="content-input" ref={contentKey} defaultValue={this.props.reviewPlan.content}>
	      							</textarea>
	      						</div>
	      					</div>

	      					
	      					<div className="form-group">
	      						<label for="target-choose" className="col-sm-2 control-label">目标</label>
	      						<div className="col-sm-10">
	      							<select className="form-control select select-primary" id="target-choose" ref="targetKey" defaultValue={this.props.reviewPlan.target} data-toggle="select" ref="target">
	                					<option value="所有联系人">所有联系人</option>
	                					<option value="代码评审组">代码评审组</option>
	                					<option value="文档评审组">文档评审组</option>
	                					<option value="公司">公司</option>
              						</select>
	      						</div>
	      					</div>

                  <div className="form-group">
                    <label for="state-choose" className="col-sm-2 control-label">状态</label>
                    <div className="col-sm-4">
                      {checkBox}
                    </div>
                  </div>

                  <div className="form-group">
                      <div className="col-sm-offset-2 col-sm-8">
                        <button type="submit" className="btn btn-primary">确认修改</button>
                      </div>
                  </div>

	      				</form>
      				</div>
   				</div>
  			</div>
		</div>
		);
	}
});


/*评审计划列表组件，由评审计划输入框和评审展示框组成*/
var ReviewList = React.createClass({
  getInitialState: function() {
      return {
          reviewPlanList:[
          {"id":"111",
           "title":"陆云昊的毕业论文",
           "url":"https://www.github.com",
           "type":"文档评审",
           "state":true,
           "target":"文档评审组",
           "content":"论文内容"
          },
          {"id":"112",
          	"title":"陆云昊的毕业论文",
           "url":"https://www.github.com",
           "type":"文档评审",
           "state":false,
           "target":"文档评审组",
           "content":"论文内容包含对中国dota的局势分析，请仔细评审。"
          },
          {"id":"113",
          	"title":"陆云昊的毕业论文",
           "url":"https://www.github.com",
           "type":"文档评审",
           "state":true,
           "target":"文档评审组",
           "content":"论文内容包含对中国dota的局势分析，请仔细评审。"
          }
          ]
      };
  },
  loadReviewsFromServer:function(){
    $.ajax({
      url: "",//TODO:reviewPlan url
      dataType: 'json',
      cache: false,
      success: function(data) {
        this.setState({reviewPlanList: data});
      }.bind(this),
      error: function(xhr, sstatus, err) {
        //console.error("", status, err.toString());//TODO:as same as above
      }.bind(this)
    });
  },
  componentDidMount: function() {
    this.loadReviewsFromServer();
    setInterval(this.loadReviewsFromServer,1000);
  },
  addReviewPlan:function(newplan){
    var reviewPlans = this.state.reviewPlanList;
    newplan.id="1199";
    var newList = reviewPlans.concat([newplan]);
    this.setState({reviewPlanList:newList});
    //TODO:commit to server
  },
  render:function(){
      var ReviewPlans = this.state.reviewPlanList.map(function(plan){
          return(
            <ReviewPlan reviewPlan={plan}/>
          );
      });

      var updateReviewPlan = function(newplan){
        var reviewPlans = this.state.reviewPlanList;
        for(var i=0;i < reviewPlans.length;i++){
          if (reviewPlans[i].id == newplan.id) {
              reviewPlans[i] = newplan;
          }
        }
        this.setState({reviewPlanList:reviewPlans});
        //TODO:commit to server
      };

      var EditModals = this.state.reviewPlanList.map(function(plan){
          return(
          	<EditModal reviewPlan={plan} updateReviewPlan={updateReviewPlan}/>
          );
      });

      return(
        <div className="container">
          <ReviewPlanForm addReviewPlan={this.addReviewPlan} />
          <div className="row">
            {ReviewPlans}          
          </div>
          {EditModals}
        </div>
      );
  }
});



/*组装所有的组件的app*/

var App = React.createClass({

  getInitialState:function() {
      return {
           profile:{
            "name":"屋顶上的羊驼",
            "mail":"maomao75979@gmail.com"
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
    
		return(
      <div>
		    <Navbar profile={this.state.profile} />
      <br/>
      <br/>
      	<ReviewList />
      </div>
		);
	}
});

ReactDOM.render(<App/>, document.getElementById("app"));





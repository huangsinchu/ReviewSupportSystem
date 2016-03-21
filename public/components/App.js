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

/*用于展示评审计划的展示框组件*/

 var ReviewPlan = React.createClass({
  render: function(){
  	var id = "#"+this.props.reviewPlan.id;
    var state = this.props.reviewPlan.type+"----"+this.props.reviewPlan.target+"----"+(this.props.reviewPlan.state?"评审中":"评审结束");
    var colorHead = this.props.reviewPlan.state?"palette palette-peter-river":"palette palette-concrete";
    var colorTail = this.props.reviewPlan.state?"palette palette-belize-hole":"palette palette-silver";
    var text = this.props.reviewPlan.content;
    if (text.length>17){
      var shortText = text.substr(0,17)+"...";  
    } else if(text.length<17) {
      var shortText = text;
    } else {
      var shortText = text; 
    }
    
    return(
        <div className="col-lg-3 col-md-6 col-sm-12 row-bottom">
            <dl className={colorHead}>
                <dt>{this.props.reviewPlan.title}</dt>
                <dd><a className="text-success" href={this.props.reviewPlan.url}>下载地址</a></dd>
              </dl>
              <dl className={colorTail}>
                <dt className="text-primary">{state}</dt>
                <dd data-toggle="tooltip" data-placement="bottom" title={text}>{shortText}</dd>
              </dl>
              <dl className={colorTail}>
                <dd>
                <div className="btn-group" role="group">
                  <button className="btn btn-primary" type="button" data-toggle="modal" data-target={id}>编辑</button>
                  <button className="btn btn-info" type="button" onClick="{local.href=''}">合并</button>
                  <button className="btn btn-primary" type="button" onClick="{local.href=''}">报表</button>
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
      var newplan = {id:"119",title:title,type:type,url:url,content:content,target:target,state:true};
      this.props.freshReviewPlan(newplan);
      this.refs.title.value = "";
      this.refs.type.value= "文档评审";
      this.refs.url.value= "";
      this.refs.content.value= "";
      this.refs.target.value= "所有联系人";
      return;
    },
    componentDidMount: function() {
       $('[data-toggle="select"]').select2();
       $('[data-toggle="switch"]').bootstrapSwitch();
       $('[data-toggle="tooltip"]').tooltip();
    },

    render:function(){
      return(
        <div className="tile col-lg-6 col-md-12 col-sm-12 row-bottom">
          <form onSubmit={this.handleSubmit}>
            <div className="form-group">
              <input type="text" className="form-control" placeholder="项目名称" ref="title"/>
            </div>
            <div className="form-group">
              <select className="form-control select select-primary" data-toggle="select" ref="type">
                <option value="文档评审" selected>文档评审</option>
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
              <select className="form-control select select-primary" data-toggle="select" ref="target">
                <option value="所有联系人" selected>所有联系人</option>
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
    var title = this.refs.title.value.trim();
    var type = this.refs.type.value;
    var url = this.refs.url.value.trim();
    var content = this.refs.content.value.trim();
    var target = this.refs.target.value;
    var state = this.refs.state.value=="true"?true:false;
    var newplan = {id:id,title:title,type:type,url:url,content:content,target:target,state:state};
    
    this.props.freshReviewPlan(newplan);
    return;
  },

	render: function(){
    var checkBox = this.props.reviewPlan.state?<input type="checkbox" data-toggle="switch" id="state-choose" value="true" checked/>:<input type="checkbox" value="true" data-toggle="switch" id="state-choose"/>;
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
	      							<input type="text" className="form-control" id="title-input" value={this.props.reviewPlan.title} />
	      						</div>
	      					</div>

	      					<div className="form-group">
	      						<label for="type-choose" className="col-sm-2 control-label">类型</label>
	      						<div className="col-sm-10">
	      							<select id="type-choose" className="form-control  select select-primary" data-toggle="select" value={this.props.reviewPlan.type} ref="target">
                						<option value="文档评审">文档评审</option>
                						<option value="代码评审">代码评审</option>
              						</select>
	      						</div>
	      					</div>

	      					<div className="form-group">
	      						<label for="url-input" className="col-sm-2 control-label">地址</label>
	      						<div className="col-sm-10">
	      							<input type="url" className="form-control" id="url-input" value={this.props.reviewPlan.url} />
	      						</div>
	      					</div>

	      					<div className="form-group">
	      						<label for="content-input" className="col-sm-2 control-label">描述</label>
	      						<div className="col-sm-10">
	      							<textarea type="text" className="form-control" id="content-input" value={this.props.reviewPlan.content}>
	      							</textarea>
	      						</div>
	      					</div>

	      					
	      					<div className="form-group">
	      						<label for="target-choose" className="col-sm-2 control-label">目标</label>
	      						<div className="col-sm-10">
	      							<select className="form-control select select-primary" id="target-choose" value={this.props.reviewPlan.target} data-toggle="select" ref="target">
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
                        <button type="submit" className="btn btn-primary" data-dismiss="modal" aria-label="Close" aria-hidden="true">确认修改</button>
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
          },
          {"id":"114",
          	"title":"陆云昊的毕业论文",
           "url":"https://www.github.com",
           "type":"文档评审",
           "state":false,
           "target":"文档评审组",
           "content":"论文内容包含对中国dota的局势分析，请仔细评审。"
          },
          {"id":"115",
          	"title":"陆云昊的毕业论文",
           "url":"https://www.github.com",
           "type":"文档评审",
           "state":true,
           "target":"文档评审组",
           "content":"论文内容包含对中国dota的局势分析，请仔细评审。论文内容包含对中国dota的局势分析，请仔细评审。论文内容包含对中国dota的局势分析，请仔细评审。"
          },
          {"id":"116",
          	"title":"陆云昊的毕业论文",
           "url":"https://www.github.com",
           "type":"文档评审",
           "state":false,
           "target":"文档评审组",
           "content":"论文内容包含对中国dota的局势分析，请仔细评审。"
          },
          {"id":"117",
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
  addReviewPlan:function(newplan){
    var reviewPlans = this.state.reviewPlanList;
    var newReviewPlanList = [newplan].concat(reviewPlans);
    this.setState({reviewPlanList:newReviewPlanList});
    //TODO:commit to server
  },

  updateReviewPlan:function(newplan){
    var reviewPlans = this.state.reviewPlanList;
    //TODO:commit to server
    for(var i in reviewPlans){
      if (reviewPlans[i].id == newplan.id) {
          reviewPlans[i] = newplan;
      }
    }

    this.setState({reviewPlanList:reviewPlans});
  },
  
  render:function(){
      var ReviewPlans = this.state.reviewPlanList.map(function(plan){
          return(
            <ReviewPlan reviewPlan={plan}/>
          );
      });


      var EditModals = this.state.reviewPlanList.map(function(plan){
          return(
          	<EditModal reviewPlan={plan}/>
          );
      });

      return(
        <div className="container">
          <div className="row">
            <ReviewPlanForm freshReviewPlan={this.addReviewPlan} />
            {ReviewPlans}          
          </div>
          {EditModals}
        </div>
      );
  }
});



/*组装所有的组件的app*/

var App = React.createClass({
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
      	<ReviewList />
      </div>
		);
	}
});

ReactDOM.render(<App/>, document.getElementById("app"));





/*导航栏组建，需要传入用户信息作为组建的状态
*/
var Navbar = React.createClass({
  getInitialState: function() {
      return {
          profile:{
            "name":"屋顶上的羊驼",
            "hasMessage":"true"
          }  
      };
  },

  render: function() {
    var unread = this.state.profile.hasMessage=="true"?<span className="navbar-unread">1</span>:null;
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
          <li><a href="#">评审</a></li>
          <li><a href="#">任务</a></li>
          <li><a href="#">通知{unread}</a></li>
          <li className="dropdown">
            <a href="#" className="dropdown-toggle" data-toggle="dropdown">
               {this.state.profile.name}<b className="caret"></b>
            </a>
            <ul className="dropdown-menu">
               <li><a href="#">联系人</a></li>
               <li><a href="#">账号信息</a></li>
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
    var state = this.props.reviewPlan.type+"----"+this.props.reviewPlan.target+"----"+this.props.reviewPlan.state;
    var text = this.props.reviewPlan.content;
    if (text.length>30){
      var shortText = text.substr(0,30)+"...";  
    } else {
      var shortText = text;
    }
    

    return(
        <div className="col-lg-3 col-md-6 col-sm-12 row-bottom">
            <dl className="palette palette-peter-river">
                <dt>{this.props.reviewPlan.title}</dt>
                <dd><a className="text-success" href={this.props.reviewPlan.url}>下载地址</a></dd>
              </dl>
              <dl className="palette palette-belize-hole">
                <dt className="text-primary">{state}</dt>
                <dd data-toggle="tooltip" data-placement="bottom" title={text}><p>{shortText}</p></dd>
              </dl>
              <dl className="palette palette-belize-hole">
                <dd>
                <div className="btn-group" role="group">
                  <button className="btn btn-primary" type="button">编辑</button>
                  <button className="btn btn-info" type="button">合并</button>
                  <button className="btn btn-primary" type="button">报表</button>
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
      var newplan = {title:title,type:type,url:url,content:content,target:target,state:"评审中"};
      this.props.freshReviewPlan(newplan);

      this.refs.title.value ="";
      this.refs.type.value="文档评审";
      this.refs.url.value="";
      this.refs.content.value="";
      this.refs.target.value="所有联系人";
      return;

    },
    render:function(){
      return(
        <div className="tile col-lg-6 col-md-12 col-sm-12 row-bottom">
          <form onSubmit={this.handleSubmit}>
            <div className="form-group">
              <input type="text" className="form-control" placeholder="项目名称" ref="title"/>
            </div>
            <div className="form-group">
              <select className="form-control" data-toggle="select" ref="type">
                <option value="文档评审" selected>文档评审</option>
                <option value="代码评审">代码评审</option>
              </select>
            </div> 
            <div className="form-group">
              <input type="text" className="form-control" placeholder="下载地址" ref="url"/>
            </div>
            <div className="form-group">
              <textarea className="form-control" rows="8" placeholder="内容描述" ref="content"></textarea>
            </div>  
            <div className="form-group">
              <select className="form-control" data-toggle="select" ref="target">
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


/*评审计划列表组件，由评审计划输入框和评审展示框组成*/
var ReviewList = React.createClass({
  getInitialState: function() {
      return {
          reviewPlanList:[
          {"title":"陆云昊的毕业论文",
           "url":"https://www.github.com",
           "type":"文档评审",
           "state":"评审中",
           "target":"文档评审组",
           "content":"论文内容包含对中国dota的局势分析，请仔细评审。"
          },
          {"title":"陆云昊的毕业论文",
           "url":"https://www.github.com",
           "type":"文档评审",
           "state":"评审中",
           "target":"文档评审组",
           "content":"论文内容包含对中国dota的局势分析，请仔细评审。"
          },
          {"title":"陆云昊的毕业论文",
           "url":"https://www.github.com",
           "type":"文档评审",
           "state":"评审中",
           "target":"文档评审组",
           "content":"论文内容包含对中国dota的局势分析，请仔细评审。"
          },
          {"title":"陆云昊的毕业论文",
           "url":"https://www.github.com",
           "type":"文档评审",
           "state":"评审中",
           "target":"文档评审组",
           "content":"论文内容包含对中国dota的局势分析，请仔细评审。"
          },
          {"title":"陆云昊的毕业论文",
           "url":"https://www.github.com",
           "type":"文档评审",
           "state":"评审中",
           "target":"文档评审组",
           "content":"论文内容包含对中国dota的局势分析，请仔细评审。论文内容包含对中国dota的局势分析，请仔细评审。论文内容包含对中国dota的局势分析，请仔细评审。"
          },
          {"title":"陆云昊的毕业论文",
           "url":"https://www.github.com",
           "type":"文档评审",
           "state":"评审中",
           "target":"文档评审组",
           "content":"论文内容包含对中国dota的局势分析，请仔细评审。"
          },
          {"title":"陆云昊的毕业论文",
           "url":"https://www.github.com",
           "type":"文档评审",
           "state":"评审中",
           "target":"文档评审组",
           "content":"论文内容包含对中国dota的局势分析，请仔细评审。"
          }
          ]
      };
  },
  updateReviewPlan:function(newplan){
    var reviewPlans = this.state.reviewPlanList;
    var newReviewPlanList = reviewPlans.concat(newplan);
    this.setState({reviewPlanList:newReviewPlanList});
    //TODO:commit to server
  },
  
  render:function(){
      var ReviewPlans = this.state.reviewPlanList.map(function(plan){
          return(
            <ReviewPlan reviewPlan={plan} />
          );
      });
      return(
        <div className="container">
          <div className="row">
            <ReviewPlanForm freshReviewPlan={this.updateReviewPlan} />
            {ReviewPlans}
          </div>
        </div>
      );
  }
});



/*组装所有的组件的app*/

var App = React.createClass({
	render: function(){
    
		return(
      <div>
			<Navbar />
      <br/>
      <br/>
      <ReviewList />
      </div>
		);
	}
});

ReactDOM.render(<App/>, document.getElementById("app"));

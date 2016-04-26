/*导航栏组建，需要传入用户信息作为组建的状态
*/
var Navbar = React.createClass({displayName: "Navbar",
  getInitialState: function() {
      return {
          messageList:[],
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
/*用于展示评审计划的展示框组件*/

 var ReviewPlan = React.createClass({displayName: "ReviewPlan",
  edit:function(){
    this.props.editPlan(this.props.reviewPlan);
  },
  merge:function(e){
    e.preventDefault();
    var id = this.props.reviewPlan.id.toString();
    location.href="merge.html?id="+id;
  },
  report:function(e){
    e.preventDefault();
    var id = this.props.reviewPlan.id.toString();
    location.href="report.html?id="+id;
  },
  render: function(){
  	var id = "#"+this.props.reviewPlan.id;
    var state = this.props.reviewPlan.type+"----"+(this.props.reviewPlan.state?"评审中":"评审结束");
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
    console.log(text);
    return(
        React.createElement("div", {className: "col-lg-3 col-md-6 col-sm-12 row-bottom"}, 
            React.createElement("dl", {className: colorHead}, 
                React.createElement("dt", null, this.props.reviewPlan.title), 
                React.createElement("dd", null, React.createElement("a", {className: "text-success", href: this.props.reviewPlan.url}, "内容地址"))
              ), 
              React.createElement("dl", {className: colorTail}, 
                React.createElement("dt", {className: "text-primary"}, state), 
                React.createElement("dd", {id: "tooltip"}, shortText)
              ), 
              React.createElement("dl", {className: colorTail}, 
                React.createElement("dd", null, 
                React.createElement("div", {className: "btn-group", role: "group"}, 
                  React.createElement("button", {className: "btn btn-primary", type: "button", onClick: this.edit}, "编辑"), 
                  React.createElement("button", {className: "btn btn-info", type: "button", disabled: disabled, onClick: this.merge}, "合并"), 
                  React.createElement("button", {className: "btn btn-primary", type: "button", disabled: disabled, onClick: this.report}, "报表")
                )
                )
              )
         )        
    );
  }
 });


 /*评审计划的输入表单*/
var ReviewPlanForm = React.createClass({displayName: "ReviewPlanForm",
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
      var options = [];
      for(var i =0;i < this.props.group.length;i++){
        var temp = React.createElement("option", {value: this.props.group[i]}, this.props.group[i]);
        options.push(temp);
      }
      return(
        React.createElement("div", {className: "tile col-lg-6 col-md-6 col-sm-12 col-xs-12 row-bottom"}, 
          React.createElement("form", {onSubmit: this.handleSubmit}, 
            React.createElement("div", {className: "form-group"}, 
              React.createElement("input", {type: "text", className: "form-control", placeholder: "项目名称", ref: "title"})
            ), 
            React.createElement("div", {className: "form-group"}, 
              React.createElement("select", {className: "form-control select select-primary", "data-toggle": "select", defaultValue: "文档评审", ref: "type"}, 
                React.createElement("option", {value: "文档评审"}, "文档评审"), 
                React.createElement("option", {value: "代码评审"}, "代码评审")
              )
            ), 
            React.createElement("div", {className: "form-group"}, 
              React.createElement("input", {type: "url", className: "form-control", placeholder: "下载地址", ref: "url"})
            ), 
            React.createElement("div", {className: "form-group"}, 
              React.createElement("textarea", {className: "form-control", rows: "3", placeholder: "内容描述", ref: "content"})
            ), 
            React.createElement("div", {className: "form-group"}, 
              React.createElement("select", {className: "form-control select select-primary", "data-toggle": "select", defaultValue: "所有联系人", ref: "target"}, 
                options
              )
            ), 
            React.createElement("div", {className: "form-group"}, 
              React.createElement("button", {type: "submit", className: "btn btn-primary"}, "生成计划")
            )
          )
        )
      );
    }
});

/*编辑模态框*/
var EditModal = React.createClass({displayName: "EditModal",
  handleEdit: function(e){
    e.preventDefault();
    var id = this.props.reviewPlan.id;

    var title = this.refs.title.value.trim();
    var type = this.refs.type.value;
    var url = this.refs.url.value.trim();
    var content = this.refs.content.value.trim();
    var state = $(this.refs.switch).is(":checked");
    if(!title||!content){
        return;
    }
    
    var newplan = {"id":id,"title":title,"type":type,"url":url,"content":content,"state":state};
    
    this.props.updateReviewPlan(newplan);

    $(this.refs.modal).modal("toggle");
  },
  componentDidMount: function() {
    $(this.refs.modal).modal('show');
    $(this.refs.modal).on('hidden.bs.modal', this.props.handleHideModal);
    $(this.refs.type).select2();
    $(this.refs.target).select2();
    $(this.refs.switch).bootstrapSwitch();
  },

	render: function(){
    var checkBox = this.props.reviewPlan.state?React.createElement("input", {type: "checkbox", ref: "switch", "data-toggle": "switch", checked: true}):React.createElement("input", {ref: "switch", type: "checkbox", "data-toggle": "switch"});
	
    return(
      	React.createElement("div", {className: "modal fade", ref: "modal", tabIndex: "-1", role: "dialog"}, 
  			React.createElement("div", {className: "modal-dialog modal-lg"}, 
   				React.createElement("div", {className: "modal-content"}, 
              React.createElement("div", {className: "modal-header"}, 
        				React.createElement("button", {type: "button", className: "close", "data-dismiss": "modal", "aria-label": "Close"}, React.createElement("span", {"aria-hidden": "true"}, "×")), 
        				React.createElement("h4", {className: "modal-title", id: "gridSystemModalLabel"}, "评审计划")
      				), 
      				React.createElement("div", {className: "modal-body"}, 
	      				React.createElement("form", {className: "form-horizontal", onSubmit: this.handleEdit}, 
	      					React.createElement("div", {className: "form-group"}, 
	      						React.createElement("label", {for: "title-input", className: "col-sm-2 control-label"}, "标题"), 
	      						React.createElement("div", {className: "col-sm-10"}, 
	      							React.createElement("input", {type: "text", className: "form-control", id: "title-input", ref: "title", defaultValue: this.props.reviewPlan.title})
	      						)
	      					), 

	      					React.createElement("div", {className: "form-group"}, 
	      						React.createElement("label", {className: "col-sm-2 control-label"}, "类型"), 
	      						React.createElement("div", {className: "col-sm-10"}, 
	      							React.createElement("select", {className: "form-control  select select-primary", "data-toggle": "select", defaultValue: this.props.reviewPlan.type, ref: "type"}, 
                				React.createElement("option", {value: "文档评审"}, "文档评审"), 
                				React.createElement("option", {value: "代码评审"}, "代码评审")
              				)
	      						)
	      					), 

	      					React.createElement("div", {className: "form-group"}, 
	      						React.createElement("label", {for: "url-input", className: "col-sm-2 control-label"}, "地址"), 
	      						React.createElement("div", {className: "col-sm-10"}, 
	      							React.createElement("input", {type: "url", className: "form-control", id: "url-input", ref: "url", defaultValue: this.props.reviewPlan.url})
	      						)
	      					), 

	      					React.createElement("div", {className: "form-group"}, 
	      						React.createElement("label", {for: "content-input", className: "col-sm-2 control-label"}, "描述"), 
	      						React.createElement("div", {className: "col-sm-10"}, 
	      							React.createElement("textarea", {type: "text", className: "form-control", id: "content-input", ref: "content", defaultValue: this.props.reviewPlan.content}
	      							)
	      						)
	      					), 

	      					
	      					

                  React.createElement("div", {className: "form-group"}, 
                    React.createElement("label", {for: "state-choose", className: "col-sm-2 control-label"}, "状态"), 
                    React.createElement("div", {className: "col-sm-4"}, 
                      checkBox
                    )
                  ), 

                  React.createElement("div", {className: "form-group"}, 
                      React.createElement("div", {className: "col-sm-offset-2 col-sm-8"}, 
                        React.createElement("button", {type: "submit", className: "btn btn-primary"}, "确认修改")
                      )
                  )

	      				)
      				)
   				)
  			)
		)
		);
	}
});


/*评审计划列表组件，由评审计划输入框和评审展示框组成*/
var ReviewList = React.createClass({displayName: "ReviewList",
  getInitialState: function() {
      return {
          reviewPlanList:[],
          showModal:false,
          needEditPlan:{}
      };
  },
  loadReviewsFromServer:function(){
    $.ajax({
      url: "./php/reviewlist.php",//TODO:reviewPlan url
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
  componentWillMount: function() {
    this.loadReviewsFromServer();
  },
  addReviewPlan:function(newplan){
    var reviewPlans = this.state.reviewPlanList;
    var newList = [newplan].concat(reviewPlans);
    
    //TODO:commit to server
	$.ajax({  
		type : "post",  
		url : "./php/createreview.php",  
		data : newplan,  
		async : false,  
		success : function(data){
			//status = data;
		}
	}); 
	
    this.setState({reviewPlanList:newList});
  },
  handleHideModal:function(){
    this.setState({showModal:false});
  },
  handleShowModal:function(){
    this.setState({showModal:true});
  },
  editPlan:function(review){
    this.setState({needEditPlan:review});
    this.handleShowModal();
  },
  updateReviewPlan:function(newplan){
        var oldList = this.state.reviewPlanList;
        var reviewPlans = [].concat(oldList);
        for(var i=0;i < reviewPlans.length;i++){
          if (reviewPlans[i].id == newplan.id) {
              reviewPlans[i] = newplan;
          }
        }
        this.setState({reviewPlanList:reviewPlans});
        $.ajax({  
			type : "post",  
			url : "./php/updatereview.php",  
			data : newplan,  
			async : false,  
			success : function(data){
				//status = data;
		}
	}); 
  },

  
  render:function(){
      var ReviewPlans = [];
      for(var i = 0;i < this.state.reviewPlanList.length;i++){
        var temp = React.createElement(ReviewPlan, {reviewPlan: this.state.reviewPlanList[i], editPlan: this.editPlan})
        ReviewPlans.push(temp);
      }

      return(
        React.createElement("div", {className: "container"}, 
          React.createElement(ReviewPlanForm, {addReviewPlan: this.addReviewPlan, group: this.props.profile.group}), 
          React.createElement("div", {className: "row"}, 
            ReviewPlans
          ), 
          this.state.showModal?React.createElement(EditModal, {reviewPlan: this.state.needEditPlan, 
          handleHideModal: this.handleHideModal, updateReviewPlan: this.updateReviewPlan, group: this.props.profile.group}):null
        )
      );
  }
});



/*组装所有的组件的app*/

var App = React.createClass({displayName: "App",

  getInitialState:function() {
      return {
           profile:{id: undefined, name: undefined, mail: undefined, group: []} 
      };
  },

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

	render: function(){
    
		return(
      React.createElement("div", null, 
		    React.createElement(Navbar, {profile: this.state.profile}), 
      React.createElement("br", null), 
      React.createElement("br", null), 
      	React.createElement(ReviewList, {profile: this.state.profile})
      )
		);
	}
});

ReactDOM.render(React.createElement(App, null), document.getElementById("app"));





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
  getInitialState:function() {
      return {
        searchState:"input-group",
        searchHolder:"请输入联系人的邮箱",
        searchMail:""
      };
  },
  componentWillUpdate:function() {
    $('[data-toggle="checkbox"]').radiocheck();
  },
  componentDidMount:function() {
     $(function () {
  $('.tree li:has(ul)').addClass('parent_li').find(' > span').attr('title', 'Collapse this branch');
  $('.tree li.parent_li > span').on('click', function (e) {
    var children = $(this).parent('li.parent_li').find(' > ul > li');
    if (children.is(":visible")) {
      children.hide('fast');
      $(this).attr('title', 'Expand this branch').find(' > i').addClass('icon-plus-sign').removeClass('icon-minus-sign');
    } else {
      children.show('fast');
      $(this).attr('title', 'Collapse this branch').find(' > i').addClass('icon-minus-sign').removeClass('icon-plus-sign');
    }
    e.stopPropagation();
  });
});   
  },
  check:function(mail){
    var id = this.props.profile.id;
	var status = 0;
    //TODO:检查服务器，没有该账户返回0，已经添加返回1，尚未添加返回2
	$.ajax({
		type : "post",  
		url : "./php/checkcontact.php",  
        data : {mail:mail},  
		async : false,  
		success : function(data){
			status = data;
		}
	});
    return status;
  },
  search:function(e){
    e.preventDefault();
    var mail = this.refs.mail.value.trim();
    if(!mail){
      return;
    }
    var state = this.check(mail);
    if(state==0){
      this.refs.mail.value = "";
      this.setState({searchState:"input-group has-error",searchHolder:"你所查询联系人不存在！"});
    } else if(state==1) {
      this.refs.mail.value = "";
      this.setState({searchState:"input-group has-error",searchHolder:"你已经添加过该联系人！"});
    } else {
      this.refs.mail.value = "";
      this.setState({searchState:"input-group",searchHolder:"请输入联系人的邮箱"});
      this.setState({searchMail:mail})
      $("#makeGroups").modal("toggle");
    }


  },
  deleteContact:function(mail){
    this.props.deleteContact(mail);
  },
  makeGroups:function(){
    var chosenGroups = [];
    for(var i in this.props.profile.group){
      if($("#"+this.props.profile.group[i]).is(":checked")){
        chosenGroups.push(this.props.profile.group[i]);
      }
    }
    this.props.makeGroups(chosenGroups,this.state.searchMail);
    $("#makeGroups").modal("toggle");
  },
  render:function(){
    var list = [];
    for(var key in this.props.contactors){
      var temp = <TreeLine line={key} content={this.props.contactors[key]} deleteContact={this.deleteContact}/>
      list.push(temp);
    }
    var options = [];
    for(var i in this.props.profile.group){
      if(this.props.profile.group[i]!="所有联系人"){
        var temp = <label className="checkbox text-primary">
                    <input id={this.props.profile.group[i]} type="checkbox" data-toggle="checkbox" />
                      {this.props.profile.group[i]}
                   </label>;
        options.push(temp);
      }
    }
    return(
    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 ">
      <form className="form-horizontal" onSubmit={this.search}>
        <div className={this.state.searchState}>
          <input type="mail" className="form-control" placeholder={this.state.searchHolder} ref="mail" /> 
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

      <div className="modal fade" id="makeGroups" tabIndex="-1" role="dialog">
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
              <h5 className="modal-title" id="gridSystemModalLabel">添加分组</h5>
            </div>
            <div className="modal-body">
              <label className="checkbox text-primary">
                <input type="checkbox" id="所有联系人" checked="checked" disabled="disabled" data-toggle="checkbox" />
                  所有联系人
              </label>
              {options}
              <button type="button" className="btn btn-primary" onClick={this.makeGroups}>确认分组</button>
            </div>
          </div>
        </div>
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
    if(groups==""){
      this.props.updateGroupInServer("所有联系人");
    } else {
      this.props.updateGroupInServer("所有联系人,"+groups);
    }
    

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
  componentWillMount: function() {
    $.ajax({
      url: "./php/userinfo.php",//TODO:get customer profile url
      dataType: 'json',
	  async : false, 
      cache: false,
      success: function(data) {
        this.setState({profile: data});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error("", status, err.toString());//TODO:as same as above
      }.bind(this)
    });
    $.ajax({
      url: "./php/contact.php",//TODO:get customer profile url
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
	  type : "post",
      url: "./php/updategroup.php",//TODO:get customer profile url
      dataType: 'json',
	  data : {'groups':groups},
      cache: false,
      success: function(data) {
       // this.setState({profile: data});
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
    
	$.ajax({  
		type : "post",  
		url : "./php/updatecontact.php",  
		data : {action:"delete",mail:mail},  
		async : false,  
		success : function(data){
			//status = data;
		}
	}); 
	//TODO:服务器删除联系人，将某个用户所有组中的这个联系人删除
  },
  makeGroups:function(groups,mail){
	var sucess = false;
    //alert(groups)
    //TODO:将添加过后的联系人更新到服务器,其中groups是选中的组名，mail是被添加联系人的邮件
	$.ajax({  
		type : "post",  
		url : "./php/updatecontact.php",  
		data : {action:"add", mail:mail, groups:groups},  
		async : false,  
		success : function(data){
			
		}
	}); 
	if(sucess){
		var updated = JSON.parse(JSON.stringify(this.state.contactors));
		for(var i in groups){
		  updated[groups[i]].push(mail);
		}
		this.setState({contactors:updated});
	}
  },

  render: function(){
    
    return(
      <div>
        <Navbar profile={this.state.profile} />
        <br/>
        <br/>
        <div className="container">
          <ContactPanel profile={this.state.profile} deleteContact={this.deleteContact} makeGroups={this.makeGroups} contactors={this.state.contactors} />
        </div>
        <hr/>
        <GroupPanel group={this.state.profile.group} updateGroupInServer={this.updateGroupInServer}/>       
      </div>
    );
  }
});

ReactDOM.render(<ContactPage/>, document.getElementById("app"));


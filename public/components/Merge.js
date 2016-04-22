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
/*任务描述信息*/
var TaskDescription = React.createClass({
    componentDidMount:function() {
  },
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

/*位置信息组件*/
var Position = React.createClass({
  render:function(){
    var doc = <div><span>第{this.props.page}页</span><br/><span>第{this.props.row}行</span></div>;
    var code = <div><span>{this.props.page}</span><br/><span>第{this.props.row}行</span></div>;
    var location = this.props.type=="文档评审"?doc:code;
    return location;
  }
});

/*图例组件，给出不同颜色评审的状态*/
var Explain = React.createClass({
  render:function(){
    return(
      <div className="col-lg-10 col-md-10 col-sm-12 col-lg-offset-1 col-md-offset-1">
        <div className="row">
          <div className="col-lg-3 col-lg-offset-1 col-md-3 col-md-offset-1 col-sm-3 col-sm-offset-1 col-xs-4">
            <span className="normal-span">&#12288;&#12288;</span><label className="text-primary">一般评审</label>
          </div>
          <div className="col-lg-3 col-lg-offset-1 col-md-3 col-md-offset-1 col-sm-3 col-sm-offset-1 col-xs-4">
            <span className="merge-span">&#12288;&#12288;</span><label className="text-primary">合并评审</label>
          </div>
          <div className="col-lg-3 col-lg-offset-1 col-md-3 col-md-offset-1 col-sm-3 col-sm-offset-1 col-xs-4">
            <span className="denied-span">&#12288;&#12288;</span><label className="text-primary">否决评审</label>
          </div>
        </div>
      </div>
    );
  }
});

/*评审展示组件*/
var MerReview = React.createClass({
  choose:function(){
    var ifChoose = this.refs.choose.checked;
    this.props.updateChoose(this.props.review.id,ifChoose);
  },
  deny:function(){
    this.props.deny(this.props.review.id);

  },
  edit:function(){
    this.props.editReview(this.props.review.id);
  },
  render:function(){
    return(
      <div className="col-lg-10 col-md-10 col-sm-12 col-xs-12 col-lg-offset-1 col-md-offset-1 row-bottom">
        <div className="row divline shadow">
          <div className="divchoose col-lg-1 log-md-1 col-sm-1 col-xs-12">
            <input type="checkbox" className="choose" ref="choose" onClick={this.choose} data-toggle="checkbox"/>
          </div>

          <div className="divuser col-lg-1 col-md-1 col-sm-1 col-xs-12" >
            {this.props.review.reviewer}
          </div>

          <div className="divhead col-lg-2 col-md-2 col-sm-2 col-xs-12" >
            <Position type={this.props.type} page={this.props.review.page} row={this.props.review.row} />
          </div>

          <div className="divbody col-lg-7 col-md-7 col-sm-7 col-xs-12">
            <p>{this.props.review.content}</p>
          </div>

          <div className="divact col-lg-1 col-md-1 col-sm-1 col-xs-12 text-center">
            <p onClick={this.deny}>否决</p>
            <p onClick={this.edit}>编辑</p>
          </div>
        </div>
      </div>
    );
  }
});

/*合并展示组件*/
var Merged = React.createClass({
  componentDidMount:function() {
    $(this.refs.tooltip).tooltip();
  },
  componentDidUpdate:function(prevProps, prevState) {
    $(this.refs.tooltip).tooltip();
  },
  split:function(){
    this.props.split(this.props.review.id);
  },
  edit:function(){
    this.props.editReview(this.props.review.id);
  },
  choose:function(){
    var ifChoose = this.refs.choose.checked;
    this.props.updateChoose(this.props.review.id,ifChoose);
  },
  render:function(){
    var children = this.props.source.join("<hr>");
    return(
      <div className="col-lg-10 col-md-10 col-sm-12 col-xs-12 col-lg-offset-1 col-md-offset-1 row-bottom">
        <div className="row divline shadow">
          <div className="divchoose col-lg-1 log-md-1 col-sm-1 col-xs-12">
            <input ref="choose" type="checkbox" className="choose" onClick={this.choose} data-toggle="checkbox"/>
          </div>

          <div className="divuser col-lg-1 col-md-1 col-sm-1 col-xs-12" >
            {this.props.review.reviewer}
          </div>

          <div className="divhead col-lg-2 col-md-2 col-sm-2 col-xs-12" >
            <Position type={this.props.type} page={this.props.review.page} row={this.props.review.row} />
          </div>

          <div ref="tooltip" data-placement="top" data-toggle="tooltip" data-html="true" data-original-title={children}
             className="divmerge col-lg-7 col-md-7 col-sm-7 col-xs-12 dropup">
            <p>{this.props.review.content}</p>
          </div>

          <div className="divact col-lg-1 col-md-1 col-sm-1 col-xs-12 text-center">
            <p onClick={this.split}>拆分</p>
            <p onClick={this.edit}>编辑</p>
          </div>
        </div>
      </div>
    );
  }
});
/*被否决展示组件*/
var Denied = React.createClass({
  undo:function(){
    this.props.undo(this.props.review.id);
  },
  render:function(){
    return(
      <div className="col-lg-10 col-md-10 col-sm-12 col-xs-12 col-lg-offset-1 col-md-offset-1 row-bottom">
        <div className="row divline shadow">
          <div className="divuser col-lg-1 col-md-1 col-sm-1 col-xs-12" >
            {this.props.review.reviewer}
          </div>

          <div className="divhead col-lg-2 col-md-2 col-sm-2 col-xs-12" >
            <Position type={this.props.type} page={this.props.review.page} row={this.props.review.row} />
          </div>

          <div className="divdenied col-lg-8 col-md-8 col-sm-8 col-xs-12">
            <p>{this.props.review.content}</p>
          </div>

          <div className="divact col-lg-1 col-md-1 col-sm-1 col-xs-12 text-center" onClick={this.undo}>
            撤销
          </div>
        </div>
      </div>
    );
  }
});

/*合并列表组件*/
var MergeList = React.createClass({
  updateChoose:function(id,state){
    this.props.updateChoose(id,state);
  },
  undo:function(id){
    this.props.undo(id);
  },
  split:function(id){
    this.props.split(id);
  },
  deny:function(id){

    this.props.deny(id);
  },

  render:function(){
    var list = [];
    for(var i = 0;i < this.props.reviewList.length;i++){
      var temp = this.props.reviewList[i];
      var result;
      if(temp.state=="评审"){
        result = <MerReview editReview={this.props.editReview}
         review={temp} type={this.props.type} updateChoose={this.updateChoose} deny={this.deny} />;
        list.push(result);
      } else if(temp.state=="被否决"){
        result = <Denied review={temp} type={this.props.type} undo={this.undo} />
        list.push(result);
      } else if(temp.state=="合并"){
        var source = [];
        for(var j = 0;j < this.props.reviewList.length;j++){
          if(temp.children.indexOf(this.props.reviewList[j].id) >= 0){
            var info = this.props.reviewList[j].reviewer + "：" + this.props.reviewList[j].content;
            source.push(info);
          }
        }
        result = <Merged review={temp} source={source} type={this.props.type}
                           updateChoose={this.updateChoose} split={this.split} editReview={this.props.editReview} />
        list.push(result);
      }
    }
    return(
      <div className="container">
        {list}
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

/*合并模态框组件*/
var MergeModal = React.createClass({
  componentDidMount:function(){
      $(this.refs.modal).modal('show');
      $(this.refs.modal).on('hidden.bs.modal', this.props.handleHideModal);
      $(this.refs.positon).select2();
  },
  confirmMerge:function(){
    $(this.refs.modal).modal('toggle');
    var positon = this.refs.positon.value;
    var content = this.refs.content.value.trim();
    if(!content){
      return;
    }
    var pos = positon.split(",");
    this.props.confirmMerge(pos[0],pos[1],content);
  },
  render:function(){
    var text = this.props.contents.join("||");
    var options = [];
    if(this.props.type=="文档评审"){
      for(var i = 0;i < this.props.pos.length;i++){
        var posValue = this.props.pos[i].page + "," + this.props.pos[i].row;
        var temp = <option value={posValue}>第{this.props.pos[i].page}页，第{this.props.pos[i].row}行</option>;
        options.push(temp);
      }    
    } else {
      for(var i = 0;i < this.props.pos.length;i++){
        var posValue = this.props.pos[i].page + "," + this.props.pos[i].row;
        var temp = <option value={posValue}>{this.props.pos[i].page}，第{this.props.pos[i].row}行</option>;
        options.push(temp);
      }
    }
    
    return(
      <div ref="modal" className="modal fade" tabIndex="-1" role="dialog">
      <div className="modal-dialog modal-lg">
        <div className="modal-content">
          <div className="modal-header">
            <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
            <h4 className="modal-title" id="gridSystemModalLabel">合并评审</h4>
          </div>
          <div className="modal-body">
            <form className="form-horizontal">
            <div className="form-group">
              <select className="form-control  select select-primary" data-toggle="select" ref="positon">
                {options}
              </select>
            </div>
            <div className="form-group">
              <textarea ref="content" rows="3" className="form-control" defaultValue={text}>
              </textarea>
            </div>
            <div className="form-group">
              <button type="button" onClick={this.confirmMerge} className="btn btn-primary">确认合并</button>
            </div>
            </form>
          </div>
        </div>
      </div>
    </div>

    );
  }
});

/*组装所有的组件的app*/
var Merge = React.createClass({

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
            "id":"111",
           "title":"陆云昊的毕业论文",
           "url":"https://www.github.com",
           "type":"文档评审",
           "state":true,
           "content":"论文内容"
          },
          reviewList:[
          {
            "id":"1112",
            "page":"1",
            "row":"12",
            "reviewer":"屋顶上的羊驼",
            "state":"评审",
            "content":"1111111"
          },
          {
            "id":"1113",
            "page":"1",
            "row":"22",
            "reviewer":"羊驼",
            "state":"评审",
            "content":"222222222"
          },
          {
            "id":"1114",
            "page":"2",
            "row":"12",
            "reviewer":"屋顶",
            "state":"评审",
            "content":"3333333333"
          },
          {
            "id":"1115",
            "page":"3",
            "row":"22",
            "reviewer":"屋顶上的羊驼",
            "state":"评审",
            "content":"“大约”一词使用不准确，没有描述清楚所有情况。"
          },
          {
            "id":"1116",
            "page":"4",
            "row":"12",
            "reviewer":"屋顶",
            "state":"被否决",
            "content":"“大约”一词使用不准确，没有描述清楚所有情况。"
          },
          {
            "id":"1117",
            "page":"4",
            "row":"14",
            "reviewer":"羊驼",
            "state":"评审",
            "content":"“大约”一词使用不准确，没有描述清楚所有情况。"
          },{
            "id":"1118",
            "page":"6",
            "row":"12",
            "reviewer":"屋顶上的羊驼",
            "state":"评审",
            "content":"“大约”一词使用不准确，没有描述清楚所有情况。"
          },
          {
            "id":"1119",
            "page":"6",
            "row":"13",
            "reviewer":"屋顶上的羊驼",
            "state":"被合并",
            "content":"“大约”一词使用不准确，没有描述清楚所有情况。"
          },
          {
            "id":"1120",
            "page":"6",
            "row":"14",
            "reviewer":"屋顶上的羊驼",
            "state":"合并",
            "content":"“大约”一词使用不准确，没有描述清楚所有情况。",
            "children":["1119","1121","1122"]
          },
          {
            "id":"1121",
            "page":"6",
            "row":"14",
            "reviewer":"屋顶上的羊驼",
            "state":"被合并",
            "content":"“大约”一词使用不准确，没有描述清楚所有情况。"
          },
          {
            "id":"1122",
            "page":"6",
            "row":"15",
            "reviewer":"屋顶上的羊驼",
            "state":"被合并",
            "content":"“大约”一词使用不准确，没有描述清楚所有情况。"
          }
          ],
          chooseList:{"1111":false,"1112":false,"1113":false,"1114":false,"1114":false,"1115":false,"1116":false,
                      "1117":false,"1118":false,"1119":false,"1120":false,"1121":false,"1122":false},
          showModal:false,
          pos:[],
          contents:[],
          showEditModal:false,
          editReview:{}
      };
  },
  handleHideModal:function(){
    this.setState({showModal:false});
  },
  handleShowModal:function(){
    this.setState({showModal:true});
  },
  handleShowEditModal:function(){
    this.setState({showEditModal:true});
  },
  handleHideEditModal:function(){
    this.setState({showEditModal:false});
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
	
     $.ajax({
      url: "./php/deficiencylist.php?type=merge&id="+id,//TODO:get customer profile url
      dataType: 'json',
      cache: false,
      success: function(data) {
		var list = {};
		for(var defi in data){
			//console.log(data[defi].id);
			var defiId = data[defi].id;
			list[defiId]=false;
		}
		
		//console.log(list);
        this.setState({reviewList: data});
		this.setState({chooseList: list});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error("", status, err.toString());//TODO:as same as above
      }.bind(this)
    });
  },
  merge:function(e){
    e.preventDefault();
    var chosen = [];
    var updatedPos = [];
    var updatedContents = [];
    var count = 0;

    for(var key in this.state.chooseList){
      if(this.state.chooseList[key]){
		console.log(key);
        count++;
        var po = {};
        for(var i =0;i < this.state.reviewList.length;i++){
          if(this.state.reviewList[i].id==key){
            po["page"] = this.state.reviewList[i].page;
            po["row"] = this.state.reviewList[i].row;
            updatedPos.push(po);
            updatedContents.push(this.state.reviewList[i].content);
          }
        }
      }
    }
    if(count<=1){
      return;
    }
	//alert("1321");
    this.setState({pos:updatedPos,contents:updatedContents});
    this.handleShowModal();
  },
  confirmMerge:function(page,row,content){
    var children =[];
    var outOfDate = [];//存放被合并的合并评审的数组下标
    var outOfDateServer = [];//存放被合并的合并评审的id
    for(var key in this.state.chooseList){//找到所有的被合并评审，和过期的合并评审
      if(this.state.chooseList[key]){
        for(var i =0;i < this.state.reviewList.length;i++){
          if(this.state.reviewList[i].id==key){
            if(this.state.reviewList[i].state=="评审"){
              children.push(this.state.reviewList[i].id);
            } else {
              outOfDate.push(i);
              outOfDateServer.push(this.state.reviewList[i].id);
              children = children.concat(this.state.reviewList[i].children);
            }
          }
        }
      }
    }
    var merged = {};
    merged["page"] = page;
    merged["row"] = row;
    merged["reviewer"] = this.state.profile.name;
    merged["state"] = "合并";
    merged["content"] = content;
    merged["children"] = children;
	
	var post_data = merged;
	post_data["action"] = "merge";
    var id;// 用来接受服务器的合并id
    $.ajax({
      url: "./php/merge.php",//TODO:将合并后的信息上传到服务器，服务器返回一个id，即合并的id;同时将被合并的合并评审删除
      dataType: 'json',
	  type : "post",  
	  data: post_data,
      cache: false,
      success: function(data) {
        id = data;
        //id = "22222";
      }.bind(this),
      error: function(xhr, status, err) {
        //console.error("", status, err.toString())
       // id = "22222";
      }.bind(this)
    });
    merged["id"] = id;
    var updated = JSON.parse(JSON.stringify(this.state.reviewList));
    var index;
    //删除被合并的合并评审
    for(var i = 0;i < outOfDate.length;i++){
      updated.splice(outOfDate[i],1);
    }

    //隐藏被合并的普通评审
    for(var i = 0;i < updated.length;i++){
      if(children.indexOf(updated[i].id) >= 0){
        updated[i].state = "被合并";
      }
    }

    //插入新的合并评审
    for(var i = 0;i < updated.length;i++){
      if(this.compare(updated[i],merged)){
        index = i;
        break;
      }
    }
    if(index == undefined){
      index = updated.length -1;
    }

    //更新被选中的情况
    var updatedChoose = JSON.parse(JSON.stringify(this.state.chooseList));
    updatedChoose[merged.id] = false;
    for(var key in updatedChoose){
      updatedChoose[key] = false;
    }
    this.setState({chooseList:updatedChoose});
    updated.splice(index,0,merged);
    this.setState({reviewList:updated});
    
    $("[type='checkbox']").attr("checked",false);
  },
  compare:function(review1,review2){//比较两个评审的位置前后
    var type = localStorage["rs_type"];
    if(type=="文档评审"){
      var page1 = review1.page;
      var page2 = review2.page;
      if(page1 > page2){
        return true;
      } else if(page1 == page2) {
        var row1 = parseInt(review1.row, 10);
        var row2 = parseInt(review2.row, 10);
        if(row1 > row2){
          return true;
        } else if(row1 == row2){
          return false;
        } else {
          return false;
        }
      } else {
        return false;
      }

    } else {//代码评审位置比较
      var page1 = parseInt(review1.page, 10);
      var page2 = parseInt(review2.page, 10);
      if(page1 > page2){
        return true;
      } else if(page1 == page2){
        var row1 = parseInt(review1.row, 10);
        var row2 = parseInt(review2.row, 10);
        if(row1 > row2){
          return true;
        } else if(row1 == row2){
          return false;
        } else {
          return false;
        }
      } else {
        return false;
      }
    }

  },
  editReview:function(id){
    for(var i = 0;i < this.state.reviewList.length; i++){
      if(this.state.reviewList[i].id == id ){
        this.setState({editReview:this.state.reviewList[i]});
        break;
      }
    }
    this.handleShowEditModal();
  },
  confirmEdition:function(id,content){
    var sucess = false;
	$.ajax({  
		type : "post",  
		url : "./php/merge.php",  
		data : {action:'edit', defiId:id, content:content},  
		async : false,  
		success : function(data){
			sucess = true;
		}
	}); 
    //TODO:服务器更新编辑
	if(sucess){
		var updated = JSON.parse(JSON.stringify(this.state.reviewList));
		for(var i =0;i < updated.length; i++){
			if(updated[i].id == id){
				updated[i].content = content;
				this.setState({reviewList:updated});
				break;
			}
		}
	}
  },

  //将某个评审的状态从“评审”变成“被否决”
  deny:function(id){
	var sucess = false;
    $.ajax({ 
		type : "post",  
		url : "./php/merge.php",  
		data : {action:'deny', defiId:id},  
		async : false,  
		success : function(data){
			sucess = true;
		}
	}); 
    //TODO:提交到服务器
	if(sucess){
		var updated = JSON.parse(JSON.stringify(this.state.reviewList));
		for(var i = 0;i < updated.length;i++){
			if(updated[i].id==id){
				updated[i].state = "被否决";
				this.setState({reviewList:updated});
				break;
			}
		}	
	}
	
  },
  split:function(id){
    var updated = JSON.parse(JSON.stringify(this.state.reviewList));
    var children;
    var index;
    for(var i =0;i < updated.length;i++){
      if(updated[i].id==id){
        children = updated[i].children;
        index = i;
      }
    }
	var sucess = false;
	$.ajax({ 
		type : "post",  
		url : "./php/merge.php",  
		data : {action:'split', defiId:id},  
		async : false,  
		success : function(data){
			sucess = true;
		}
	}); 
	if(sucess){
		 //删除被拆分的合并评审
		updated.splice(index,1);
		//TODO:通知服务器
		//释放被合并的评审
		for(var i =0;i < updated.length;i++){
		  if(children.indexOf(updated[i].id) >= 0){
			updated[i].state = "评审";
		  }
		}
		this.setState({reviewList:updated});
	}
  },
  //将某个评审的状态从“被否决”变成“评审”
  undo:function(id){
	var sucess = false;
	$.ajax({ 
		type : "post",  
		url : "./php/merge.php",  
		data : {action:'undeny', defiId:id},  
		async : false,  
		success : function(data){
			sucess = true;
		}
	}); 
    //TODO:提交到服务器
	
	if(sucess){
		var updated = JSON.parse(JSON.stringify(this.state.reviewList));
		for(var i = 0;i < updated.length;i++){
		if(updated[i].id==id){
			updated[i].state = "评审";
			this.setState({reviewList:updated});
			break;
		  }
		}
	}
  },
  updateChoose:function(id,state){
    var updated = JSON.parse(JSON.stringify(this.state.chooseList));
    for(var key in updated){
      if(key==id){
        updated[key] = state;
        this.setState({chooseList:updated});
        break;
      }
    }
  },
  completeMerge:function(){
    var target = "report.html?id="+ this.state.review.id;
    location.href = target;
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
        <Navbar profile={this.state.profile} />
      <br/>
      <br/>
      <div className="container">
        <TaskDescription title={title} url={url} type={type} state={state} content={content} />
      </div>
      <div className="container">
        <Explain />
      </div>
      
      <MergeList updateChoose={this.updateChoose} editReview={this.editReview}
       undo={this.undo} split={this.split} deny={this.deny} reviewList={this.state.reviewList} type={type} />

      <div className="container">
        <div className="col-lg-10 col-md-10 col-sm-12 col-xs-12 col-lg-offset-1 col-md-offset-1">
          <button type="button" onClick={this.completeMerge} className="btn btn-primary btn-block">完成合并</button>
        </div>
      </div>

      <div className="fixed-bottom">
        <button type="button" onClick={this.merge} className="round-button shadow">合</button>
      </div>
      {this.state.showModal?<MergeModal type={type} handleHideModal={this.handleHideModal} confirmMerge={this.confirmMerge} pos={this.state.pos} contents={this.state.contents} />:null}
      {this.state.showEditModal?<ReviewEditModal confirmEdition={this.confirmEdition}
             review={this.state.editReview} handleHideModal={this.handleHideEditModal} />:null}
      </div>
    );
  }
});

ReactDOM.render(<Merge/>, document.getElementById("app"));





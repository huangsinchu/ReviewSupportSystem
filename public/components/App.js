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


/*用于展示评审计划的组件*/

 var ReviewPlan = React.createClass({
  render: function(){
    return(
      <div className="container">
        <div className="row">
        <div className="col-lg-3 col-md-6 col-sm-12 row-bottom">
            <dl className="palette palette-peter-river">
                <dt>陆云昊的毕业论文</dt>
                <dd><a className="text-warning" href="https://www.github.com">下载地址</a></dd>
              </dl>
              <dl className="palette palette-belize-hole">
                <dt>文档评审</dt>
                <dd>论文内容包含对中国dota的局势分析，请仔细评审。</dd>
              </dl>
              <dl className="palette palette-belize-hole">
                <dd><a href="#" className="btn btn-info" role="button">编辑</a></dd>
              </dl>
          </div>

          <div className="col-lg-3 col-md-6 col-sm-12 row-bottom">
            <dl className="palette palette-peter-river">
                <dt>陆云昊的毕业论文</dt>
                <dd><a className="text-warning" href="https://www.github.com">下载地址</a></dd>
              </dl>
              <dl className="palette palette-belize-hole">
                <dt>文档评审</dt>
                <dd>论文内容包含对中国dota的局势分析，请仔细评审。</dd>
              </dl>
              <dl className="palette palette-belize-hole">
                <dd><a href="#" className="btn btn-info" role="button">编辑</a></dd>
              </dl>
          </div>

          <div className="col-lg-3 col-md-6 col-sm-12 row-bottom">
            <dl className="palette palette-peter-river">
                <dt>陆云昊的毕业论文</dt>
                <dd><a className="text-warning" href="https://www.github.com">下载地址</a></dd>
              </dl>
              <dl className="palette palette-belize-hole">
                <dt>文档评审</dt>
                <dd>论文内容包含对中国dota的局势分析，请仔细评审。</dd>
              </dl>
              <dl className="palette palette-belize-hole">
                <dd><a href="#" className="btn btn-info" role="button">编辑</a></dd>
              </dl>
          </div>

          <div className="col-lg-3 col-md-6 col-sm-12 row-bottom">
            <dl className="palette palette-peter-river">
                <dt>陆云昊的毕业论文</dt>
                <dd><a className="text-warning" href="https://www.github.com">下载地址</a></dd>
              </dl>
              <dl className="palette palette-belize-hole">
                <dt>文档评审</dt>
                <dd>论文内容包含对中国dota的局势分析，请仔细评审。</dd>
              </dl>
              <dl className="palette palette-belize-hole">
                <dd><a href="#" className="btn btn-info" role="button">编辑</a></dd>
              </dl>
          </div>

          <div className="col-lg-3 col-md-6 col-sm-12 row-bottom">
            <dl className="palette palette-peter-river">
                <dt>陆云昊的毕业论文</dt>
                <dd><a className="text-warning" href="https://www.github.com">下载地址</a></dd>
              </dl>
              <dl className="palette palette-belize-hole">
                <dt>文档评审</dt>
                <dd>论文内容包含对中国dota的局势分析，请仔细评审。</dd>
              </dl>
              <dl className="palette palette-belize-hole">
                <dd><a href="#" className="btn btn-info" role="button">编辑</a></dd>
              </dl>
          </div>

          <div className="col-lg-3 col-md-6 col-sm-12 row-bottom">
            <dl className="palette palette-peter-river">
                <dt>陆云昊的毕业论文</dt>
                <dd><a className="text-warning" href="https://www.github.com">下载地址</a></dd>
              </dl>
              <dl className="palette palette-belize-hole">
                <dt>文档评审</dt>
                <dd>论文内容包含对中国dota的局势分析，请仔细评审。</dd>
              </dl>
              <dl className="palette palette-belize-hole">
                <dd><a href="#" className="btn btn-info" role="button">编辑</a></dd>
              </dl>
          </div>
          

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
      <ReviewPlan />
      </div>
		);
	}
});

ReactDOM.render(<App/>, document.getElementById("app"));

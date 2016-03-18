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
    );
  }
});


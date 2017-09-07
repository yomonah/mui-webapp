window.APP_UTILS={
  isLogin:function(){
    if(localStorage.isLogin){
      return true;
    }
    return false;
  },

  initState:function(location){
    switch (location){
      case 'home':
        localStorage.state = 1;
        break;
      case 'discovery':
        localStorage.state = 2;
        break;
      case 'message':
        localStorage.state = 3;
        break;
      case 'personal':
        localStorage.state = 4;
        break;
      default:
        break;
    }
  },

  go:function(url){
    mui.openWindow({
      url: url,
      id: url,
      show: {
          aniShow: 'pop-in'
      },
      waiting: {
          autoShow: false
      },
      extras: {}
    });
  },

  doRequest:function(requestObj, cb){
    let {url, type, params} = requestObj;
    $.ajax({
      url:url,
      type:type,
      data:params,
      async:true,
      dataType:'json',
      success:function(data){
        cb && cb(data);
      },
      error:function(){
        mui.plusReady(function(){
          plus.nativeUI.toast("网络错误");
        });
      }
    })
  }
}
window.APP_UTILS={
  isLogin:function(){
    if(localStorage.isLogin){
      return true;
    }
    return false;
  },
  go:function(url,id){
    mui.openWindow({
      url: url,
      id: id,
      show: {
          aniShow: 'pop-in'
      },
      waiting: {
          autoShow: false
      },
      extras: {}
    });
  }
}
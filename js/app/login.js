mui.init();
mui.plusReady(function(){
  $("#submit").off("tap").on("tap", function(e){
    var username = $("#username").val(),
        psw = $("#password").val();
    if(!username || !psw){
      plus.nativeUI.toast("用户名和密码不能为空");
    }else{
      localStorage.setItem('user',username);
      localStorage.setItem('isLogin',true);
      APP_UTILS.go('home.html');
    }
  });
});

mui.init({
  preloadPages:[
    {
      id:'login.html',
      url:'login.html'           
    },
  ],
});
mui.plusReady(function(){
});

var r=setTimeout("redirect()",4000);

function redirect(){
  var isLogin = APP_UTILS.isLogin();
  if(isLogin){
    APP_UTILS.go('home.html','home.html');
  }else{
    APP_UTILS.go('login.html','login.html');
  }
}
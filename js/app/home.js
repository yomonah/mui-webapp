mui.init({
});
mui.plusReady(function(){
  plus.navigator.setStatusBarBackground('#ebc52f');

  var currentPage = 1,
    totalPage = 0;

  var gallery = mui('#banner');
    gallery.slider({
    scrollTime: 800,
    interval:3000//自动轮播周期，若为0则不自动播放，默认为0；
  });

  $("#create").off("tap").on("tap", function(e){
    APP_UTILS.go('create.html');
  });

  fetchData(1);
  function fetchData(page){
    totalPage = 4;
    currentPage = page;

    // var requestOpt = {
    //   url:'http://122.224.198.86/huayun/user/doView',
    //   params:{loginUserId:'140',token:'bdbc93ca-3015-4169-bd8c-c474576e45ca',userId:'140'},
    //   type:'get'
    // }
    // APP_UTILS.doRequest(requestOpt, function(data){
    // });
    let data = [
      {cover:"./img/quan4.jpeg", title:"冰小火的秘密基地", host:"冰小火", isAuth:'true'},
      {cover:"./img/quan3.jpeg", title:"猫与咖啡", host:"苏小懒懒懒", isAuth:'true'},
      {cover:"./img/quan2.jpeg", title:"说出你的故事", host:"人生若只如初见", isAuth:'true'},
      {cover:"./img/quan1.jpeg", title:"颠沛的人生", host:"龟壳里的蜗牛", isAuth:'true'}
    ];
  
    var listHtml = '';
    $.each(data,function(index,item){
      let certificationHtml = this.isAuth ? '<i class="certification">v</i>':'';
      let cls = index%2 === 0 ? 'odd':'';
      listHtml += '<li class='+cls+'><div class="img-wrap"><img src='+this.cover+'/></div>'+
            '<span class="title">'+this.title+'</span>'+
            '<span class="host">'+this.host+certificationHtml+'</span>'+
            '<button class="join">去加入</button> </li>';
    })
    var sliderItem = '<div class="mui-slider-item">'+listHtml+'</div>';
    $('#group').append(sliderItem);
  }

  $('#changePage').off('tap').on('tap',function(e){
    if(currentPage < totalPage){
      currentPage += 1;
    }else{
      currentPage = 0;
    }
    fetchData(currentPage);
    mui('#supportGroup').slider({scrollTime: 400,}).nextItem();
  })

});

mui.init({
});
// debugger
mui.plusReady(function(){
  plus.navigator.setStatusBarBackground('#fff');

  $("#goBack").off("tap").on("tap", function(e){
    plus.navigator.setStatusBarBackground('#ebc52f');
  })

  $('#uploadHead').off('tap').on('tap', function(e){
    if (mui.os.plus) { 
      var a = [{ 
        title: "拍照" 
      }, { 
        title: "从手机相册选择" 
      }]; 
      plus.nativeUI.actionSheet({ 
        title: "上传用户头像", 
        cancel: "取消", 
        buttons: a 
      }, function(b) { /*actionSheet 按钮点击事件*/ 
        switch (b.index) { 
          case 0: 
            break; 
          case 1: 
            getImage(); /*拍照*/ 
            break; 
          case 2: 
            galleryImg();/*打开相册*/ 
            break; 
          default: 
              break; 
        } 
      }) 
    } 
  })

  function getImage() { 
    var c = plus.camera.getCamera(); 
    c.captureImage(function(e) { 
      plus.io.resolveLocalFileSystemURL(e, function(entry) { 
          var s = entry.toLocalURL() + "?version=" + new Date().getTime(); 
          uploadHead(s); /*上传图片*/ 
      }, function(e) { 
          console.log("读取拍照文件错误：" + e.message); 
      }); 
    }, function(s) { 
      console.log("error" + s); 
    }, { 
      filename: "_doc/head.png" 
    }) 
  } 

  function galleryImg() { 
    plus.gallery.pick(function(a) { 
      plus.io.resolveLocalFileSystemURL(a, function(entry) { 
        plus.io.resolveLocalFileSystemURL("_doc/", function(root) { 
          root.getFile("head.png", {}, function(file) { 
            //文件已存在 
            file.remove(function() { 
              console.log("file remove success"); 
              entry.copyTo(root, 'head.png', function(e) { 
                var e = e.fullPath + "?version=" + new Date().getTime(); 
                uploadHead(e); /*上传图片*/ 
                //变更大图预览的src 
                //目前仅有一张图片，暂时如此处理，后续需要通过标准组件实现 
              }, 
              function(e) { 
                  console.log('copy image fail:' + e.message); 
              }); 
            }, function() { 
              console.log("delete image fail:" + e.message); 
          }); 
        }, function() { 
          //文件不存在 
          entry.copyTo(root, 'head.png', function(e) { 
            var path = e.fullPath + "?version=" + new Date().getTime(); 
            uploadHead(path); /*上传图片*/ 
          }, 
          function(e) { 
            console.log('copy image fail:' + e.message); 
          }); 
        }); 
      }, function(e) { 
        console.log("get _www folder fail"); 
      }) 
    }, function(e) { 
      console.log("读取拍照文件错误：" + e.message); 
    }); 
    }, function(a) {}, { 
      filter: "image" 
    }) 
  };
  //上传功能
  function uploadHead(imgPath) {
    var mainImg = document.getElementById('headimg');
    console.log(mainImg)
    mainImg.src = imgPath; 

    var image = new Image(); 
    image.src = imgPath; 
    image.onload = function() { 
        var imgData = getBase64Image(image);
        /**这里处理上传接口 */
    } 
  }
  //将图片压缩转成base64 
  function getBase64Image(img) { 
    var canvas = document.createElement("canvas"); 
    var width = img.width; 
    var height = img.height; 
    // calculate the width and height, constraining the proportions 
    if (width > height) { 
      if (width > 100) { 
        height = Math.round(height *= 100 / width); 
        width = 100; 
      } 
    } else { 
      if (height > 100) { 
        width = Math.round(width *= 100 / height); 
        height = 100; 
      } 
    } 
    canvas.width = width;   /*设置新的图片的宽度*/ 
    canvas.height = height; /*设置新的图片的长度*/ 
    var ctx = canvas.getContext("2d"); 
    ctx.drawImage(img, 0, 0, width, height); /*绘图*/ 
    var dataURL = canvas.toDataURL("image/png", 0.8); 
    console.log('imgurl',dataURL.replace("data:image/png;base64,", ""));
    return dataURL.replace("data:image/png;base64,", ""); 
  } 

});

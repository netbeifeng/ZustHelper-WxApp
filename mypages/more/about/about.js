var flag=false;
Page( {
  data : {
    c: 'abcd \n aa\t aa\n',
    imageUrl: "image/logo_school.png"  ,
    count : 0,
    color: "window-red",
    hello: "hello!",
    show: false,
    temp: ['a','b','c','d','e','f','g']
  },
  Count: function(){
    this.setData({
      count : this.data.count + 300
    });
  },
  delete: function(){
    var y=this.data.temp;
    y.shift()
    this.setData({
      temp: y
    });
  },
  btnClick: function(){
    
    var isShow=this.data.show;
    console.log(isShow);
    this.setData({
      show: !isShow
    });
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
  },
  onReady: function () {
    // 页面渲染完成
  },
  onShow: function () {
    // 页面显示
  },
  onHide: function () {
    // 页面隐藏
  },
  onUnload: function () {
    // 页面关闭
  },
    onShareAppMessage: function () {
    return {
      title: '浙科院校园助手',
      desc: '「浙科院校园助手」。',
      path: '/mypages/index/index'
    }
  }
});
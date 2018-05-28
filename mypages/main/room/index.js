const app = getApp();
var header = app.globalData.header;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    xq: ["小和山校区", "安吉校区"],
    xqIndex: 0,
    checkboxItems: [
      { name: '(上午) 第一大节', value: '1' },
      { name: '(上午) 第二大节', value: '2' },
      { name: '(下午) 第三大节', value: '3' },
      { name: '(下午) 第四大节', value: '4' },
      { name: '(晚上) 第五大节', value: '5' },
      { name: '上午', value: '6' },
      { name: '下午', value: '7' },
      { name: '整天', value: '10' },
    ],
    finalvaule:'',
  },
  
  checkboxChange: function (e) {
    let checkboxItems = this.data.checkboxItems, values = e.detail.value
    for (var i = 0, lenI = checkboxItems.length; i < lenI; ++i) {
      checkboxItems[i].checked = false;
      for (var j = 0, lenJ = values.length; j < lenJ; ++j) {
        if (checkboxItems[i].value == values[j]) {
          checkboxItems[i].checked = true;
          break;
        }
      }
    }
    let checkboxValues = values.join(',')
    this.setData({ checkboxItems, checkboxValues,finalvalue:values })
  },
  xqPicker: function (e) {
    this.setData({
      xqIndex: e.detail.value
    })
  },
  oneKey: function(){
    app.loading()
    var that=this;
    if (that.data.xqIndex == 0) {
      var dex = 1;
    }
    else {
      var dex = 3;
    }
    wx.request({
      url: app.appData.host+'/emptyroom',
      header: header,
      data: {
        cookie: app.globalData.cookie,
        xh: app.globalData.xh,
        xm: app.globalData.xm,
        xq: dex,
        postcode: 'onekey',
      },
      success: function (res) {
        var str=res.data
        app.hide()
        if(str.indexOf("StringIndexOutOfBounds")!=-1){
          wx.showToast({
            title: '查找失败',
            icon:'fail',
            duration:1000
          })
        }
        else{
        app.appData.emptyRoom = res.data;
        wx.navigateTo({
          url: 'res/res',
        })
      }
      }
    })
  },
  searchRoom: function () {
    
    if (!this.data.checkboxValues) {
      wx.showModal({
        content: '请选择要查询的节数',
        showCancel: false
      })
    } 
    else{
      var that=this;
      if(that.data.xqIndex==0){
        var dex=1;
      }
      else{
        var dex=3;
      }
      console.log(this.data.finalvalue)
      app.loading()
      wx.request({
        url: app.appData.host+'/emptyroom',
        header: header,
        data: {
          cookie: app.globalData.cookie,
          xh: app.globalData.xh,
          xm: app.globalData.xm,
          postcode: 'normal',
          xq: dex,
          sdj: that.data.finalvalue[0]
        },
        success: function (res) {
          app.hide()
          app.appData.emptyRoom=res.data;
          console.log(res.data)
          wx.navigateTo({
            url: 'res/res',
          })
        }
      })
     
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (app.appData.userinfo == null) {
      wx.navigateTo({
        url: '/mypages/login/index',
      })
    }
    let index;
    if(app.appData.xiaoqu==1)
    {
      index=0;
    }
    else if(app.appData.xiaoqu==3)
    {
      index=1;
    }
    this.setData({xqIndex:index})
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    return {
      title: '浙科院校园助手',
      desc: '「浙科院校园助手」。',
      path: '/mypages/index/index'
    }
  }
})
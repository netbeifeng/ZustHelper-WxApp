// mypages/main/exam/index.js
const app = getApp();
var header = app.globalData.header;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    res: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    console.log("load");
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    console.log("ready");
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    app.appData.mins=new Date().getMinutes()
    var that = this;
    if (app.appData.userinfo == null) {
      wx.navigateTo({
        url: '/mypages/login/index',
      })
    }
    else {
      var that=this;
      app.loading()
      wx.request({
        url: app.appData.host+'/cet',
        header: header,
        data: {
          cookie: app.globalData.cookie,
          xh: app.globalData.xh,
          xm: app.globalData.xm,
        },
        success: function (res) {
          app.hide()
          console.log(res.data);
          that.setData({res:res.data})
        }
      })
    }


  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    console.log("hide");
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    console.log("unload");
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
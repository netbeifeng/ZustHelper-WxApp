// mypages/main/grade/index.js
const app=getApp();
var header=app.globalData.header;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    xn: ["2015-2016","2016-2017", "2017-2018"],
    xnIndex: 2,
  },
  xnPicker: function (e) {
    this.setData({
      xnIndex: e.detail.value
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */

  searchall:function(){
    app.loading()
    wx.request({
      url: app.appData.host+'/grade',
      header: header,
      data: {
        cookie: app.globalData.cookie,
        xh: app.globalData.xh,
        ddlXN: ''
      },
      success: function (res) {
        app.hide()
        console.log(res.data);
        app.appData.grade=res.data[1];
        app.appData.sum=res.data[0][0];
        wx.navigateTo({
          url: 'res/res',
        })

      }
    })
    //两个navi
  },
  search:function(){
    app.loading()
    var that=this;
    wx.request({
      url: app.appData.host+'/grade',
      header: header,
      data: {
        cookie: app.globalData.cookie,
        xh: app.globalData.xh,
        ddlXN: that.data.xn[that.data.xnIndex]
      },
      success: function (res) {
        app.hide()
        console.log(res.data);
        app.appData.grade = res.data[1];
        app.appData.sum = res.data[0][0];
        wx.navigateTo({
          url: 'res/res',
        })

      }
    })
  },


  onLoad: function (options) {
    if (app.appData.userinfo == null) {
      wx.navigateTo({
        url: '/mypages/login/index',
      })
    }
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
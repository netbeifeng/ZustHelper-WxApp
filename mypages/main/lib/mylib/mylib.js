const app = getApp();
var header = app.globalData.header;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    baseinfo:null,
    pageinfo:null,
    pageinfos:null,
    pageinfot:null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    app.loading()
    var that=this;
    wx.request({
      url: app.appData.hostm+'/mylibrary',
      header: header,
      data: {
        cookielib: app.globalData.cookielib,
        postcode: 'info'
      },
      success: function (res) {
        that.setData({baseinfo:res.data})
        
        console.log(res.data);
      }
    })
    wx.request({
      url: app.appData.hostm+'/mylibrary',
      header: header,
      data: {
        cookielib: app.globalData.cookielib,
        postcode: 'first'
      },
      success: function (res) {
        console.log(res.data);
        that.setData({ pageinfo: res.data[1] })
        app.globalData.viewmy = res.data[0][0].view;
        app.globalData.evenmy = res.data[0][0].even;
        app.globalData.bookn = res.data[0][0].bookn;
        wx.hideToast()
        if (res.data[0][0].bookn>0){
          console.log("aaa")
          wx.request({
            url: app.appData.hostm+'/mylibrary',
            header: header,
            data: {
              cookielib: app.globalData.cookielib,
              postcode: 'more',
              view: app.globalData.viewmy,
              even: app.globalData.evenmy,
              bookn: app.globalData.bookn
            },
            success: function (res) {
              console.log("aaa")
              console.log(res.data);
              that.setData({ pageinfos: res.data[1] })
              app.globalData.viewmy = res.data[0][0].view;
              app.globalData.evenmy = res.data[0][0].even;
              app.globalData.bookn = res.data[0][0].bookn;
              if (res.data[0][0].bookn > 0) {
                wx.request({
                  url: app.appData.hostm+'/mylibrary',
                  header: header,
                  data: {
                    cookielib: app.globalData.cookielib,
                    postcode: 'more',
                    view: app.globalData.viewmy,
                    even: app.globalData.evenmy,
                    bookn: app.globalData.bookn
                  },
                  success: function (res) {
                    console.log(res.data);
                    that.setData({ pageinfot: res.data[1] })
                    app.globalData.viewmy = res.data[0][0].view;
                    app.globalData.evenmy = res.data[0][0].even;
                    app.globalData.bookn = res.data[0][0].bookn;
                  }
                })
              }
            },
            fail: function(){
              console.log("fail!!!!!!!!!")
            }
          })
        }
      }
    })


    app.hide()
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
    //app.appData.mins = new Date().getMinutes()
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
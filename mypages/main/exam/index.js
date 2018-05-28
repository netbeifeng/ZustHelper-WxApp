// mypages/main/exam/index.js
const app=getApp();
var header=app.globalData.header;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    res:null,
    noBuk:null
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
    
    var that = this;
    if(app.appData.weeks>=11){
    app.appData.mins = new Date().getMinutes()
    if (app.appData.userinfo == null) {
      wx.navigateTo({
        url: '/mypages/login/index',
      })
    }
    else {
      app.loading()
      wx.request({
        url: app.appData.host+'/examroom',
        header: header,
        data: {
          cookie: app.globalData.cookie,
          xh: app.globalData.xh,
          xm: app.globalData.xm,
        },
        success: function (res) {
          app.hide()
          that.setData({ res: res.data })
          console.log(res.data);
        }
      })
    }
  }
  else{
      app.appData.mins = new Date().getMinutes()
      if (app.appData.userinfo == null) {
        wx.navigateTo({
          url: '/mypages/login/index',
        })
      }
      else {
        app.loading()
        wx.request({
          url: app.appData.host + '/resit',
          header: header,
          data: {
            cookie: app.globalData.cookie,
            xh: app.globalData.xh,
            xm: app.globalData.xm,
          },
          success: function (res) {
            app.hide()
            that.setData({ res: res.data })
                           var str=res.data
               if(str.indexOf("StringIndexOutOfBounds")!=-1){
                 that.setData({noBuk:'没有补考数据，您不需要补考！'})
               }
            console.log(res.data);
          }
        })
      }
    // wx.showModal({
    //   title: '错误',
    //   content: '15周前不提供考试安排查询！（是否需要查询补考考场？）',
    //   showCancel:true,
    //   success: function (res) {
    //     if (res.confirm) {
    //       if (app.appData.userinfo == null) {
    //         wx.navigateTo({
    //           url: '/mypages/login/index',
    //         })
    //       }
    //       else{
    //       app.loading()
    //       wx.request({
    //         url: app.appData.host + '/resit',
    //         header: header,
    //         data: {
    //           cookie: app.globalData.cookie,
    //           xh: app.globalData.xh,
    //           xm: app.globalData.xm,
    //         },
    //         success: function (res) {
    //           app.hide()
    //           that.setData({ res: res.data })
    //           var str=res.data
    //           if(str.indexOf("StringIndexOutOfBounds")!=-1){
    //             wx.showToast({
    //               title: '您不需要补考',
    //               icon:'success'
    //             })
    //           }
    //           else{
    //             console.log(res.data);
    //             wx.navigateTo({
    //               url: '../main/exam/index',
    //             })
    //           }
             
    //         }
    //       })
    //     }
    //   }
    //   }
    // })
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
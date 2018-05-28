// mypages/main/ykt/index.js
const app = getApp();
var header = app.globalData.header;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    balance:null,
    account:null,
    xm:null,
    xh:null,
    last_time:new Date().getMonth()+'月 '+new Date().getDate()+'日 '+new Date().getHours()+'时'
    
  },



search:function(){
  app.loading()
  wx.request({
    url: app.appData.host+'/payment',
    header: header,
    data: {
      cookie: app.globalData.cookie_ykt,
      xh: app.globalData.xh,
      account: app.globalData.account,
    },
    success: function (res) {
      app.hide()
      console.log(res.data);
      app.appData.flow=res.data.rows;
      wx.navigateTo({
        url: 'flow/flow',
      })
    }
  })
},
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // wx.showModal({
    //   title: '功能暂停使用',
    //   content: '由于某些因素，该功能暂停使用，恢复时间待定。',
    //   showCancel:false,
    //   success:function(){
    //     wx.navigateBack({
    //       delta: 1
    //     })
    //   }
    // })

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
  var that=this;

    if (app.appData.userinfo == null) {
      wx.navigateTo({
        url: '/mypages/login/index',
      })
    }
    else {
      //app.appData.mins = new Date().getMinutes()
     // app.loading()
      wx.request({
        url: app.appData.host+'/idcard',
        header: header,
        data: {
          cookie: app.globalData.cookie_ykt,
          xh: app.globalData.xh,
        },
        success: function (res) {
          app.globalData.account = res.data.account;
          console.log(res.data);
          if(that.data.account==null){
          that.setData({ balance: parseFloat(res.data.db_balance) + parseFloat(res.data.unsettle_amount) + '￥' ,account: res.data.account,xm:res.data.xm,xh:res.data.xh})}
          else{
            that.setData({ balance: parseFloat(res.data.db_balance) + parseFloat(res.data.unsettle_amount) + '￥' })
          }
         // app.hide()
        }
      })
    }
   
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
const app = getApp()
var header = app.globalData.header;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    username: null,
    name: null,
    info:null,
    balance:null,
    size:null,
    userInfo:null,
    display:false,
    sMore:false
  },
  showMore: function(){
    var t=this.data.sMore
    this.setData({sMore:!t})
    console.log(t)
  },
  displayBalance: function(){
    
    var that=this;
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
            that.setData({ display:true,balance: parseFloat(res.data.db_balance) + parseFloat(res.data.unsettle_amount) + '￥' })
          }
        })

 },
  deleteSto: function(){
    wx.showModal({
      title: '⚠清除数据',
      content: '你确定要清除所有的数据吗？',
      confirmColor:'#DC143C',
      success: function (res) {
        if (res.confirm) {
          wx.showToast({
            title: '清除成功',
            icon:'success',
            duration:1000
          })
          wx.clearStorage()
        }
      }
    })

  },
  linkToLog: function(){
    wx.navigateTo({
      url: 'log/log',
    })
  },
  wxLogin: function(){
    var that = this
    //调用应用实例的方法获取全局数据  
    app.getUserInfo(function (userInfo) {
      //更新数据  
      that.setData({
        userInfo: userInfo
      })
      wx.setStorageSync('userinfo', userInfo)
    })  
     
      
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   
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
    
    var that = this;
    if (app.appData.userinfo == null) {
      wx.navigateTo({
        url: '../login/index',
      })
    }
    else {
      this.setData({ userInfo: wx.getStorageSync('userinfo') })
      app.appData.mins = new Date().getMinutes()
     console.log(wx.getStorageSync('info'))
     if(wx.getStorageSync('info')==''){

      wx.request({
        url: app.appData.host+'/info',
        header: header,
        data: {
          cookie: app.globalData.cookie,
          xh: app.globalData.xh,
          xm: app.globalData.xm,
        },
        success: function (res) {
          console.log(res.data);
          that.setData({ info: res.data })
          wx.setStorageSync('info', that.data.info)
        }
        
      })}
      else{
       this.setData({ info: wx.getStorageSync('info')})
      }
        // wx.request({
        //   url: app.appData.host+'/idcard',
        //   header: header,
        //   data: {
        //     cookie: app.globalData.cookie_ykt,
        //     xh: app.globalData.xh,
        //   },
        //   success: function (res) {
        //     app.globalData.account = res.data.account;
        //     console.log(res.data);
        //     that.setData({ balance: parseFloat(res.data.db_balance) + parseFloat(res.data.unsettle_amount) + '￥' })
        //   }
        // })
      
      this.setData({ name: app.globalData.xm })
      wx.setStorageSync("firstTime", false)
     
      wx.setStorageSync('name', this.data.name)



      let username = wx.getStorageSync('username')
      let name = wx.getStorageSync('name')
      this.setData({ username, name})
      var that=this;
      wx.getStorageInfo({
        success: function (res) {
          that.setData({ size: res.currentSize});
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
    // var that=this;
    // wx.request({
    //   url: app.appData.host+'/idcard',
    //   header: header,
    //   data: {
    //     cookie: app.globalData.cookie_ykt,
    //     xh: app.globalData.xh,
    //   },
    //   success: function (res) {
    //     app.globalData.account = res.data.account;
    //     console.log(res.data);
    //     that.setData({ balance: parseFloat(res.data.db_balance) + parseFloat(res.data.unsettle_amount) + '￥' })
    //   }
    // })
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
      title: 'ZustHelper',
      desc: '「ZustHelper」。',
      path: '/mypages/index/index'
    }
  }
})
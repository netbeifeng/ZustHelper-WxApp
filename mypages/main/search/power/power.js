const app=getApp();
var header = app.globalData.header;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    username: wx.getStorageSync('username'),
    password:null
  },
 
  usernameInput: function (e) {

    this.setData({
      username: e.detail.value
    })
    console.log(this.data.username);
  },
  
  passwordInput: function (e) {

    this.setData({
      password: e.detail.value
    })
    console.log(this.data.password);
  },
  btnClick:function(){
    var that=this
    var pa = ""+this.data.password;
    if (this.data.username == null) {
      wx.showModal({
        content: '请输入学号和密码',
        showCancel: false
      })
    }
    else if (pa.length!=6){
      wx.showModal({
        content: '密码为6位！',
        showCancel: false
      })
    }
    else{
      app.loading()
    wx.request({
      url: 'https://api.ekuralc.cn/zusthelper/power',
      header: header,
      data: {
        postcode: 'login',
        xh: that.data.username,
        xm: that.data.password,
      },
      success: function (res) {
        app.hide()
        console.log(res.data)
        wx.setStorageSync('passp',that.data.password)
        app.globalData.cookie_vx = res.data[0].value;
        
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
    if(wx.getStorageSync('passp')){
      this.setData({ password: wx.getStorageSync('passp'),username: wx.getStorageSync('username')})
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
    
  }
})
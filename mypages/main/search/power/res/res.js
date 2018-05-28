const app= getApp()
var header = app.globalData.header;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    gy: ["西和公寓", "东和公寓", "后勤附属楼"],
    mo: ["请选择金额", "10", "20", "30", "40", "50", "0.01"],
    moIndex:0,
    gyIndex: 0,
    roomNum: null,
    msg:'请先查询！'
  },
  searchPower: function(){
    var area;
    if (this.data.gyIndex==0){
      area='XH'
    }
    else if(this.data.gyIndex==1){
      area='DH'
    }
    else if(this.data.gyIndex==2){
      area='HQ'
    }
    console.log(area)
    var that=this;
    wx.showLoading({
      title: '查询中...',
    })
    wx.request({
      url: 'https://api.ekuralc.cn/zusthelper/power',
      header: header,
      data: {
        postcode: 'search',
        room: that.data.roomNum,
        area: area,
        cookie: app.globalData.cookie_vx
      },
      success: function (res) {
        wx.hideLoading()
        console.log(res.data)
        var str = res.data;
        if (!str.resp) {
          wx.showToast({
            duration: 1000,
            title: '再试一次哦',
          })
        }
        else{
        wx.setStorageSync('room', that.data.roomNum)
        wx.setStorageSync('gyi', that.data.gyIndex)
        that.setData({msg:res.data.resp})}
        wx.pageScrollTo({
          scrollTop: 100
        })
      }
    })
  },
  SendPower:function(){
    var area;
    if (this.data.gyIndex == 0) {
      area = 'XH'
    }
    else if (this.data.gyIndex == 1) {
      area = 'DH'
    }
    else if (this.data.gyIndex == 2) {
      area = 'HQ'
    }
    var that = this;
    if (this.data.gyIndex == 1) {
      this.setData({ msg: '东和公寓暂时无法通过该系统送电' })
      wx.pageScrollTo({
        scrollTop: 100
      })
    }else{
    wx.showLoading({
      title: '送电中...',
    })
    wx.request({
      url: 'https://api.ekuralc.cn/zusthelper/power',
      header: header,
      data: {
        postcode: 'spow',
        room: that.data.roomNum,
        area: area,
        cookie: app.globalData.cookie_vx
      },
      success: function (res) {
        
        wx.hideLoading()
        var str = res.data;
        if (!str.resp) {
          wx.showToast({
            duration: 1000,
            title: '再试一次哦',
          })
        }
        else {
        wx.setStorageSync('room', that.data.roomNum)
        wx.setStorageSync('gyi', that.data.gyIndex)
        console.log(res.data)
        that.setData({ msg: res.data.resp })
        wx.pageScrollTo({
          scrollTop: 100
        })
      }
      }
    })}
  },
  SendLight: function(){
    var area;
    if (this.data.gyIndex == 0) {
      area = 'XH'
    }
    else if (this.data.gyIndex == 1) {
      area = 'DH'
    }
    else if (this.data.gyIndex == 2) {
      area = 'HQ'
    }
    
    var that = this;
    if (this.data.gyIndex == 1) {
      this.setData({ msg: '东和公寓暂时无法通过该系统送电' })
      wx.pageScrollTo({
        scrollTop: 100
      })
    }
    else{
      wx.showLoading({
        title: '送电中...',
      })
    wx.request({
      url: 'https://api.ekuralc.cn/zusthelper/power',
      header: header,
      data: {
        postcode: 'slig',
        room: that.data.roomNum,
        area: area,
        cookie: app.globalData.cookie_vx
      },
      success: function (res) {
        wx.hideLoading()
        var str = res.data;
        if (!str.resp) {
          wx.showToast({
            duration: 1000,
            title: '再试一次哦',
          })
        }
        else {
        wx.setStorageSync('room', that.data.roomNum)
        wx.setStorageSync('gyi', that.data.gyIndex)
        console.log(res.data)
        that.setData({ msg: res.data.resp })
        wx.pageScrollTo({
          scrollTop: 100
        })
      }}
    })}
  },
  charge:function(){
    if(this.data.moIndex==0&&this.data.gyIndex!=1){
      wx.showModal({
        title: '错误',
        content: '请选择金额！！啊！！！',
        showCancel:false
      })
    }
    else{
      var area;
      if (this.data.gyIndex == 0) {
        area = 'XH'
      }
      else if (this.data.gyIndex == 1) {
        area = 'DH'
      }
      else if (this.data.gyIndex == 2) {
        area = 'HQ'
      }
    var that = this;
    wx.showLoading({
      title: '充值中...',
    })
    wx.request({
      url: 'https://api.ekuralc.cn/zusthelper/power',
      header: header,
      data: {
        postcode: 'charge',
        room: that.data.roomNum,
        area: area,
        amount: that.data.moIndex,
        pass: wx.getStorageSync('passp'),
        cookie: app.globalData.cookie_vx
      },
      success: function (res) {
        wx.hideLoading()
        console.log(res.data)
        var str=res.data;
        if (!str.resp) {
          wx.showToast({
            duration: 1000,
            title: '再试一次哦',
          })
        }
        else {
        wx.setStorageSync('room', that.data.roomNum)
        wx.setStorageSync('gyi', that.data.gyIndex)
        that.setData({ msg: res.data.resp })}
        wx.pageScrollTo({
          scrollTop: 100
        })
      }
    })}
  },
  gyPicker: function (e) {
    this.setData({
      gyIndex: e.detail.value
    })
    console.log(this.data.gyIndex)
  },
  moPicker: function (e) {
    this.setData({
      moIndex: e.detail.value
    })
  },
  roomNumInput: function (e) {

    this.setData({
      roomNum: e.detail.value
    })
    console.log(this.data.roomNum);
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (!wx.getStorageSync('gyi')){
      wx.setStorageSync('gyi', '0')
    }
    if(wx.getStorageSync('room')){
      this.setData({ roomNum: wx.getStorageSync('room'),gyIndex: wx.getStorageSync('gyi')})

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
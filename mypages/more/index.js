// pages/more/index.js
const GLOBAL_DATA_SAVE_KEY = '__gloabl_data__'
const app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },
  toGame: function () {
    let i;
    i = parseInt(Math.random() * 3 + 1);
    console.log(i)
    switch (i) {
      case 1: wx.navigateTo({
        url: '../more/2k/test'
      }); break;
      case 2: wx.navigateTo({
        url: '../more/sudo/pages/index/index'
      }); break;
      case 3: wx.navigateTo({
        url: '../more/24p/pages/index/index',
      }); break;
    }


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
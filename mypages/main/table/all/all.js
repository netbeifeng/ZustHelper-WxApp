const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    listData: '',
    firstc:'',
    secondc:'',
    thirdc:'',
    fourthc:'',
    fifthc:'',
    expc:''
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
    let data = wx.getStorageSync("kebiao_cur_all")
    wx.setStorageSync('help', 'data')
    //app.appData.mins = new Date().getMinutes()
    let first = data[0]
    let second = data[1]
    let third = data[2]
    let fourth = data[3]
    let fifth = data[4]
    let experence = data[5]
    this.setData({ listData: data, firstc: first, secondc: second, thirdc: third, fourthc: fourth, fifthc: fifth, expc: experence })
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
const app = getApp()
var header = app.globalData.header;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    bookData:''
  },
 

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var link=options.linkid;
    var that=this;
    app.loading()
    wx.request({
      url: app.appData.host+'/library',
      header: header,
      data: {
        cookie: app.globalData.cookie,
        link: 'Book.aspx?id='+link,
        postcode: 'detail',
      },
      success: function (res) {
        app.hide()
        console.log(res.data);
        that.setData({bookData:res.data})
      }
    })
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
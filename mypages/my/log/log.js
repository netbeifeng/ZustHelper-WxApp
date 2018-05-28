// mypages/login/protocol/protocol.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
liebe: function(){
  wx.showModal({
    title: 'Geheim Nachricht an Sissi',
    content: 'Sonne kann nicht ohne Schein, Mensch nicht ohne Liebe sein. Weißt du, Sissi. Ich ... lie.. bedanke dich. Ja ja..',
    showCancel:false
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
      title: 'ZustHelper',
      desc: '「ZustHelper」。',
      path: '/mypages/index/index'
    }
  }
})
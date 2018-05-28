const app = getApp()
var header = app.globalData.header;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    bookData:null,
    page:null,
    key:null,
    booknum:null,
    alert:false
  },
 

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let data = app.appData.bookData;
    let pagen = app.globalData.lastpage;
    let bookn = app.globalData.pagenum;
    let k = app.appData.key;
    this.setData({ page: pagen, bookData: data, key: k, booknum: bookn })
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
    if(this.data.booknum>0){
    var that=this;
    app.appData.mins = new Date().getMinutes()
    app.loading()
    wx.request({
      url: app.appData.hostm+'/library',
      header: header,
      data: {
        cookie: app.globalData.cookie,
        searchkey: that.data.key,
        lastpage: app.globalData.lastpage,
        pagenum: app.globalData.pagenum,
        view: app.globalData.view,
        even: app.globalData.even,
        postcode: 'more'
      },
      success: function (res) {
        console.log(res.data);
        app.appData.key = that.data.searchKey;
        app.appData.bookData = res.data[1];
        app.globalData.lastpage = res.data[0][0].lastpage;
        app.globalData.pagenum = res.data[0][0].pagenum;
        app.globalData.view = res.data[0][0].__VIEWSTATE;
        app.globalData.even = res.data[0][0].__EVENTVALIDATION;
        that.setData({ bookData: app.appData.bookData, page: app.globalData.lastpage, booknum: app.globalData.pagenum})
        wx.pageScrollTo({
          scrollTop: 0
        })
        app.hide()
      }
    })
    }
    else{
      var al=true;
      this.setData({alert:al})
      wx.showToast({
        title: '到底啦',
        
      })
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    return {
      title: this.data.key + ' 查询结果',
      path: 'mypages/index/index'
    }
  }
})
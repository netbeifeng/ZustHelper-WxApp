const app = getApp();
var header=app.globalData.header;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    info: '',
    searchKey: null
  },
  searchKeyInput: function (e) {
    this.setData({
      searchKey: e.detail.value
    })
  },
 my:function(){
wx.navigateTo({
  url: 'mylib/mylib',
})
 },
  search: function () {
    var that=this;
    if (!this.data.searchKey) {
      wx.showModal({
        content: '请输入书名，例如：挪威的森林',
        showCancel: false
      })
    } 
    else {
      app.loading()
      wx.request({
        url: app.appData.hostm+'/library',
        header: header,
        data: {
          cookie: app.globalData.cookie,
          searchkey: that.data.searchKey,
          postcode: 'first',
        },
        success: function (res) {
          app.hide()
          if(res.data.pagenum==0){
            wx.showToast({
              title: '呀！没找到呢',
              duration:500
            })
          }
          else{
            
          console.log(res.data);
          app.appData.key=that.data.searchKey;
          app.appData.bookData=res.data[1];
          app.globalData.lastpage = res.data[0][0].lastpage;
          app.globalData.pagenum = res.data[0][0].pagenum;
          app.globalData.view = res.data[0][0].__VIEWSTATE;
          app.globalData.even = res.data[0][0].__EVENTVALIDATION;
          wx.navigateTo({
            url: 'res/res',
          })
        }
        }
      })
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      if(app.appData.userinfo==null){
        wx.navigateTo({
          url: '/mypages/login/index',
        })
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
    return {
      title: '浙科院校园助手',
      desc: '「浙科院校园助手」。',
      path: '/mypages/index/index'
    
    }
  }
})
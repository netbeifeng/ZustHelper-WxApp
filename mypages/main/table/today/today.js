const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    today:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let tod =app.globalData.todayClass
    console.log(tod)
    let pick,bottom,top;
   for(let i=0;i<5;i++){
     pick = tod[i][1].substring(tod[i][1].lastIndexOf("第") + 1, tod[i][1].length - 2)
     console.log(pick)
   switch (pick.length) {
      case 3: bottom = parseInt(pick.charAt(0)); top = parseInt(pick.charAt(2)); break;
      case 4: bottom = parseInt(pick.charAt(0)); top = parseInt(pick.charAt(2) + "" + pick.charAt(3)); break;
      case 5: bottom = parseInt(pick.charAt(0) + "" + pick.charAt(1)); top = parseInt(pick.charAt(3) + "" + pick.charAt(4)); break;
    }
    console.log(top+"  "+bottom)
    if (app.appData.weeks < bottom || app.appData.weeks > top) {
      tod[i]=null;
    }
  console.log(tod)
   }
    // switch (pick.length) {
    //   case 3: bottom = parseInt(pick.charAt(0)); top = parseInt(pick.charAt(2)); break;
    //   case 4: bottom = parseInt(pick.charAt(0)); top = parseInt(pick.charAt(2) + "" + pick.charAt(3)); break;
    //   case 5: bottom = parseInt(pick.charAt(0) + "" + pick.charAt(1)); top = parseInt(pick.charAt(3) + "" + pick.charAt(4)); break;
    // }
    // if (this.data.week < bottom || this.data.week > top) {
    //   theNowTime = "null";
    //   kurs = "呀"
    // }
    this.setData({today:tod})
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
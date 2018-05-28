const app=getApp();
var header=app.globalData.header;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs: ["当前学期课表", "其它学期课表"],
    xn: ["2016-2017","2017-2018"],
    xq:["1","2"],
    xnIndex: 1,
    xqIndex:0,
    activeIndex: 0,
    classTab: null,
  },
  tabClick: function (e) {
    this.setData({
      activeIndex: e.currentTarget.id
    })
  },

  xnPicker: function (e) {
    this.setData({
      xnIndex: e.detail.value
    })
  },
  xqPicker: function (e) {
    this.setData({
      xqIndex: e.detail.value
    })
  },
  searchToday: function () {
    if (this.data.activeIndex == 0) {
      var data=wx.getStorageSync("kebiao_cur_all")
        if(data){
          var weekDay = new Date().getDay();
          var today = new Array()
          if(weekDay==0){

            today[0] = data[0][6]
            today[1] = data[1][6]
            today[2] = data[2][6]
            today[3] = data[3][6]
            today[4] = data[4][6]

          }
          else{
            today[0] = data[0][weekDay - 1]
            today[1] = data[1][weekDay - 1]
            today[2] = data[2][weekDay - 1]
            today[3] = data[3][weekDay - 1]
            today[4] = data[4][weekDay - 1]

          }
          app.globalData.todayClass=today;
          console.log(data)
          console.log(today)
          wx.navigateTo({
            url: 'today/today',
          })
        }
       else{
         wx.showModal({
           title: '出错啦',
           content: '必须先查询一次全部课表哦~',
           showCancel: false
         })
       }
      }
     
  },
  searchAll: function () {

    if (this.data.activeIndex == 0) {
      //if(!wx.getStorageSync('kebiao_cur_all')){//新学期后打开
        app.loading()
      wx.request({
        url: app.appData.host+'/table',
        header: header,
        data: {
          cookie: app.globalData.cookie,
          xh: app.globalData.xh,
          xm: app.globalData.xm,
          postcode: 'normal',
        },
        success: function (res) {
          console.log(res.data);
          wx.setStorageSync("kebiao_cur_all",res.data)
          wx.setStorageSync("kebiaosign", true)
          app.hide()
          wx.navigateTo({
            url: 'all/all'
          })
        }
      }) 
    //}
    // else{
    //   wx.navigateTo({
    //     url: 'all/all',
    //   })
    //}
    }
     else {
      if (this.data.xn[this.data.xnIndex] == "2017-2018" && this.data.xq[this.data.xqIndex]=="2"){
        wx.showModal({
          title: '错误',
          content: '禁止查询在此页面查询本学期课表！',
          showCancel:false
        })
      }
      else{
       var that=this;
       app.loading()
      wx.request({
        url: app.appData.host+'/table',
        header: header,
        data: {
          cookie: app.globalData.cookie,
          xh: app.globalData.xh,
          xm: app.globalData.xm,
          // xnd: '2017-2018',
          // xqd:'2',
          xnd: that.data.xn[that.data.xnIndex],
          xqd: that.data.xq[that.data.xqIndex],
          postcode: 'special'
        },
        success: function (res) {
          
          console.log(res.data);
          wx.setStorageSync("kebiao_old_all", res.data)
          app.hide()
          wx.navigateTo({
            url: 'allo/allo'
          })
        }
      })
      
    }
  }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (wx.getStorageSync('username') == '') {
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
      title: '课表查询',
      desc: '「文经课表」提供烟台大学文经学院在校生班级与教师课表和空闲教室、图书馆藏及考试安排等查询服务。',
      path: '/pages/core/table/index'
    }
  }
})
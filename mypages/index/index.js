const app = getApp()
const newDate = new Date()
const getDate = () => newDate.getFullYear() + '/' + (newDate.getMonth() + 1) + '/' + newDate.getDate()
const getDay = () => " 星期" + "日一二三四五六".charAt(new Date().getDay())

Page({

  /**
   * 页面的初始数据
   */
  data: {
    today: '', //今日课程
    todayWeek: '', //开学周期 week周 day星期
    theDay: '', //今日时间
    zeichen:null,
    hour:'',
    now:'error',
    help:'',
    nowClass:'',
    week:'',
    min:''
  },
  toAll: function(){
    wx.navigateTo({
      url: '../main/table/all/all',
    })
  },
  toHelp: function () {
    wx.navigateTo({
      url: '../more/help/help'
    })
  },

  setTodayClassName: function () {
    wx.navigateTo({
      url: '../login/index'
    })
  },

  changeCampus: function(){
    if(app.appData.xiaoqu==1){
      app.appData.xiaoqu=3
      wx.showToast({
        title : '安吉校区~',
        icon: 'success',
        duration: 700
      })
    }
    else{
      app.appData.xiaoqu = 1
      wx.showToast({
        title: '小和山校区~',
        icon: 'success',
        duration: 700
      })
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
    console.log("load-----")
    var sDate = new Date("2018/03/05");
    var today = new Date()
    today = new Date(today.getFullYear() + "/" + (today.getMonth() + 1) + "/" + today.getDate());
    var dateDiff = today - sDate;
    var oneDay = 24 * 60 * 60 * 1000
    dateDiff = parseInt(dateDiff / oneDay);
    var weekLen = 7
    var weekStart = sDate.getDay();
    var weekLeave = weekLen - weekStart;
    var weekk = Math.ceil((dateDiff - weekLeave) / weekLen) + 1;

    let sign=app.appData.userinfo;
    let hourr = newDate.getHours();
    let day = getDate(newDate) + " " + getDay(newDate) + "         第"+weekk+"周";
    this.setData({ theDay: day, hour: hourr , week:weekk})
    var helpp=wx.getStorageSync('help')
    this.setData({ zeichen:sign})
    app.appData.weeks=weekk
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
    console.log("show-----")
    
  console.log(app.appData.hours+"   "+app.appData.mins)//以后改成毫秒，就不用管小时了
    this.setData({hour:new Date().getHours(),min:new Date().getMinutes()})
    if(app.appData.mins&&this.data.hour-app.appData.hours>0&&this.data.min-app.appData.mins>=-50){
      app.appData.mins = this.data.min
      app.appData.hours = this.data.hour

   // else{
        wx.showLoading({
          title: '重新登录...',
          mask: true
        })
        wx.request({
          url: app.appData.host+'/login',
          data: {
            username: wx.getStorageSync('username'),
            password: wx.getStorageSync('password'),
          },
          method: 'GET',
          header: {
            'content-type': 'application/json' // 默认值
          },
          success: function (res) {
            wx.hideLoading()
            if (res.data.resp) {
              wx.showToast({
                title: '登录超时，请重试',
                icon: 'fail',
                duration: 900
              })
            }
            else {
              var str = res.data;
              console.log(str)
              if (!str.xh) {
                if (str.isSuccess == false) {
                  wx.showToast({
                    title: '密码错误',
                    icon: 'fail',
                    duration: 1000
                  })

                }
              }
              else {
                app.globalData.header.Cookie = 'JSESSIONID=' + res.data.Id;
                app.globalData.cookie_ykt = res.data.Cookie_ykt;
                app.globalData.cookie = res.data.Cookie;
                app.globalData.xh = res.data.xh;
                app.globalData.xm = res.data.xm;
                app.globalData.cookielib = res.data.Cookie_lib;

                wx.showToast({
                  title: '登录成功',
                  icon: 'success'
                })
              }
            }
          },
          fail: function (res) {

            wx.showToast({
              title: '登录失败',
              icon: 'fail'
            })
            console.log(".....fail.....");
            console.log(res.data)
          }
        })
    //}
  }

    if (app.appData.mins &&this.data.min-app.appData.mins>9){
      app.appData.mins=this.data.min
      
    //  else{
        wx.showLoading({
          title: '重新登录...',
          mask: true
        })
        wx.request({
          url: app.appData.host+'/login',
          data: {
            username: wx.getStorageSync('username'),
            password: wx.getStorageSync('password'),
          },
          method: 'GET',
          header: {
            'content-type': 'application/json' // 默认值
          },
          success: function (res) {
            app.hide();
            if (res.data.resp) {
              wx.showToast({
                title: '登录超时，请重试',
                icon: 'fail',
                duration: 900
              })
            }
            else {
              var str = res.data;
              console.log(str)
              if (!str.xh) {
                if (str.isSuccess == false) {
                  wx.showToast({
                    title: '密码错误',
                    icon: 'fail',
                    duration: 1000
                  })

                }
              }
              else {
                app.globalData.header.Cookie = 'JSESSIONID=' + res.data.Id;
                app.globalData.cookie_ykt = res.data.Cookie_ykt;
                app.globalData.cookie = res.data.Cookie;
                app.globalData.xh = res.data.xh;
                app.globalData.xm = res.data.xm;
                app.globalData.cookielib = res.data.Cookie_lib;

                wx.showToast({
                  title: '登录成功',
                  icon: 'success'
                })
              }
            }
          },
          fail: function (res) {

            wx.showToast({
              title: '登录失败',
              icon: 'fail'
            })
            console.log(".....fail.....");
            console.log(res.data)
          }
        })
     // }
    }
    let kurs;

    var helpp = wx.getStorageSync('help')
    this.setData({ help: helpp})
    if(wx.getStorageSync('password')){this.setData({zeichen:true})}
    if (this.data.zeichen != null && wx.getStorageSync('kebiaosign')) {
      let data = wx.getStorageSync("kebiao_cur_all")
      let bottom
      let top
      let first = data[0]
      let second = data[1]
      let third = data[2]
      let fourth = data[3]
      let fifth = data[4]
      let weekDay = new Date().getDay();
      let theNowTime;
      if (this.data.hour>=6&&this.data.hour<9&&app.appData.xiaoqu==1){//小和山
        if(weekDay==0){
          theNowTime=first[6];
        }
        else{
          theNowTime =first[weekDay - 1];
        }
          kurs="1";
      }
      else if (this.data.hour >= 6 && this.data.hour < 9 && app.appData.xiaoqu == 3){//安吉
        if (weekDay == 0) {
          theNowTime = first[6];
        }
        else {
          theNowTime = first[weekDay - 1];
        }
        kurs="1"
      }
      else if (this.data.hour >= 9 && this.data.hour<12){
        
        if (weekDay == 0) {
          theNowTime = second[6];
        }
        else {
          theNowTime = second[weekDay - 1];
        }
        //if (theNowTime[1].charAt(7) == '5')
          kurs = "2";
          console.log(theNowTime)
        // else
        //   kurs = "3/4";
      }
      else if (this.data.hour >= 12 && this.data.hour<15){
        if (weekDay == 0) {
          theNowTime = third[6];
        }
        else {
          theNowTime = third[weekDay - 1];
        }
        kurs="3"
      }
      else if (this.data.hour >= 15 && this.data.hour<17){
        if (weekDay == 0) {
          theNowTime = fourth[6];
        }
        else {
          theNowTime = fourth[weekDay - 1];
        }

        kurs="4"
      }
      else if (this.data.hour >= 17 && this.data.hour<=21){
        if (weekDay == 0) {
          theNowTime = fifth[6];
        }
        else {
          theNowTime = fifth[weekDay - 1];
        }
        // if (theNowTime[1].charAt(9) == '1')
        //   kurs = "10/11/12";
        //else
          kurs = "5";
      }
      else{
        theNowTime="null";
        kurs="呀" 
      }
      if(theNowTime!="null"){
        if(theNowTime[0].length<1){
          theNowTime = "null";
          kurs = "呀" 
        }
      }
       var pick = theNowTime[1].substring(theNowTime[1].lastIndexOf("第")+1, theNowTime[1].length-2)
       console.log(theNowTime)
      switch(pick.length){
        case 3: bottom = parseInt(pick.charAt(0)); top = parseInt(pick.charAt(2));break;
        case 4: bottom = parseInt(pick.charAt(0)); top = parseInt(pick.charAt(2)+""+pick.charAt(3));break;
        case 5: bottom = parseInt(pick.charAt(0) + "" + pick.charAt(1)); top = parseInt(pick.charAt(3) + "" + pick.charAt(4));break;
      }
      if(this.data.week<bottom||this.data.week>top){
        theNowTime = "null";
        kurs = "呀" 
      }
      this.setData({now:theNowTime,nowClass:kurs})
    }
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
    wx.reLaunch({
      url: 'index'
    })
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
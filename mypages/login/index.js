//login.js
//获取应用实例
var app = getApp();
Page({
  data: {
    remind: '加载中',
    help_status: false,
    userid_focus: false,
    passwd_focus: false,
    username: null,
    password: null,
    angle: 0
  },
  copya: function () {
    wx.showModal({
      title: '复制网址',
      content: '由于小程序不支持外链，已为您复制链接，请将链接复制到浏览器打开更改。',
      showCancel: false
    })
    wx.setClipboardData({
      data: 'authserver.zust.edu.cn/authserver/index.do',
      success: function (res) {
        wx.getClipboardData({
          success: function (res) {
            console.log(res.data) // data
          }
        })
      }
    })
  },
  onReady: function () {
    var _this = this;
    setTimeout(function () {
      _this.setData({
        remind: ''
      });
    }, 1000);
    wx.onAccelerometerChange(function (res) {
      var angle = -(res.x * 30).toFixed(1);
      if (angle > 14) { angle = 14; }
      else if (angle < -14) { angle = -14; }
      if (_this.data.angle !== angle) {
        _this.setData({
          angle: angle
        });
      }
    });
  },
  onLoad: function (options) {
    let username = wx.getStorageSync('username')
    let password = wx.getStorageSync('password')
    this.setData({username, password})

  },
  bind: function () {
    var that = this;
    app.appData.userinfo = { username: this.data.username, password: this.data.password };
    if (this.data.username == null) {
      wx.showModal({
        content: '请输入学号和密码',
        showCancel: false
      })
    } else {
      app.loadingx();
      wx.request({
        url: app.appData.host + '/login',
        data: {
          username: that.data.username,
          password: that.data.password,
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
              app.appData.mins = new Date().getMinutes()
              app.appData.hours = new Date().getHours()
              app.globalData.header.Cookie = 'JSESSIONID=' + res.data.Id;
              app.globalData.cookie_ykt = res.data.Cookie_ykt;
              app.globalData.cookie = res.data.Cookie;
              app.globalData.xh = res.data.xh;
              app.globalData.xm = res.data.xm;
              app.globalData.cookielib = res.data.Cookie_lib;
              //  wx.setStorageSync('xh', app.globalData.xh)
              //  wx.setStorageSync('xm', app.globalData.xm)
              //  wx.setStorageSync('cookie', app.globalData.cookie)
              //  wx.setStorageSync('cookie_ykt', app.globalData.cookie_ykt)
              //  wx.setStorageSync('Cookie', app.globalData.header.Cookie)
              //  wx.setStorageSync('cookielib', app.globalData.cookielib)

              wx.showToast({
                title: '登录成功',
                icon: 'success'
              })
              wx.navigateBack({
                delta: 1
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
      wx.setStorageSync('username', this.data.username)
      wx.setStorageSync('password', this.data.password)
      
    }

  },
  useridInput: function (e) {
    this.setData({
      username: e.detail.value
    });
    if (e.detail.value.length >= 10) {
      wx.hideKeyboard();
    }
  },
  passwdInput: function (e) {
    this.setData({
      password: e.detail.value
    });
  },
  inputFocus: function (e) {
    console.log(e.target)
    if (e.target.id == 'userid') {
      this.setData({
        'userid_focus': true
      });
    } else if (e.target.id == 'passwd') {
      this.setData({
        'passwd_focus': true
      });
    }
  },
  inputBlur: function (e) {
    if (e.target.id == 'userid') {
      this.setData({
        'userid_focus': false
      });
    } else if (e.target.id == 'passwd') {
      this.setData({
        'passwd_focus': false
      });
    }
  },
  tapHelp: function (e) {
    if (e.target.id == 'help') {
      this.hideHelp();
    }
  },
  showHelp: function (e) {
    this.setData({
      'help_status': true
    });
  },
  hideHelp: function (e) {
    this.setData({
      'help_status': false
    });
  },
  onShareAppMessage: function () {
    return {
      title: '浙科院校园助手',
      desc: '「浙科院校园助手」。',
      path: '/mypages/index/index'
    }
  },

});
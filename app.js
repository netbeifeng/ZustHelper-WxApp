import { degree } from 'mypages/more/sudo/utils/config.js'
App({
  onLaunch: function () {
    
    
  },
  autoLogin: function(){
    var that=this;
    console.log('App Launch')
    if(wx.getStorageSync('password')){
      that.loadingx()
      wx.request({
        url: that.appData.host+'/login',
        data: {
          username: wx.getStorageSync('username'),
          password: wx.getStorageSync('password'),
        },
        method: 'GET',
        header: {
          'content-type': 'application/json' // 默认值
        },
        success: function (res) {
          if (res.data.res) {
            that.hide()
            wx.showToast({
              title: '登录超时，请重试',
              icon: 'fail',
            })
            wx.navigateTo({
              url: 'mypages/login/login',
            })
          }
          else {
            that.appData.userinfo = { username: wx.getStorageSync('username'), password: wx.getStorageSync('password') };
            wx.hideToast()
            console.log(res.data);
            that.globalData.header.Cookie = 'JSESSIONID=' + res.data.Id;
            that.globalData.cookie_ykt = res.data.Cookie_ykt;
            that.globalData.cookie = res.data.Cookie;
            that.globalData.xh = res.data.xh;
            that.globalData.xm = res.data.xm;
            that.globalData.cookielib = res.data.Cookie_lib;
            that.appData.hours = new Date().getHours();
            that.appData.mins = new Date().getMinutes()
            wx.showToast({
              title: '登录成功',
              icon: 'success'
            })
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
    }
  },
  onShow: function () {
    console.log('App Show')
  },
  onHide: function () {
    console.log('App Hide')
  },
  getUserInfo: function (cb) {
    var that = this;
    if (this.wxData.userInfo) {
      typeof cb == "function" && cb(this.wxData.userInfo)
    } else {
      //调用登录接口  
      wx.login({
        success: function () {
          wx.getUserInfo({
            success: function (res) {
              that.wxData.userInfo = res.userInfo;
              typeof cb == "function" && cb(that.wxData.userInfo)
            }
          })
        }
      });
    }
  },  
  loading: function(){
    wx.showLoading({
      title: '数据加载中',
      mask: true
    })
  },
  loadingx: function () {
    wx.showLoading({
      title: '登录中...',
    })
  },
  hide: function(){
    wx.hideLoading()
  },
  appData:{
    host:'https://api.ekuralc.cn/zusthelper',
    hostm:'https://api.ekuralc.cn/zusthelper',
    userinfo:null,
    userStatus: false,
    stuNu: null,
    pass: null,
    emptyRoom:null,
    bookData:'',
    key:'',
    grade:'',
    flow:'',
    kebiaosign:false,
    xiaoqu:1,
    hours:'',
    mins:'',
    weeks:''
  },
  globalData: {
    cookie: '',
    cookie_ykt: '',
    cookielib: '',
    account: '',
    header: { 'Cookie': '' },
    xh: '',
    xm: '',
    lastpage: '',
    pagenum: '',
    view: '',
    even: '',
    viewmy:'',
    evenmy:'',
    bookn:'',
    todayClass:'',
    merge: '',//game 2048
    move: '',//game 2048
    deviceInfo: null,//game sudo
    shadeDegree: .3,//game sudo

    optimization: false,//game sudo
    requestHost: 'https://www.easy-mock.com/mock/59d100919cabc90bb5e5743c/sudoLite',//game sudo
    share: null,//game sudo
    degree: degree,//game sudo
    maxNum: 9
  },
  wxData:{
    userInfo:null
  },
  adapterDegree(shadeDegree, returnType = 'title') {
    let setDegree = parseInt(shadeDegree * 100)
    let title, range
    this.globalData.degree.map(item => {
      if (setDegree >= item.range[0] && setDegree <= item.range[1]) {
        title = item.title
        range = item.range
        // 好像并不会跳过剩余的循环
        return
      }
    })
    if (returnType === 'range') {
      return range
    }
    return title
  }
})

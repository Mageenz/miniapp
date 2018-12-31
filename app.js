const api = require('./api.js')
// import './lib/weapp-cookie.js'

App({
  onLaunch: function () {
    // wx.login({
    //   success(res) {
    //     if (res.code) {
    //       api.user.login({
    //         code: res.code,
    //         type: 3
    //       }).then(res => {
    //         console.log('login', res)
    //       })
    //     } else {
    //       console.log('登录失败！' + res.errMsg)
    //     }
    //   }
    // })
  },
  globalData: {
    userInfo: null,
    locationInfo: null,
    shopFiles: []
  }
})
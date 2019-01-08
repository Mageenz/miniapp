const api = require('./api.js')
// import './lib/weapp-cookie.js'

App({
  onLaunch: function () {
  },
  globalData: {
    userInfo: null,
    locationInfo: null,
    shopFiles: []
  }
})
const app = getApp()
const api = require('../../api.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  handleLogin() {
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          wx.login({
            success: res => {

              api.user.getSession({
                code: res.code
              }).then(res => {
                if (res.data.code === '0') {
                  let sessionKey = res.data.data

                  wx.getUserInfo({
                    success: res => {
                      console.log(res)

                      // 登录接口
                      api.user.login({
                        code: sessionKey,
                        type: 3,
                        data: JSON.stringify({
                          encryptedData: res.encryptedData,
                          iv: res.iv,
                          code: sessionKey
                        })
                      }).then(res => {
                        console.log('login res', res)
                      })
                    }
                  })
                }
              })
            }
          })
          
        }
      },
      fail: err => {

      }
    })
  },
  bindgetuserinfo(e) {
    console.log('e', e)
  },
  login() {
    api.user.login().then(res => {
      
      const SESSION = res.header['Set-Cookie'].split(';')[0].split('=')[1]
      wx.setStorage({
        key: 'SESSION',
        data: SESSION,
      })

      wx.switchTab({
        url: '/pages/index/index',
      })
    })
  },
  bindgetuserinfo(e) {
    return
    wx.login({
      success(res) {
        if (res.code) {
          // 获取sessionkey
          api.user.getSession({
            code: res.code
          }).then(res => {
            if(res.data.code === '0') {
              let sessionKey = res.data.data

              // 登录接口
              api.user.login({
                code: sessionKey,
                type: 3,
                data: JSON.stringify({
                  encryptedData: e.detail.encryptedData,
                  iv: e.detail.iv,
                  code: res.code
                })
              }).then(res => {
                console.log('login res', res)
              })
            }
          })
          
        } else {
          console.log('wx.login失败！' + res.errMsg)
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    return
    wx.login({
      success(res) {
        if (res.code) {
          api.user.login({
            code: res.code,
            type: 3
          }).then(res => {
            console.log('login', res)
          })
        } else {
          console.log('wx.login失败！' + res.errMsg)
        }
      }
    })
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
const app = getApp()
const api = require('../../api.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    disabled: true,
    sessionKey: ''
  },
  bindgetuserinfo(e) {
    console.log('e', e)
    if (e.detail.encryptedData) {
      api.user.login({
        code: this.data.sessionKey,
        type: 3,
        data: JSON.stringify({
          encryptedData: e.detail.encryptedData,
          iv: e.detail.iv,
          code: this.data.sessionKey
        })
      }).then(res => {
        const code = res.data.code

        if (code === 'WISDOM_10176') {
          // 未注册
          setTimeout(() => {
            wx.redirectTo({
              url: `/pages/register/register?code=${this.data.sessionKey}`
            })
          }, 1500)
        } else if (code === '0') {
          wx.setStorage({
            key: 'SESSION',
            data: res.header['Set-Cookie'].split(';')[0].split('=')[1]
          })
          wx.switchTab({
            url: '/pages/index/index',
          })
        }
      }).catch(err => {
        console.log('login fail', err)
        this.setData({
          disabled: true
        })
      })
    }
  },
  onLoad: function (options) {
    wx.login({
      success: res => {
        api.user.getSession({
          code: res.code
        }).then(res => {
          if (res.data.code === '0') {
            this.setData({
              sessionKey: res.data.data,
              disabled: false
            })
          }
        }).catch(err => {
          console.log('getsession fail', err)
        })
      },
      fail: err => {
        console.log('wx.login fail', err)
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
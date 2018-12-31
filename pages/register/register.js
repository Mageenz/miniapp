const api = require('../../api.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    disabled: true,
    time: 60,
    btntext: '获取验证码',
    form: {
      code: '',
      phone: '',
      invitationCode: '',
      smsCode: '',
      type: 3
    },
    disabled1: true
  },
  handleRegister() {
    this.setData({
      disabled1: true
    })
  },
  sendCode() {
    if (!/^1\d{10}$/.test(this.data.form.phone)) {
      wx.showToast({
        title: '格式错误',
        image: '/assets/images/warning.png'
      })
      return
    }
    this.setData({
      disabled: true
    })
    api.common.sendCode({
      phone: this.data.form.phone
    }).then(res => {
      if (res.data.code === '0') {
        wx.showToast({
          title: '发送成功',
        })
        let time = this.data.time
        this.setData({
          time: time--,
          btntext: `${time}秒`
        })
        const timer = setInterval(() => {
          if (time > 0) {
            this.setData({
              time: time--,
              btntext: `${time}秒`
            })
          } else {
            this.setData({
              time: 60,
              btntext: '获取验证码'
            })
            clearInterval(timer)
            this.setData({
              disabled: false
            })
          }
        }, 1000)
      } else {
        this.setData({
          disabled: false
        })
      }
    })
  },
  handleCodeInput(e) {
    if (/^1\d{10}$/.test(this.data.form.phone) && e.detail.value) {
      this.setData({
        'disabled1': false
      })
    }
  },
  handlePhoneInput(e) {
    if (/^1\d{10}$/.test(e.detail.value)) {
      this.setData({
        'form.phone': e.detail.value,
        'disabled': false,
      })
      if(this.data.form.smsCode) {
        this.setData({
          'disabled1': false
        })
      }
    } else {
      this.setData({
        'disabled': true
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
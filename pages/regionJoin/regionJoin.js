const util = require('../../utils/util.js')
const api = require('../../api.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    region: ['北京市', '北京市', '东城区'],
    isSending: false,
    btntext: '点击获取',
    time: 60,
    form: {
      areaId: '',
      cardNumber: '',
      cityId: '',
      name: '',
      phone: '',
      provId: '',
      reason: '',
      smsCode: '',
      type: 1
    }
  },
  handlePhoneInput(e) {
    this.setData({
      'form.phone': e.detail.value
    })
  },
  sendCode() {
    if(this.data.isSending) {
      return
    }
    if (!/^1\d{10}$/.test(this.data.form.phone)) {
      wx.showToast({
        title: '格式错误',
        icon: 'none'
      })
      return
    }
    this.setData({
      isSending: true
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
              btntext: '点击获取'
            })
            clearInterval(timer)
            this.setData({
              isSending: false
            })
          }
        }, 1000)
      } else {
        this.setData({
          isSending: false
        })
      }
    })
  },
  handleFormSubmit(e) {
    const form = this.data.form
    const codes = util.translateRegionNameToCode(this.data.region)
    const formData = e.detail.value

    form.areaId = codes[2]
    form.cityId = codes[1]
    form.provId = codes[0]
    form.cardNumber = formData.cardNumber
    form.name = formData.name
    form.phone = formData.phone
    form.reason = formData.reason
    form.smsCode = formData.smsCode

    api.agent.applyAgent(form).then(res => {
      if(res.data.code === '0') {
        wx.showToast({
          title: '提交成功',
        })

        setTimeout(() => {
          wx.navigateBack({
            delta: 1
          })
        }, 1500)
      }
    })
  },
  // 省市区picker事件
  handleRegionChange(e) {
    this.setData({
      region: e.detail.value
    })
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
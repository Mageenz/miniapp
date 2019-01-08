const api = require('../../api.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    form: {
      totalAmount: 0, // 消费总额
      notOfferAmount: 0, // 不参与优惠金额
      tradeCode: 2,
      paymentType: 1,
      couponsAmount: 0, //优惠金额
      businessId: '',
      payAmount: 0 // 实付金额
    },
    couponsRatio: '',
    disabled: false
  },
  handleSubmit() {
    this.setData({
      disabled: true
    })
    api.pay.payShop({
      totalAmount: this.data.form.totalAmount*100,
      notOfferAmount: this.data.form.notOfferAmount*100,
      tradeCode: 2,
      paymentType: 1,
      couponsAmount: this.data.form.couponsAmount*100,
      businessId: this.data.form.businessId,
      payAmount: this.data.form.payAmount*100
    }).then(res => {
      if(res.data.code === '0') {

      }
      this.setData({
        disabled: false
      })
    })
  },
  getCouponMoney() {
    try {
      const couponsAmount = (this.data.form.totalAmount - this.data.form.notOfferAmount) * (this.data.couponsRatio / 100)
      const payAmount = this.data.form.totalAmount - couponsAmount
      this.setData({
        'form.couponsAmount': couponsAmount.toFixed(2),
        'form.payAmount': payAmount.toFixed(2)
      })
    } catch(e) {
      this.setData({
        'form.couponsAmount': 0.00,
        'form.payAmount': 0.00
      })
    }
  },
  handletotalAmountInput(e) {
    this.setData({
      'form.totalAmount': e.detail.value
    })
    this.getCouponMoney()
  },
  handlenotOfferAmountInput(e) {
    this.setData({
      'form.notOfferAmount': e.detail.value
    })
    this.getCouponMoney()
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      couponsRatio: options.couponsRatio/100,
      'form.businessId': options.businessId
    })

    this.getCouponMoney()
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
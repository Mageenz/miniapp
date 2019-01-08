const api = require('../../api.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    info: null
  },
  handleDh() {
    const cash = (this.data.info.price) * (this.data.info.couponsRate / 100)
    api.admin.getTrans({
      exchanged: +cash,
      exchangedType: 2,
      type: 1
    }).then(res => {
      if(res.data.code === '0') {
        wx.showToast({
          title: '兑换成功',
        })
        setTimeout(() => {
          wx.navigateBack({
            delta: 1
          })
        }, 1500)
      }
    })
  },
  handleTx() {
    const cash = (this.data.info.price) * (this.data.info.couponsRate / 100)
    wx.navigateTo({
      url: `/pages/takeoutCash/takeoutCash?cash=${cash}`
    })
  },
  getCouponDetail() {
    api.admin.getCouponDetail().then(res => {
      if(res.data.code === '0') {
        this.setData({
          info: res.data.data
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getCouponDetail()
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
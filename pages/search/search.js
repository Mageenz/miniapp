const api = require('../../api.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    shops: null,
    form: {
      orderByField: 1,
      range: 0,
      size: 100,
      current: 1,
      lat: '',
      lng: '',
      name: ''
    },
    isLocationAuth: true
  },
  toShopDetail(e) {
    wx.navigateTo({
      url: `/pages/shopDetail/shopDetail?id=${e.currentTarget.dataset.id}`,
    })
  },
  handleConfirm(e) {
    this.setData({
      'form.name': e.detail.value
    })
    this.getLocation()
  },
  getLocation() {
    wx.getLocation({
      type: 'gcj02',
      success: res => {
        this.data.form.lat = res.latitude
        this.data.form.lng = res.longitude
        this.getShopList()
      },
      fail: err => {
        this.setData({
          isLocationAuth: false
        })
      }
    })
  },
  getShopList(resolve) {
    api.common.getShopList(this.data.form).then(res => {
      this.setData({
        shops: res.data.data.records || []
      })
      wx.stopPullDownRefresh()
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // this.getLocation()
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
    this.getShopList()
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
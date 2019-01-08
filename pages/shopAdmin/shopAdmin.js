const api = require('../../api.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    info: null,
    shopInfo: null,
  },
  getShopDetail(id) {
    api.admin.getShopDetail({id}).then(res => {
      this.setData({
        shopInfo: res.data.data
      })
    })
  },
  check() {
    api.admin.check().then(res => {
      if(res.data.code === '0') {
        this.getShopDetail(res.data.data.businessId)
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
    this.check()
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
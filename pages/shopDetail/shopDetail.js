const api = require('../../api.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: '',
    detail: null,
    isCollect: false,
    comments: []
  },
  checkCollection() {
    api.common.checkCollection({
      id: this.data.detail.detail.id
    }).then(res => {
      if(res.data.code === '0') {
        this.setData({
          isCollect: res.data.data
        })
      }
    })
  },
  handleCollect() {
    api.common.addCollection({
      businessId: this.data.detail.detail.id
    }).then(res => {
      if(res.data.code === '0') {
        wx.showToast({
          title: '收藏成功',
        })
        this.setData({
          isCollect: true
        })
      }
    })
  },
  handleUnCollect() {
    api.common.removeCollection({
      id: this.data.detail.detail.id
    }).then(res => {
      if (res.data.code === '0') {
        this.setData({
          isCollect: false
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.data.id = options.id
    this.getShopDetail()
    this.getComments()
  },
  getComments() {
    api.shop.getComments({
      businessId: this.data.id,
      current: 1,
      size: 100
    }).then(res => {
      this.setData({
        comments: res.data.data.records || []
      })
    })
  },
  getShopDetail() {
    wx.showNavigationBarLoading()
    api.shop.getShopDetail({
      id: this.data.id
    }).then(res => {
      this.setData({
        detail: res.data.data
      })
      this.checkCollection()
      wx.hideNavigationBarLoading()
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
    return {
      title: this.data.detail.business.name,
      path: `/pages/shopDetail/shopDetail?id=${this.data.detail.detail.id}`
    }
  }
})
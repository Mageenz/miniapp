const api = require('../../api.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    shops: [],
    isLoaded: false,
    ranges: [{
      value: 0,
      name: '全部'
    }, {
      value: 1,
      name: '500米'
    }, {
      value: 2,
      name: '1km'
    }, {
      value: 3,
      name: '3km'
    }, {
      value: 4,
      name: '5km'
    }],
    range: 0,
    filterForm: {
      orderByField: 1,
      isAsc: true,
      range: 0,
      size: 20,
      current: 1,
      lng: '',
      lat: '',
      categoryId: ''
    },
    isLocationAuth: true,
  },
  toShopDetail(e) {
    wx.navigateTo({
      url: `/pages/shopDetail/shopDetail?id=${e.currentTarget.dataset.id}`,
    })
  },
  handleRangeChange(e) {
    this.setData({
      range: e.detail.value,
      'filterForm.range': this.data.ranges[e.detail.value].value
    })
    this.getShopList()
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.data.filterForm.categoryId = options.id
    this.getLocation()
  },

  getLocation() {
    wx.getLocation({
      type: 'gcj02',
      success: res => {
        console.log('success', res)
        this.data.filterForm.lat = res.latitude
        this.data.filterForm.lng = res.longitude
        this.getShopList()
      },
      fail: err => {
        this.setData({
          isLocationAuth: false
        })
      }
    })
  },
  filterShopList(e) {
    this.setData({
      'filterForm.orderByField': e.currentTarget.dataset.type
    })
    this.getShopList()
  },
  getShopList(resolve) {
    wx.showNavigationBarLoading()
    api.common.getShopList(this.data.filterForm).then(res => {
      this.setData({
        isLoaded: true,
        shops: res.data.data.records || []
      })
      wx.hideNavigationBarLoading()
      wx.stopPullDownRefresh()
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
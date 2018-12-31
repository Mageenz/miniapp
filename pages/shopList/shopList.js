const api = require('../../api.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    shops: [],
    isLoaded: false,
    filterForm: {
      orderByField: 1,
      isAsc: true,
      range: 500,
      size: 20,
      current: 1,
      lng: '',
      lat: '',
      categoryId: ''
    },
    isLocationAuth: true,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.data.filterForm.categoryId = options.id
    this.getLocation()
    // wx.getSetting({
    //   success: res => {
    //     if (res.authSetting['scope.userLocation']) {
    //       this.getLocation()
    //     } else {
    //       wx.authorize({
    //         scope: 'scope.userLocation',
    //         success: () => {
    //           this.getLocation()
    //         },
    //         fail: res => {
    //           console.log('fail', res)
    //           this.setData({
    //             isLocationAuth: false
    //           })
    //         }
    //       })
    //     }
    //   }
    // })
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
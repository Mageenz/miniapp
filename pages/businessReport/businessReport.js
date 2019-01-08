const api = require('../../api.js')
// 1: 今日报表 ：2近七日报表 3：当月报表 4：近三月报表

Page({

  /**
   * 页面的初始数据
   */
  data: {
    types: [{
      value: 1,
      name: '今日报表'
    }, {
      value: 2,
        name: '近七日报表'
    }, {
      value: 3,
      name: '当月报表'
    }, {
      value: 4,
      name: '近三月报表'
    }],
    type: 0,
    info: null
  },
  handleTypeChange(e) {
    this.setData({
      type: e.detail.value
    })
    this.getReport()
  },
  getReport() {
    api.admin.getReport({
      type: this.data.type
    }).then(res => {
      this.setData({
        info: res.data.data
      })
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getReport()
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
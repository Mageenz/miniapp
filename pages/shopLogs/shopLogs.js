const api = require('../../api.js')
const util = require('../../utils/util.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    records: null,
    region: ['北京市', '北京市', '东城区'],
    time: '2018-12-12',
    name: ''
  },
  handleNameInput(e) {
    this.setData({
      name: e.detail.value
    })
    this.getLogs()
  },
  handleRegionChange(e) {
    this.setData({
      region: e.detail.value
    })
    this.getLogs()
  },
  handleDateChange(e) {
    this.setData({
      time: e.detail.value
    })
    this.getLogs()
  },
  getLogs() {
    const codes = util.translateRegionNameToCode(this.data.region)

    api.agent.getManageInfo({
      name: this.data.name,
      provId: codes[0],
      cityId: codes[1],
      areaId: codes[2],
      time: this.data.time,
      size: 100,
      current: 1
    }).then(res => {
      this.setData({
        records: res.data.data.records
      })
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getLogs()
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
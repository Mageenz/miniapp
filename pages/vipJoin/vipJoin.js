// pages/vipJoin/vipJoin.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentIndex: 0,
    cards: [
      {name: '普卡', money: '500', score: '500', offer: '1000'},
      {name: '银卡', money: '500', score: '500', offer: '1000'},
      {name: '金卡', money: '500', score: '500', offer: '1000'},
      {name: '白金卡', money: '500', score: '500', offer: '1000'},
      {name: '钻石卡', money: '500', score: '500', offer: '1000'},
      {name: '至尊卡', money: '500', score: '500', offer: '1000'}
    ]
  },

  chooseCard(e) {
    this.setData({
      currentIndex: e.currentTarget.dataset.index
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
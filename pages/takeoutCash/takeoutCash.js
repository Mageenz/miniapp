const api = require('../../api.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    exchanged: 0,
    disabled: false
  },
  getTrans() {
    this.setData({
      disabled: true
    })
    api.admin.getTrans({
      exchanged: +this.data.exchanged,
      exchangedType: 1,
      type: 1
    }).then(res => {
      if(res.data.code === '0') {
        wx.showToast({
          title: '提现成功',
        })
        setTimeout(() => {
          wx.navigateBack({
            delta: 2
          })
        }, 1500)
      }
      this.setData({
        disabled: false
      })
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      exchanged: options.cash
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
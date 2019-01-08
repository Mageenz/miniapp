const api = require('../../api.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    isShow: false,
    records: null
  },
  handleSubmit(e) {
    const data = e.detail.value

    api.admin.addUser(data).then(res => {
      if(res.data.code === '0') {
        wx.showToast({
          title: '添加成功',
        })
        setTimeout(() => {
          this.getUserList()
          this.setData({
            isShow: false
          })
        }, 1500)
      }
    })
  },
  hideDialog() {
    this.setData({
      isShow: false
    })
  },
  showDialog() {
    this.setData({
      isShow: true
    })
  },
  getUserList() {
    api.admin.getUserList().then(res => {
      if(res.data.code === '0') {
        this.setData({
          records: res.data.data
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getUserList()
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
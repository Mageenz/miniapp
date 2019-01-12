const api = require('../../api.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    info: null,
    form: {
      avatarUrl: '',
      birth: '',
      cardNumber: '',
      nickName: '',
      realName: '',
      sex: 0
    },
    sex: ['男', '女']
  },
  updateUserInfo() {
    api.user.updateUserInfo(this.data.form).then(res => {
      if(res.data.code === '0') {
        wx.showToast({
          title: '保存成功',
        })
        setTimeout(() => {
          wx.navigateBack({
            delta: 1
          })
        }, 1500)
      }
    })
  },
  handleBChange(e) {
    this.setData({
      'form.birth': e.detail.value
    })
  },
  handleSexChange(e) {
    this.setData({
      'form.sex': e.detail.value
    })
  },
  handleSInput(e) {
    this.setData({
      'form.cardNumber': e.detail.value
    })
  },
  handleRInput(e) {
    this.setData({
      'form.realName': e.detail.value
    })
  },
  handleNicknameInput(e) {
    this.setData({
      'form.nickName': e.detail.value
    })
  },
  handleChooseImage() {
    wx.chooseImage({
      success: res => {
        wx.uploadFile({
          url: `${api.domain}/file/upload`,
          filePath: res.tempFilePaths[0],
          name: 'file',
          success: res => {
            const data = JSON.parse(res.data)
            this.setData({
              'form.avatarUrl': data.data
            })
            console.log('data', data)
          }
        })
      },
    })
  },
  getUserInfo() {
    api.user.getUserInfo().then(res => {
      if(res.data.code === '0') {
        this.setData({
          'form.avatarUrl': res.data.data.avatarUrl,
          'form.birth': res.data.data.birth,
          'form.cardNumber': res.data.data.cardNumber,
          'form.nickName': res.data.data.nickName,
          'form.realName': res.data.data.realName,
          'form.sex': res.data.data.sex,
          info: res.data.data
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getUserInfo()
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
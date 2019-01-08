const api = require('../../api.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    info: null,
    list: [{
      "cardName": "",
      "children": [{
        "cardName": "",
        "children": [{
          "cardName": "",
          "children": [{
            "cardName": "",
            "id": 1081575414129876993,
            "level": 1,
            "nickName": "1034367936",
            "referrId": 1081575414431866881,
            "type": 1,
            "vipLevel": 0,
            "vipName": ""
          }],
          "id": 1081575414431866881,
          "level": 1,
          "nickName": "²âÊÔ",
          "referrId": 1081575414809354242,
          "type": 1,
          "vipLevel": 0,
          "vipName": ""
        }],
        "id": 1081575414809354242,
        "level": 1,
        "nickName": "1254",
        "referrId": 1081575415216201730,
        "type": 1,
        "vipLevel": 0,
        "vipName": ""
      }, {
        "cardName": "",
        "children": [],
        "id": 1081575702043680769,
        "level": 1,
        "nickName": "15886488310",
        "referrId": 1081575415216201730,
        "type": 1,
        "vipLevel": 0,
        "vipName": ""
      }],
      "id": 1081575415216201730,
      "level": 1,
      "nickName": "17382176033",
      "referrId": 1081575413798526978,
      "type": 1,
      "vipLevel": 0,
      "vipName": ""
    }]
  },
  getUserFanList() {
    api.user.getUserFanList().then(res => {
      if(res.data.code === '0') {
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
    this.getUserFanList()
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
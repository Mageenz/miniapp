const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    type: '',
    shopFiles: []
  },
  handleUpload() {
    wx.chooseImage({
      success: res => {
        wx.uploadFile({
          url: `${api.domain}/file/upload`,
          filePath: res.tempFilePaths[0],
          name: 'file',
          success: res => {
            console.log('res', res)
            const data = JSON.parse(res.data)
            let shopFiles = this.data.shopFiles
            const file = {
              type: this.data.type,
              url: data.data
            }

            shopFiles.push(file)
            app.globalData.shopFiles.push(file)

            this.setData({
              shopFiles
            })
            
          }
        })
      },
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      type: options.type,
      shopFiles: app.globalData.shopFiles.filter(item => item.type === options.type)
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
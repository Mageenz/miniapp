const util = require('../../utils/util.js')
const api = require('../../api.js')
const app = getApp()

Page({
  data: {
    region: ['北京市', '北京市', '东城区'],
    categorysValue: [0, 0],
    categorys: [],
    categorysRange: [],
    shopStartTime: '09:00',
    shopEndTime: '21:00',
    form: {
      business: {
        name: '',
        address: '',
        areaDetail: '',
        areaId: '',
        cityId: '',
        provId: '',
        lat: '',
        lng: '',
        linkMan: '',
        telephone: '',
        memberId: '',
        kinds: '',
        shopEndTime: '',
        shopStartTime: '',
        referrerId: '',
        referrerName: '',
        referrerPhone: '',
        couponsRatio: ''
      },
      smsCode: '',
      detail: {
        shopPhone: '',
        shopDesc: '',
        shopService: ''
      },
      categories: [],
      pictures: []
    },
    isLoading: false,
    isSending: false,
    time: 60,
    btntext: '发送验证码'
  },
  handleTelephoneInput(e) {
    this.setData({
      'form.business.telephone': e.detail.value
    })
  },
  sendCode() {
    if (!/^1\d{10}$/.test(this.data.form.business.telephone)) {
      wx.showToast({
        title: '格式错误',
        icon: 'none'
      })
      return
    }
    this.setData({
      isSending: true
    })
    api.common.sendCode({
      phone: this.data.form.business.telephone
    }).then(res => {
      if(res.data.code === '0') {
        wx.showToast({
          title: '发送成功',
        })
        let time = this.data.time
        this.setData({
          time: time--,
          btntext: `${time}秒`
        })
        const timer = setInterval(() => {
          if(time > 0) {
            this.setData({
              time: time--,
              btntext: `${time}秒`
            })
          } else {
            this.setData({
              time: 60,
              btntext: '发送验证码'
            })
            clearInterval(timer)
            this.setData({
              isSending: false
            })
          }
        }, 1000)
      } else {
        this.setData({
          isSending: false
        })
      }
    })
  },
  // 上传证件
  toUpload(e) {
    wx.navigateTo({
      url: `/pages/upload/upload?type=${e.currentTarget.dataset.type}`,
    })
  },
  // 营业时间picker
  handleShopStartTimeChange(e){
    this.setData({
      shopStartTime: e.detail.value
    })
  },
  handleShopEndTimeChange(e) {
    this.setData({
      shopStartTime: e.detail.value
    })
  },
  // 经营类目picker事件
  handleCategorysChange1(e) {
    if(e.detail.column === 0) {
      let categorysRange = this.data.categorysRange
      const category1 = categorysRange[0][e.detail.value]
      let categorys2 = []

      this.data.categorys.forEach(item => {
        if (item.parentId === category1.id) {
          categorys2.push(item)
        }
      })

      categorysRange[1] = categorys2

      this.setData({
        categorysRange
      })
    }
  },
  handleCategorysChange(e) {
    this.setData({
      categorysValue: e.detail.value
    })
  },
  getCategorys() {
    api.home.getCategorys({
      limit: 30,
      isFirst: false
    }).then(res => {
      let categorys1 = []
      let categorys2 = []

      this.data.categorys = res.data.data || []

      this.data.categorys.forEach(item => {
        if (item.parentId === '0') {
          categorys1.push(item)
        }
      })
      
      let category1 = categorys1[0]

      this.data.categorys.forEach(item => {
        if(item.parentId === category1.id) {
          categorys2.push(item)
        }
      })

      this.setData({
        categorysRange: [categorys1, categorys2]
      })
    })
  },
  // 省市区picker事件
  handleRegionChange(e) {
    this.setData({
      region: e.detail.value
    })
  },
  chooseLocation() {
    wx.chooseLocation({
      success: res => {
        // console.log('res', res)
        this.setData({
          'form.business.areaDetail': res.address,
          'form.business.lat': res.latitude,
          'form.business.lng': res.longitude
        })
      },
    })
  },
  // 提交事件
  handleFormSubmit(e) {
    const formData = e.detail.value
    const codes = util.translateRegionNameToCode(this.data.region)
    let form = this.data.form
    form.categories = []

    for(let key in form.business) {
      form.business[key] = formData[key] || form.business[key]
    }

    for (let key in form.detail) {
      form.detail[key] = formData[key] || form.detail[key]
    }

    this.data.categorysValue.forEach((item, index) => {
      if(this.data.categorysRange[index].length) {
        form.categories.push({
          categoryId: this.data.categorysRange[index][item].id
        })
      }
    })

    form.smsCode = formData.smsCode
    form.business.areaId = codes[2]
    form.business.cityId = codes[1]
    form.business.provId = codes[0]
    form.pictures = app.globalData.shopFiles
    form.business.couponsRatio = form.business.couponsRatio*100
    
    // console.log('form', this.data.form)
    wx.showNavigationBarLoading()
    
    this.setData({
      isLoading: true
    })

    api.shop.join(form).then(res => {
      if(res.data.code === '0') {
        wx.showToast({
          title: '提交成功',
        })
        setTimeout(() => {
          wx.navigateBack({
            delta: '1'
          })
        }, 1500)
      }
      this.setData({
        isLoading: false
      })
      wx.hideNavigationBarLoading()
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // const codes = ['330000', '330100', '330104']

    // this.setData({
    //   region: util.translateRegionCodeToName(codes)
    // })

    this.getCategorys()
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
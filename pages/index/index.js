const app = getApp()
const api = require('../../api.js')
var QQMapWX = require('../../lib/qqmap-wx-jssdk.min.js');
const wxMap = new QQMapWX({
  key: 'MKLBZ-5U5KJ-V7NFI-FENTV-WHZR5-JJF3I'
})

Page({
  data: {
    banners: [],
    categorys1: [],
    categorys2: [],
    shops: null,
    filterForm: {
      orderByField: 1,
      isAsc: true,
      range: 500,
      size: 100,
      current: 1,
      lng: '',
      lat: ''
    },
    // integer(query)	范围 0：全部，1：500米 2：1km 3: 3KM 4：5KM
    ranges: [{
      value: 0,
      name: '全部'
    }, {
      value: 1,
      name: '500米'
    }, {
      value: 2,
      name: '1km'
    }, {
      value: 3,
      name: '3km'
    }, {
      value: 4,
      name: '5km'
    }],
    range: 0,
    isLocationAuth: true,
    address: ''
  },
  handleRangeChange(e) {
    this.setData({
      range: e.detail.value,
      'filterForm.range': this.data.ranges[e.detail.value].value
    })
    this.getShopList()
  },
  handleSm() {
    wx.scanCode({
      scanType: ['barCode', 'qrCode', 'datamatrix', 'pdf417'],
      success: res => {
        console.log('res', res)
      }
    })
  },
  onLoad() {
    this.initRequest()
  },
  toShopDetail(e) {
    wx.navigateTo({
      url: `/pages/shopDetail/shopDetail?id=${e.currentTarget.dataset.id}`,
    })
  },
  toShopList(e) {
    const dataset = e.currentTarget.dataset

    if(dataset.index == 4) {
      wx.navigateTo({
        url: '/pages/search/search',
      })
    } else {
      wx.navigateTo({
        url: `/pages/shopList/shopList?id=${dataset.id}`,
      })
    }
  },
  reverseGeocoder(latitude, longitude) {
    wxMap.reverseGeocoder({
      location: {
        latitude,
        longitude
      },
      success: res => {
        console.log(res)
        this.setData({
          address: res.result.formatted_addresses.recommend
        })
      },
      complete: res => {
        // console.log('complete', res)
      }
    })
  },
  getLocation() {
    wx.getLocation({
      type: 'gcj02',
      success: res => {
        console.log('success', res)
        this.data.filterForm.lat = res.latitude
        this.data.filterForm.lng = res.longitude
        this.getShopList()
        this.reverseGeocoder(res.latitude, res.longitude)
      },
      fail: err => {
        this.setData({
          isLocationAuth: false
        })
      }
    })
  },
  initRequest() {
    wx.showNavigationBarLoading()
    Promise.all([this.getBanners(), this.getCategorys()]).then(res => {
      this.getLocation()
      wx.hideNavigationBarLoading()
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
        shops: res.data.data.records || []
      })
      wx.hideNavigationBarLoading()
      wx.stopPullDownRefresh()
    })
  },
  getBanners() {
    return new Promise((resolve, reject) => {
      api.home.getBanners().then(res => {
        this.setData({
          banners: res.data.data
        })
        resolve(res)
      })
    })
    
  },
  getCategorys() {
    return new Promise((resolve, reject) => {
      api.home.getCategorys({
        limit: 9,
        isFirst: true
      }).then(res => {
        this.setData({
          categorys1: res.data.data.slice(0, 5),
          categorys2: res.data.data.slice(5).concat([{
            wapBannerUrl: '/assets/images/Oval Copy 7@2x.png',
            name: '全部类别'
          }])
        })
        resolve(res)
      })
    })
  },
  onPullDownRefresh() {
    this.getShopList()
  }
})

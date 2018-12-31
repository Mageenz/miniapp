const app = getApp()
const api = require('../../api.js')

Page({
  data: {
    banners: [],
    categorys1: [],
    categorys2: [],
    isLoaded: false,
    shops: [],
    filterForm: {
      orderByField: 1,
      isAsc: true,
      range: 500,
      size: 20,
      current: 1,
      lng: '',
      lat: ''
    },
    isLocationAuth: true
  },
  onLoad() {
    this.initRequest()
    this.getLocation()
    // wx.getSetting({
    //   success: res => {
    //     if (res.authSetting['scope.userLocation']) {
    //       this.getLocation()
    //     } else {
    //       wx.authorize({
    //         scope: 'scope.userLocation',
    //         success: () => {
    //           this.getLocation()
    //         },
    //         fail: res => {
    //           console.log('fail', res)
    //           this.setData({
    //             isLocationAuth: false
    //           })
    //         }
    //       })
    //     }
    //   }
    // })
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
  getLocation() {
    wx.getLocation({
      type: 'gcj02',
      success: res => {
        console.log('success', res)
        this.data.filterForm.lat = res.latitude
        this.data.filterForm.lng = res.longitude
        this.getShopList()
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
      console.log(res)
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
        shops: res.data.data.records || [],
        isLoaded: true
      })
      wx.hideNavigationBarLoading()
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
  }
})

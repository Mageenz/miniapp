// const domain = 'http://liuq.ngrok.xiaomiqiu.cn'
const domain = 'http://118.31.62.10'

const http = (method='get', url, data) => {
  wx.showNavigationBarLoading()
  return new Promise((resolve, reject) => {
    wx.request({
      url: `${domain}${url}`,
      method,
      data,
      header: {
        "Cookie": `SESSION=${wx.getStorageSync('SESSION')}`
      },
      success(res) {
        resolve(res)
        if (res.data.code !== '0') {
          if (res.data.code === 'CMN_1000') {
            wx.redirectTo({
              url: '/pages/login/login',
            })
          } else {
            wx.showToast({
              title: res.data.message || `${url}错误`,
              duration: 2000,
              icon: 'none',
              // image: '/assets/images/error.png'
            })
          }
        }
      },
      fail(err) {
        wx.showToast({
          title: `${url} 接口错误`,
          duration: 2000,
          icon: 'none',
          // image: '/assets/images/error.png'
        })
        console.log('err', err)
        reject(err)
      },
      complete: () => {
        wx.hideNavigationBarLoading()
      }
    })
  })
}

module.exports = {
  user: {
    login: data => http('post', '/members/login', data),
    register: data => http('post', '/members/register', data),
    getSession: data => http('get', '/members/session', data),
    getUserInfo: data => http('get', '/members', data),
    getUserFanList: data => http('get', '/members/fans', data),
    getWalletInfo: data => http('get', '/members/wallet', data),
    getUserPointsLogs: data => http('get', '/memberPointsLog', data),
    getCouponLogs: data => http('get', '/memberCouponsLog', data),
    getUserOrders: data => http('get', '/members/orders', data),
    getUserOrderInfo: data => http('get', '/members/orders/counts', data),
  },
  common: {
    getShopList: data => http('get', '/business/page', data),
    sendCode: data => http('get', '/members/sms', data),
    getMessages: data => http('get', '/messages', data),
    checkCollection: data => http('get', `/collection/${data.id}`, data),
    getCollections: data => http('get', '/collection', data),
    addCollection: data => http('post', '/collection', data),
    removeCollection: data => http('delete', `/collection/${data.id}`),
  },
  home: {
    getBanners: data => http('get', '/advertise', data),
    getCategorys: data => http('get', '/category', data)
  },
  shop: {
    getShopDetail: data => http('get', `/business/detail/${data.id}`),
    getComments: data => http('get', '/comment', data),
    join: data => http('post', '/business', data)
  },
  agent: {
    getAreaInfo: data => http('get', '/agents/area', data),
    getCityOverview: data => http('get', '/agents/area/info', data),
    getManageInfo: data => http('get', '/agents/area/manage', data),
    applyAgent: data => http('post', '/applications', data),
    getRegionOverviewInfo: data => http('get', '/agents/area/overview', data),
    getFansList: data => http('get', '/agents/area/fans', data),
    getCityInfo: data => http('get', '/agents/city', data),
  },
  share: {
    getShareInfo: data => http('get', '/inviteSettings', data),
  },
  admin: {
    check: data => http('get', '/business/check', data),
    getShopDetail: data => http('get', `/business/detail/${data.id}`, data),
    getUserList: data => http('get', '/businessUser', data),
    addUser: data => http('post', '/businessUser', data),
    getCouponDetail: data => http('get', '/business/coupons/detail', data),
    getTrans: data => http('post', '/business/coupons/trans', data),
    getAgentInfo: data => http('get', '/business/agent', data),
    getReport: data => http('get', '/businessPayment', data),
  },
  pay: {
    payShop: data => http('post', '/pay/business', data)
  }
}
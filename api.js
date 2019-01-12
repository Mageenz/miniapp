// const domain = 'http://liuq.ngrok.xiaomiqiu.cn'
const domain = 'http://www.lianduhz.cn'

const http = (method='get', url, data) => {
  wx.showNavigationBarLoading()
  return new Promise((resolve, reject) => {
    const SESSION = retryGetStorageSync('SESSION')

    wx.request({
      url: `${domain}${url}`,
      method,
      data,
      header: {
        "Cookie": `SESSION=${SESSION}`
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
            })
          }
        }
      },
      fail(err) {
        wx.showToast({
          title: `${url} 接口错误 ${JSON.stringify(err)}`,
          duration: 5000,
          icon: 'none',
        })
        // wx.showModal({
        //   title: `${url} 接口错误`,
        //   content: JSON.stringify(err),
        //   showCancel: false
        // })
        console.log('err', err)
        reject(err)
      },
      complete: () => {
        wx.hideNavigationBarLoading()
      }
    })
  })
}

const retryGetStorageSync = function(key) {

  let time = 0;

  function getData(key1) {
    if (time < 100) {
      time += 1;
      try {
        return wx.getStorageSync(key1);
      } catch (error) {
        getData(key1);
      }
    }
  }
  return getData(key);
}

module.exports = {
  domain,
  user: {
    login: data => http('post', '/members/login', data),
    register: data => http('post', '/members/register', data),
    getSession: data => http('get', '/members/session', data),
    getUserInfo: data => http('get', '/members', data),
    updateUserInfo: data => http('post', '/members', data),
    getUserFanList: data => http('get', '/members/fans', data),
    getWalletInfo: data => http('get', '/members/wallet', data),
    getUserPointsLogs: data => http('get', '/memberPointsLog', data),
    getCouponLogs: data => http('get', '/memberCouponsLog', data),
    getUserOrders: data => http('get', '/members/orders', data),
    getUserOrderInfo: data => http('get', '/members/orders/counts', data),
    exchangePoints: data => http('post', '/pay/points', data),
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
    payShop: data => http('post', '/pay/business', data),
    getVipCards: data => http('get', '/membershipCardSettings', data),
    payCard: data => http('post', '/pay/cards', data),
  },
}
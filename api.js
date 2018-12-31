const domain = 'http://liuq.ngrok.xiaomiqiu.cn'

const http = (method='get', url, data) => {
  // wx.showNavigationBarLoading()
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
          wx.showToast({
            title: res.data.message || `${url}错误`,
            duration: 2000,
            image: '/assets/images/error.png'
          })

          if (res.data.code === 'CMN_1000') {
            wx.navigateTo({
              url: '/pages/login/login',
            })
          }
        }
      },
      fail(err) {
        wx.showToast({
          title: `${url} 接口错误`,
          duration: 2000,
          image: '/assets/images/error.png'
        })
        console.log('err', err)
        reject(err)
      },
      complete: () => {
        // wx.hideNavigationBarLoading()
      }
    })
  })
}

module.exports = {
  user: {
    login: data => http('post', '/members/login', data),
    getSession: data => http('get', '/members/session', data),
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
    getLogs: data => http('get', '/agents/area/manage', data),
  }
}
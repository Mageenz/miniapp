//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    categorys1: [
      { name: '美食', src: '/assets/images/Oval@2x.png'},
      { name: '酒店住宿', src: '/assets/images/Oval Copy 4@2x.png'},
      { name: '休闲娱乐', src: '/assets/images/Oval Copy@2x.png'},
      { name: '美人丽发', src: '/assets/images/Oval Copy 3@2x.png'},
      { name: '美食', src: '/assets/images/Oval Copy 2@2x.png'},
    ],
    categorys2: [
      { name: '旅游', src: '/assets/images/Oval Copy 9@2x.png' },
      { name: '生活服务', src: '/assets/images/Oval Copy 5@2x.png' },
      { name: '百货商城', src: '/assets/images/Oval Copy 8@2x.png' },
      { name: '母婴亲子', src: '/assets/images/Oval Copy 6@2x.png' },
      { name: '全部分类', src: '/assets/images/Oval Copy 7@2x.png', path: '/category' },
    ]
  },
  toCategory() {
    wx.navigateTo({
      url: '/pages/category/category',
    })
  }
})

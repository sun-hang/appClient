// components/details/bottomBtn/bottomBtn.js
const app = getApp();
const login = require('../../../myUtils/login')
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    key: {
      type: String,
      value: ""
    },
    value: {
      type: Number
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },
  lifetimes: {
    attached() {
     
    }
  },
  /**
   * 组件的方法列表
   */
  methods: {
    phoneClick(e) {
      wx.makePhoneCall({
        phoneNumber: '18603712713'
      })
    },
    shopClick() {
      if (!app.globalData.user) {
        login.getUser((err, res) => {
          if (!err) {
            wx.switchTab({
              url: '/pages/shopCart/shopCart',
            })
            return;
          }
          wx.showToast({
            title: '授权失败',
          })
        })
      } else {
        wx.switchTab({
          url: '/pages/shopCart/shopCart',
        })
      }
    },
    currentShopClick(e) {
      /**
       * 将事件反馈到父组件
       */
      this.triggerEvent('addshop', e);
    },
    purchaseClick() {

      wx.switchTab({
        url: '/pages/shopCart/shopCart'
      })
    },
    getUser(e) {
      // console.log(e)
    }
  }
})
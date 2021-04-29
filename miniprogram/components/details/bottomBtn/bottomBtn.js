// components/details/bottomBtn/bottomBtn.js
const app = getApp();
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
  lifetimes:{
    attached(){
      wx.getSetting({
        withSubscriptions: true,
        success(res){
          // console.log(res)
          wx.getUserInfo({
            lang: "zh_CN",
            withCredentials: true,
            success(res) {
              app.globalData.userInfo = res.userInfo;
            }
          })
        }
      })
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
      wx.switchTab({
        url: '/pages/shopCart/shopCart',
      })
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
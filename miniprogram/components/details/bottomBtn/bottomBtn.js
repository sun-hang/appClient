// components/details/bottomBtn/bottomBtn.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {

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
    }
  }
})

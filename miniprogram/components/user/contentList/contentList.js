// components/user/contentList/contentList.js
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
    addressClick() {
      wx.navigateTo({
        url: '/pages/addressList/addressList',
      })
    },
    userClick() {
      wx.showToast({
        title: '抱歉，暂未开启会员功能',
        icon: "none"
      })
    },
    contactClick() {
      wx.makePhoneCall({
        phoneNumber: '18603712713',
      })
    }
  }
})

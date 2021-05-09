// components/shopCart/bottomBlock/bottomBlock.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    totalPrice: {
      type: Number,
      value: 0
    }
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
    /**
     * 继续购物按钮点击事件
     * @param {*} e 
     */
    continueBtnHandle(e) {
      wx.showTabBar({
        animation: false,
      })
      wx.switchTab({
        url: '/pages/home/home',
      })
    },
    /**
     * 确认订单按钮点击事件
     * @param {*} e 
     */
    confirmBtnHandle(e) {
      this.triggerEvent('confirm')
    }
  }
})
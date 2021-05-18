// components/user/ordreCard/orderCard.js
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
    onClick(e) {
      let index = e.currentTarget.dataset.item;
      wx.navigateTo({
        url: '../order/order?index=' + index,
      })
    }
  }
})

// components/public/listItem/listItem.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    item: {
      type: Object,
      value:{}
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
    onClick(){
      wx.navigateTo({
        url: '/pages/details/details?id=' + this.data.item._id,
      })
    }
  }
})

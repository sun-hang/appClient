// components/public/scrollTop/scrllTop.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    duration: {
      type: Number,
      value: 500
    },
    scrollTop: {
      type: Number,
      value: 0
    },
    size: {
      type: Number,
      value: 15
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
    click() {
      wx.pageScrollTo({
        duration: 500,
        scrollTop: 0
      })
    }
  }
})
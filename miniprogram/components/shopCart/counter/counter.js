// components/shopCart/counter/counter.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    count: {
      type: Number,
      value: 1
    },
    price: {
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
    increaseBtnHandle(e) {
      this.triggerEvent('increase', this.data.count + 1);
    },
    decreaseBtnHandle(e) {
      let count = this.data.count - 1;
      if (count < 1) {
        count = 1;
      }
      this.triggerEvent("decrease", count);
    }
  }
})

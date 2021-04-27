// components/menu/itemTag/itemTag.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    tag: {
      type: String,
      value: ""
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    color: "#000"
  },
  lifetimes: {
    attached() {
      this.setData({
        color: getRandom()
      })
    }
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onClick(e) {
      this.triggerEvent('click', this.data.tag)
    }
  }
})

function getRandom() {
  let r = Math.floor(Math.random() * 255);
  let g = Math.floor(Math.random() * 255)
  let b = Math.floor(Math.random() * 255)
  return `rgb(${r},${g},${b})`;
}
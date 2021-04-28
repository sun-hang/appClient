// components/public/checkbox/checkbox.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    checked: {
      type: Boolean,
      value: true
    },
    text: {
      type: String,
      value: ''
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
    onchange(e) {
      this.triggerEvent("change", e.detail.value.length > 0)
    }
  }
})

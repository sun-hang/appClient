// components/menu/leftMenu/leftMenu.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    tags: {
      type: Array,
      value: []
    },
    tag: {
      type: String,
      value: "品牌"
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    currentTag: ""
  },
  lifetimes: {
    attached(){
      this.setData({
        currentTag:this.data.tag
      })
    }
  },
  /**
   * 组件的方法列表
   */
  methods: {
    onClick(e) {
      this.setData({
        currentTag:e.currentTarget.dataset.item
      })
      this.triggerEvent('click',this.data.currentTag);
    }
  }
})

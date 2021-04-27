// components/public/search/search.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    iconColor: {
      type: String,
      value: "#000"
    },
    size: {
      type: Number,
      value: 20
    },
    searchValue: {
      type: String,
      value: ""
    },
    focus: {
      type: Boolean,
      value: false
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    value: ""
  },

  lifetimes: {
    attached() {
      this.setData({
        value: this.data.searchValue
      });
    }
  },
  observers:{
    'searchValue':function(searchValue){
      this.setData({
        value:searchValue
      })
    } 
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onChange(e) {
      this.triggerEvent('mychange', e.detail);
      this.setData({
        value: e.detail.value
      })
    },
    onSearch(e) {
      this.triggerEvent("search", this.data.value)
    },
    onClick(e) {
      this.triggerEvent('click', e);
    }
  }
})

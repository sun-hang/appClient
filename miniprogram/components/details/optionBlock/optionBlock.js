// components/details/optionBlock/optionBlock.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    options: {
      type: Array,
      value: []
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    newOptions: []
  },
  lifetimes: {
    attached() {

    }
  },
  observers: {
    "options"(options) {
      let newArr = options.map(item => {
        item.tag = item.child[0];
        return item
      })
      this.setData({
        newOptions: newArr
      })
    }
  },
  /**
   * 组件的方法列表
   */
  methods: {
    onClick(e) {
      let name = e.target.dataset.name;
      let index = e.target.dataset.index;
      let arr = this.data.newOptions;
      arr.forEach(item => {
        if (item.name === name) {
          item.tag = item.child[index];
        }
      })
      this.setData({
        newOptions: arr
      })
      arr = this.data.newOptions.map(item => item.tag).join('-');
      this.triggerEvent('change', arr);
    }
  }
})
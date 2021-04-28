// components/shopCart/shopItem/shopItem.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    item: {
      type: Object,
      value: null
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
     * 数量加按钮点击事件
     * @param {*} e 
     */
    increaseBtnHandle(e) {
      let item = handle.call(this, e);
      this.triggerEvent('increase', item)
    },
    /**
     * 数量减点击事件
     * @param {*} e 
     */
    decreaseBtnHandle(e) {
      let item = handle.call(this, e);
      this.triggerEvent("decrease", item)
    },
    /**
     * 多选框变化事件
     * @param {*} e 
     */
    boxChange(e) {
      let item = this.data.item
      item.type.checked = e.detail;
      this.triggerEvent('change', item);
    },
    closeHandle(e) {
      this.triggerEvent('close', this.data.item);
    }
  }
})

function handle(e) {
  let item = this.data.item;
  item.type.count = e.detail;
  item.type.total = e.detail * item.type.price;
  return item;
}
// components/order/orderTitle/orderTitle.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    i: {
      type: Number
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    list: ['全部订单', '未支付', '待发货', '待收货', '已签收']
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onclcik(e) {
      this.triggerEvent('click',e.currentTarget.dataset.item)
    }
  }
})
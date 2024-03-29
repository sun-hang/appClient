// components/order/Unpaid/Unpaid.js
const api = require('../../../myUtils/api');
const app = getApp();
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    index: {
      type: Number
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    orderList: [],
    globalLoading: false
  },
  lifetimes: {
    attached() {
      this.setData({
        globalLoading: true
      })
      let id = app.globalData.user._id;
      api.getOrderList(id, this.data.index - 1, (err, res) => {
        let orderList = [];
        if (res.data) {
          orderList = res.data;
        }
        this.setData({
          globalLoading: false,
          orderList
        })
      });
    }
  },
  /**
   * 组件的方法列表
   */
  methods: {

  }
})

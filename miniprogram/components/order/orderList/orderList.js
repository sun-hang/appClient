const api = require('../../../myUtils/api');
const app = getApp();
let currentIndex = -2;
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

    }
  },
  observers: {
    index(i) {
      // if (this.data.globalLoading) {
      //   return;
      // }
      currentIndex = i;
      this.setData({
        globalLoading: true
      })
      let id = app.globalData.user._id;
      api.getOrderList(id, i - 1, (err, res) => {
        let orderList = [];
        console.log(err, res)
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

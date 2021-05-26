// components/order/allOrder/allOrder.js
const api = require('../../../myUtils/api');
const util = require('../../../myUtils/util');
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    index: {
      type: Number
    },
    data: {
      type: Object
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    year: "",
    count: 0,
    price: 0
  },
  lifetimes: {
    attached() {

    }
  },
  observers: {
    data(item) {
      let year = util.getYearString(item.orderTime)
      let count = 0;
      let price = 0;
      item.products.forEach(item => {
        count += item.type.count;
        price += item.type.total;
      })
      this.setData({
        year,
        count,
        price
      })
    }
  },
  /**
   * 组件的方法列表
   */
  methods: {
    /**
     * 
     * @param {*} e 
     */
    contact(e) {
      wx.showToast({
        title: '暂未开启在线联系商家，请微信或电话联系商家',
        icon: "none"
      })
    },
    itemClick(e) {
      wx.navigateTo({
        url: '/pages/orderDetail/orderDetail?id=' + this.data.data._id,
      })
    },
    deletaOrder(e) {
      let that = this;
      wx.showModal({
        title: "提示",
        confirmColor: "#999",
        confirmText: "删除",
        content: "您确定删除此订单吗",
        success(res) {
          if (res.confirm) {
            wx.showLoading({ mask: true })
            that.data.data.isDelete = true
            api.setOrder(that.data.data, (err, res) => {
              console.log(err, res)
              wx.hideLoading({
                success: (res) => {
                  wx.redirectTo({
                    url: '/pages/order/order?index=' + 0,
                  })
                },
              })
            })
          } else if (res.cancel) {
            console.log('点击了取消')
          }
        }
      })
    }
  }
})

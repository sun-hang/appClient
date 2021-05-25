// components/order/allOrder/allOrder.js
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
      let year = '';
      let count = 0;
      let price = 0;
      let timeObj = new Date(+item.orderTime);
      year = `${timeObj.getFullYear()}-${(timeObj.getMonth() + 1).toString().padStart(2, '0')}-${timeObj.getDate().toString().padStart(2, '0')} ${timeObj.getHours().toString().padStart(2, '0')}:${timeObj.getMinutes().toString().padStart(2, '0')}:${timeObj.getSeconds().toString().padStart(2, '0')}`;
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

  }
})

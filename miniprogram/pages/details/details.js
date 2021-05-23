const api = require('../../myUtils/api');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    _id: "",
    item: {},
    show: false,
    optionKey: "", //规格信息的key 例："999-大"
    optionVal: 0,
    productCount: 0,  //当前标签规格产品数量
    currentIndex: 0
  },
  /**
   * 添加购物车
   * @param {*} e 
   */
  addshop(e) {
    if (this.data.productCount < 1) {
      wx.showToast({
        title: '商品已售完,无法加入购物车',
        icon: "none"
      })
      return;
    }
    this.setData({
      show: true
    })
    let item = this.data.item;
    if (!item) {
      return
    }
    try {
      let value = wx.getStorageSync('shop');
      if (Array.isArray(value) && value.length == 0) {
        value = [];
      } else {
        value = value ? JSON.parse(value) : [];
      }
      /**
       * 查看缓存数组是否有一样的，对比_id和规格信息：例:'999-大' === '999-小'
       */
      let filter = value.filter(it => {
        return it._id === item._id && it.type.name === this.data.optionKey
      })

      if (filter.length > 0) {
        filter[0].type.count++;
        filter[0].type.total = filter[0].type.count * filter[0].type.price;
        filter[0].type.stock--;
        filter[0].optionsDetail[this.data.currentIndex].total--;
        filter[0].stock--;
      } else {
        item.type = {
          name: this.data.optionKey,
          price: this.data.optionVal,
          count: 1,
          checked: true,
          stock: this.data.productCount - 1
        }
        item.type.total = item.type.price * item.type.count;
        item.optionsDetail[this.data.currentIndex].total--;
        item.stock--;
        filter.push(item);
      }

      value = [...new Set([...value, ...filter])]
      wx.setStorageSync('shop', JSON.stringify(value))
      //生成订单后减少库存
      // api.setProduct(item, (err, res) => {
      //   console.log(err,res);
      // })
      this.setData({
        show: false
      })
      wx.showToast({
        title: '已加入购物车',
        icon: 'success'
      })
    } catch (error) {
      console.log(error)
    }
  },
  /**
   * 规格信息变化事件
   * @param {*} e 
   */
  optionChange(e) {
    let arr = this.data.item.optionsDetail;
    let value = this.data.item.currentPric;
    let count = 0;
    let index = 0;
    for (let i = 0; i < arr.length; i++) {
      const element = arr[i];
      if (element.type === e.detail) {
        value = element.price;
        count = element.total;
        index = i;
      }
    }
    this.setData({
      optionKey: e.detail,
      optionVal: value,
      productCount: count,
      currentIndex: index
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      _id: options.id,
      show: true
    })
    api.getProductOne(options.id, (err, res) => {
      if (res) {
        this.setData({
          item: res.data.result,
          show: false
        })
      } else {
        this.setData({
          item: null,
          show: false
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})
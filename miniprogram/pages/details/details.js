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
    optionVal: 0
  },
  /**
   * 添加购物车
   * @param {*} e 
   */
  addshop(e) {
    this.setData({
      show: true
    })
    try {
      let value = wx.getStorageSync('shop');
      let item = this.data.item;
      if (!item) {
        return
      }
      item.type = {
        name: this.data.optionKey,
        price: this.data.optionVal,
        count: 1,
        checked: true,
      }
      item.type.total = item.type.price * item.type.count;
      value = value ? [...JSON.parse(value), item] : [item];
      wx.setStorageSync('shop', JSON.stringify(value))
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
    for (let i = 0; i < arr.length; i++) {
      const element = arr[i];
      if (element.type === e.detail) {
        value = element.price
      }
    }
    this.setData({
      optionKey: e.detail,
      optionVal: value
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
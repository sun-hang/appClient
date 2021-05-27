// miniprogram/pages/orderDetail/orderDetail.js
const api = require('../../myUtils/api');
const util = require('../../myUtils/util')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: "",
    item: {},
    year: "",
    total: 0,
    count: 0
  },
  ding() {
    wx.requestSubscribeMessage({
      tmplIds: ['RMOs1IKfEk0eLRKwqi6lb2ioobPz_aYBLd71P0ovE_A'],
      success(res) {
        console.log(res)
      },
      fail(err) {
        console.log(err)
      }
    })
  },
  /**
   * 联系商家点击事件
   * @param {*} e 
   */
  contact(e) {
    wx.showToast({
      title: '暂未开启在线联系商家，请微信或电话联系商家',
      icon: "none"
    })
  },
  /**
   * 删除订单点击事件
   * @param {*} e 
   */
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
          that.data.item.isDelete = true
          api.setOrder(that.data.item, (err, res) => {
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
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      id: options.id
    })
    api.getOrderOne(options.id, (err, res) => {
      console.log(err, res)
      if (res.data) {
        let price = 0;
        let count = 0;
        res.data.products.forEach(item => {
          count += item.type.count;
          price += item.type.total;
        })
        this.setData({
          item: res.data,
          year: util.getYearString(res.data.orderTime),
          total: price,
          count
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
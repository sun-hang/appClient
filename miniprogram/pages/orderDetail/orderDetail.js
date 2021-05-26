// miniprogram/pages/orderDetail/orderDetail.js
const api = require('../../myUtils/api');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: "",
    item: {}
  },
  ding() {
    wx.requestSubscribeMessage({
      tmplIds: ['RMOs1IKfEk0eLRKwqi6lb2ioobPz_aYBLd71P0ovE_A'],
      success(res) {
        console.log(res)
      },
      fail(err){
        console.log(err)
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
      this.setData({
        item: res.data
      })
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
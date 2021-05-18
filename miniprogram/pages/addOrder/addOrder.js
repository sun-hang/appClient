// miniprogram/pages/addOrder/addOrder.js

/**
 * 可以添加一个地址添加并使用
 */
const app = getApp();
const api = require('../../myUtils/api');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    shopList: [],
    addressList: [],
    total: 0,
    addressListShow: false,
    currentAddressItem: null,
    currentAddressIndex: -1
  },
  addressSelectTopClick(e) {
    this.setData({
      addressListShow: !this.data.addressListShow
    })
  },
  addressSelectItemClick(e) {
    let index = e.currentTarget.dataset.item;
    let currentAddressItem = this.data.addressList[index];
    let currentAddressIndex = index;
    this.setData({
      currentAddressItem,
      currentAddressIndex,
      addressListShow: false
    })
  },
  add_address() {
    wx.navigateTo({
      url: '/pages/addressForm/addressForm?index=' + -2,
    })
  },
  addOrder() {

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (options.index) {
      this.setData({
        currentAddressIndex: +options.index
      })
    }
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
    let shopList = [];
    let total = 0;
    let address = app.globalData.user.address;
    try {
      shopList = JSON.parse(wx.getStorageSync('shop'));
    } catch (error) {

    }
    shopList = shopList.filter(item => item.type.checked);
    shopList.forEach(item => {
      total += item.type.total;
    })
    let currentAddressIndex = this.data.currentAddressIndex > 0 ? this.data.currentAddressIndex : 0;
    let currentAddressItem = address.length > 0 ? address[currentAddressIndex] : null;

    this.setData({
      shopList,
      addressList: address,
      currentAddressIndex,
      currentAddressItem,
      total
    })
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
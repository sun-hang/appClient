// miniprogram/pages/addressList/addressList.js
const app = getApp();
const api = require('../../myUtils/api');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    addressList: [],
    defaultItem: null
  },
  addClick() {
    wx.navigateTo({
      url: '/pages/addressForm/addressForm',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let addressList = app.globalData.user.address;
    let defaultItem = null, index;
    for (let i = 0; i < addressList.length; i++) {
      const element = addressList[i];
      if (element.isDefault) {
        defaultItem = element;
        index = i;
      }
    }
    if (defaultItem && index != 0) {
      let temp = addressList[0];
      addressList[0] = defaultItem;
      addressList[index] = temp;
      app.globalData.user.address = addressList;
      api.setAdmin(app.globalData.user._id, { address: addressList });
    }
    this.setData({
      addressList,
      defaultItem
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
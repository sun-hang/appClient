// miniprogram/pages/addressForm/addressForm.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    placeholderStyle: "font-size:.9rem;color:#aaa;",
    userName: "",
    phone: "",
    pcc: [],
    detail: "",
    index: -1
  },
  /**
   * 
   * @param {Event} e 
   */
  onPccChange(e) {
    this.setData({
      pcc: e.detail.value
    })
  },

  /**
   * 用户名变化事件
   * @param {Event} e 
   */
  onNameChange(e) {
    this.setData({
      userName: e.detail.value
    })
  },

  /**
   * 手机号变化事件
   * @param {Event} e 
   */
  onPhoneChange(e) {
    this.setData({
      phone: e.detail.value
    })
  },

  /**
   * 详情地址变化事件
   * @param {Event} e 
   */
  onDetailChange(e) {
    this.setData({
      detail: e.detail.value
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (options.index) {
      let result = app.globalData.user.address[options.index];
      this.setData({
        index: options.index,
        userName: result.userName,
        phone: result.phone,
        pcc: [result.province, result.city, result.county],
        detail: result.detail
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
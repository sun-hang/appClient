// miniprogram/pages/home/home.js
const api = require('../../myUtils/api');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    show: false,
    productList: [],
    scrollButton: false
  },
  getUser(){
    wx.getUserProfile({
      desc: '用于完善会员资料',
      lang:"zh_CN",
      success(res){
        console.log(res)
      },
      fail(res){
        console.log(res)
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      show: true
    })
    api.getLikeProduct((res) => {
      this.setData({
        productList: res.data.result,
        show: false
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

  },
  /**
   * 滚动条滚动事件
   * @param {*} e 
   */
  onPageScroll(e) {
    if (e.scrollTop > 700) {
      this.setData({
        scrollButton: true
      })
    }
    if (e.scrollTop < 200) {
      this.setData({
        scrollButton: false
      })
    }
  }
  // onTabItemTap(time){
  //   console.log(time)
  //   console.log('tab')
  // }
})
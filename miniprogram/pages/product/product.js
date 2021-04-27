const api = require('../../myUtils/api');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    globalLoading: false,
    localLoading: false,
    page: 1,
    size: 10,
    tag: '',
    total: 0,
    productName: '',
    productList: [],
    scrollButton: false
  },

  /**
   * 搜索框点击事件
   * @param {*} e 
   */
  myclick(e) {
    if (this.data.productName) {
      wx.navigateBack({
        delta: 1,
        success() {
        }
      })
    } else {
      wx.navigateTo({
        url: '/pages/searchPage/searchPage?search=' + this.data.productName,
      })
    }
  },

  /**
   * 面包屑按钮点击事件
   * 点击以后回退一步
   */
  iconClick() {
    wx.navigateBack({
      delta: 1,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      tag: options.tag ? options.tag : "",
      productName: options.productName ? options.productName : ''
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.setData({
      globalLoading: true
    })
    api.getProductList(this.data.page, this.data.size, this.data.tag, this.data.productName, (err, res) => {
      if (res) {
        this.setData({
          globalLoading: false,
          total: res.data.total,
          productList: res.data.result
        })
      }
    })
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
    if (this.data.total <= this.data.productList.length) {
      return;
    }
    this.setData({
      localLoading: true
    })

    api.getProductList(this.data.page + 1, this.data.size, this.data.tag, this.data.productName, (err, res) => {
      if (res) {
        this.setData({
          localLoading: false,
          total: res.data.total,
          productList: [...this.data.productList, ...res.data.result],
          page: this.data.page + 1
        })
      }
    })


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
    if (e.scrollTop > 1200) {
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
})
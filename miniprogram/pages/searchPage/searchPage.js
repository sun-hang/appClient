// miniprogram/pages/searchPage/searchPage.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    historyTags: []
  },

  /**
   * 搜索框文本变换事件
   * @param {*} e 
   */
  mychange(e) {

  },

  /**
   * 历史搜索标签点击事件
   * @param {*} e 
   */
  historyTagClick(e) {
    wx.navigateTo({
      url: '/pages/product/product?search=' + e.currentTarget.dataset.item,
    })
  },
  /**
   * 搜索框搜索事件|搜索按钮事件
   * @param {*} e 
   */
  mysearch(e) {
    /**
     * 1.进行ajax请求数据，
     * 2.缓存历史搜索
     */
    wx.navigateTo({
      url: '/pages/product/product?search=' + e.detail,
    })
    try {
      let value = wx.getStorageSync('tags');
      if (!value) {
        value = [e.detail];
      } else {
        value = JSON.parse(value);
        value.push(e.detail);
      }
      value = [...new Set(value)]
      wx.setStorageSync('tags', JSON.stringify(value));
      // this.setData({
      //   historyTags:value
      // })
    } catch (error) {

    }

  },

  /**
   * 清除历史搜索缓存
   */
  removeHistoryTag() {
    const that = this;
    wx.showModal({
      title: '提示',
      content: '确认删除全部历史记录？',
      success (res) {
        if (res.confirm) {
          try {
            wx.removeStorageSync('tags');
            that.setData({
              historyTags:[]
            })
          } catch (error) {
      
          }
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
    try {
      let value = wx.getStorageSync('tags');
      value = value ? JSON.parse(value) : [];
      this.setData({
        historyTags: value
      })
    } catch (error) {

    }
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
// miniprogram/pages/menu/menu.js
const api = require("../../myUtils/api.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tags: [],
    currentTag: '',
    isLoading: false,
    tagChild: []
  },

  /**
   * 搜索框文本变化事件
   * @param {*} e 
   */
  mychange(e) {
    console.log(e)
  },

  /**
   * 搜索框搜索事件|搜索框按钮点击事件
   * @param {*} e 
   */
  mysearch(e) {
    console.log(e)
  },

  /**
   * 搜索框点击事件
   * @param {*} e 
   */
  myclick(e) {
    // console.log(e);
    wx.navigateTo({
      url: '/pages/searchPage/searchPage',
    })
  },

  /**
   * 面包屑按钮点击事件
   * @param {*} e 
   */
  iconClick(e) {
    wx.navigateTo({
      url: '/pages/product/product?tag=' + this.data.tagChild[0],
    })
  },

  /**
   * 左侧列表文本点击事件
   * @param {*} e 
   */
  leftTagClick(e) {
    console.log(e)
    const tag = e.detail;
    for (let i = 0; i < this.data.tags.length; i++) {
      const item = this.data.tags[i];
      if (item.title === tag) {
        this.setData({
          tagChild: item.child
        })
        break;
      }
    }
  },

  /**
   * 标签点击事件
   * @param {*} e 
   */
  tagItemClick(e) {
    wx.navigateTo({
      url: '/pages/product/product?tag=' + e.detail,
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // api.getTags().then(data => {
    //   console.log(data);
    // })

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.setData({
      isLoading: true
    })
    api.wxGetTags((res) => {
      if(res.data.length < 1){
        this.setData({
          tags: res.data,
          currentTag:"",
          isLoading: false,
          tagChild: ""
        })
      }else{
        this.setData({
          tags: res.data,
          currentTag: res.data[0].title,
          isLoading: false,
          tagChild: res.data[0].child
        })
      }
    });
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    // console.log(this.data.tags)
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
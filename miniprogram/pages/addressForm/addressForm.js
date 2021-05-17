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
    index: -1,
    error: ""
  },
  /**
   * 省市区信息变化
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
   * 点击保存事件
   * @param {BaseEvent} e 
   */
  onSave(e) {
    let result = verification.call(this);
  },

  /**
   * 该方法api不可用
   * @param {Event} e 
   */
  onMailClick(e) {
    wx.chooseContact({
      success(res) {
        console.log(res)
      },
      fail(err) {
        console.log(err)
      }
    })
  },
  getLocation() {
    const that = this;
    wx.choosePoi({
      success(res) {
        console.log(res)
        that.setData({
          detail: res.address + `  ` + res.name
        })
      },
      fail(err) {
        that.setData({
          error: "地址信息获取失败"
        })
      }
    })
  },
  bindhide(e) {
    this.setData({
      error: ""
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

function verification() {
  // 验证收件人姓名
  if (!this.data.userName) {
    this.setData({
      error: "收件人名字不能为空"
    })
    return false;
  }
  // 验证收件人的手机号码
  if (!this.data.phone) {
    this.setData({
      error: "收件人手机号码不能为空"
    })
    return false;
  }

  if (!(/^1[345678]{1}\d{9}$/.test(this.data.phone))) {
    this.setData({
      error: "收件人手机号码不符合格式"
    })
    return false;
  }

  // 验证省市区
  if (!this.data.pcc || this.data.pcc.length !== 3) {
    this.setData({
      error: "请您选择省、市、区"
    })
    return false;
  }

  // 验证详细地址
  if (!this.data.detail) {
    this.setData({
      error: "请您填写详细地址"
    })
    return false;
  }
  return true;
}
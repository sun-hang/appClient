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
    currentAddressIndex: -1,
    globalLoading: false
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
    if (!this.data.currentAddressItem) {
      wx.showToast({
        title: '您还未选择收货地址',
        icon: "none"
      })
      return;
    }
    this.setData({
      globalLoading: true
    })
    let desc = {
      products: this.data.shopList,
      adminId: app.globalData.user._id,
      address: this.data.currentAddressItem,
      state: 0,
      isDelete: false,
      nickName: app.globalData.user.userInfo.nickName
    }
    setProducts(this.data.shopList);
    setShop([]);
    addOreder(desc, (err, res) => {
      this.setData({
        globalLoading: false
      })
    })
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
    this.setData({
      globalLoading: true
    })
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
      total,
      globalLoading: false
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

/**
 * 设置所有商品库存等信息
 * @param {Array} datas 
 */
function setProducts(datas = []) {
  datas.forEach(item => {
    api.setProduct(item, (err, res) => {
      // console.log(res)
    })
  })
}

/**
 * 从购物车去掉已经购买的商品
 * @param {Array} shopList 
 */
function setShop(shopList = []) {
  try {
    shopList = JSON.parse(wx.getStorageSync('shop'));
  } catch (error) {
    console.log(error)
  }
  shopList = shopList.filter(item => !item.type.checked);
  wx.setStorageSync('shop', shopList)
}

/**
 * 添加一个订单   用昵称加上
 * @param {Object} desc 
 */
function addOreder(desc = {}, callback) {
  console.log(desc)
  api.addOrder(desc, (err, res) => {
    callback(err, res);
    if (res.data) {
      wx.showToast({
        title: '已提交订单，请尽快联系店小二付款',
        duration: 1500,
        icon: 'none',
        success() {
          setTimeout(() => {
            wx.switchTab({
              url: '/pages/home/home',
            })
          }, 1500)
        }
      })
    }
  })
}

/**
 * All your data is a backed up. You must pay 0.005 BTC to 1KkJyEcFKPo5jon3VzJUrWy4Px22RkZz9A 48 hours for recover it. After 48 hours expiration we will leaked and exposed all your data. In case of refusal to pay, we will contact the General Data Protection Regulation, GDPR and notify them that you store user data in an open form and is not safe. Under the rules of the law, you face a heavy fine or arrest and your base dump will be dropped from our server! You can buy bitcoin here, does not take much time to buy https://localbitcoins.com with this guide https://localbitcoins.com/guides/how-to-buy-bitcoins After paying write to me in the mail with your DB IP: recoverybase@cock.li
 */
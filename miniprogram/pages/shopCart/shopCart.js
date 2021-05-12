// miniprogram/pages/shopCart/shopCart.js
/**
 * 从缓存取数据，每个商品会加上一个type值，记录规格信息
 */
const app = getApp();
const login = require('../../myUtils/login')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    shopList: [],
    globalShow: false,
    allChecked: true,
    totalPrice: 0,
    pageIsShow: false
  },

  /**
   * 全部多选框切换按钮
   * @param {*} e 
   */
  allChange(e) {
    let value = e.detail;
    let sum = 0;
    this.setData({
      globalShow: true
    })
    let list = this.data.shopList;
    list.forEach(item => {
      item.type.checked = value;
      if (value) {
        sum += item.type.total;
      }
    });
    try {
      wx.setStorageSync('shop', JSON.stringify(list));
    } finally {
      this.setData({
        globalShow: false,
        shopList: list,
        totalPrice: sum,
        allChecked: value
      })
    }
  },

  increaseBtnHandle(e) {
    countHandel.call(this, e.detail)
  },

  decreaseBtnHandle(e) {
    countHandel.call(this, e.detail)
  },

  deleteOne(e) {
    this.setData({
      globalShow: true
    })
    let sum = 0;
    let item = e.detail;
    let newArr = [];

    /**
     * 寻找要删除项并计算总价
     */
    for (let i = 0; i < this.data.shopList.length; i++) {
      const ele = this.data.shopList[i];
      if (ele._id === item._id && ele.type.name === item.type.name) {
        continue;
      }
      newArr.push(ele);
      sum += ele.type.total;
    }

    //如果没有数据要展示下方导航条
    if (newArr.length < 1) {
      wx.showTabBar({
        animation: false,
      })
    }
    try {
      wx.setStorageSync('shop', JSON.stringify(newArr));
    } catch (error) {

    }
    this.setData({
      globalShow: false,
      shopList: newArr,
      totalPrice: sum
    })
    wx.showToast({
      title: '删除成功',
    })
  },

  checkboxChange(e) {

    let item = e.detail;
    let sum = 0;
    this.setData({
      globalShow: true
    })

    let list = this.data.shopList;
    for (let i = 0; i < list.length; i++) {
      const ele = list[i];
      if (ele._id === item._id && item.type.name === ele.type.name) {
        ele.type = item.type;
        break;
      }
    }

    list.sort((item) => {
      if (item.type.checked) {
        sum += item.type.total;
        return -1
      }
      return 1
    })
    try {
      wx.setStorageSync('shop', JSON.stringify(list))
    } finally {
      this.setData({
        globalShow: false,
        totalPrice: sum,
        shopList: list,
        allChecked: list.every(item => item.type.checked)
      })
    }
  },

  confirmBtnHandle() {
    console.log('确认订单')
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
    /**
     * 判断是否有用户
     */
    if (app.globalData && app.globalData.user) {
      this.setData({
        pageIsShow: true
      })
    } else {
      if (!wx.getUserProfile) {
        wx.navigateTo({
          url: '/pages/login/login',
        })
      }
    }

    
    try {
      this.setData({
        globalShow: true
      })
      let value = wx.getStorageSync('shop');
      let totalPrice = 0;
      value = value ? JSON.parse(value) : [];
      value.forEach(item => {
        totalPrice += item.type.total
      })
      this.setData({
        shopList: value,
        globalShow: false,
        totalPrice,
        allChecked: value.every(item => item.type.checked)
      })

      if (value.length > 0) {
        wx.hideTabBar({
          animation: false,
        })
      }
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

  },

  onTabItemTap(res) {
    if (app.globalData.user) {
      return
    }
    login.getUser((err, res) => {
      if (!err) {
        this.setData({
          pageIsShow: true
        })
      } else {
        wx.switchTab({
          url: '/pages/home/home',
        })
        wx.showTabBar({
          animation: false,
        })
      }
    });

  }
})

function countHandel(item) {
  let list = this.data.shopList;
  let sum = 0;
  item = setProductStock(item);
  this.setData({
    globalShow: true
  })
  for (let i = 0; i < list.length; i++) {
    const ele = list[i];
    if (ele._id === item._id && ele.type.name === item.type.name) {
      ele.type = item.type;
    }
    sum += ele.type.total;
  }
  try {
    wx.setStorageSync('shop', JSON.stringify(list));
  } catch (error) {

  }

  this.setData({
    shopList: list,
    globalShow: false,
    totalPrice: sum
  })
}

function setProductStock(item) {
  let totalStock = 0; //总库存
  let currentStock = item.type.stock; //当前库存
  let optionDetail = item.optionsDetail; //规格详情
  //进行循环
  optionDetail.forEach(it => {
    //修改当前详情的库存
    if (it.type === item.type.name) {
      it.total = currentStock;
    }
    //计算总库存数量
    totalStock += it.total;
  })
  item.stock = totalStock;
  return item;
}
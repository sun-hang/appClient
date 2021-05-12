// miniprogram/pages/login/login.js
const app = getApp();
const api = require('../../myUtils/api');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    canIUseGetUserProfile: false,
    logged: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (wx.getUserProfile) {
      this.setData({
        canIUseGetUserProfile: true,
      })
    }

  },
  getUserProfile() {
    // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认，开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
    wx.getUserProfile({
      desc: '展示用户信息', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        login(res.userInfo)
      }
    })
  },

  onGetUserInfo: function (e) {
    if (!this.data.logged && e.detail.userInfo) {
      login(e.detail.userInfo)
      this.setData({
        logged: true
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

async function login(userInfo) {
  let openId = '';
  if (!app.globalData && !app.globalData.openId) {
    let res = await wx.cloud.callFunction({
      name: "login"
    })
    openId = res.result.openid;
  } else {
    openId = app.globalData.openId
  }

  api.getUserInfo(openId, (err, res) => {
    if (!res.data) {
      api.addAdmin({
        userInfo,
        openId
      }, (err, user) => {
        if (user.data) {
          console.log(user.data)
          app.globalData.user = user.data
          success()
        } else {
          fail();
        }
      })
    } else {
      res.data.userInfo = userInfo;
      app.globalData.user = res.data
      api.setAdmin(res.data._id, res.data, (err, res) => {
        if (res.data.ok) {
          success()
        } else {
          fail()
        }
      })
    }
  })
}

function success() {
  wx.showToast({
    title: '授权成功',
    icon: "none",
    success() {
      wx.navigateBack({});
    }
  })
}

function fail() {
  wx.showToast({
    title: '授权失败',
    icon: "none",
    success() {
      wx.switchTab({
        url: '/pages/home/home',
      })
      wx.showTabBar({
        animation: false,
      })
    }
  })
}
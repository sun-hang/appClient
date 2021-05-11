// components/user/userCard/userCard.js
const app = getApp();
const api = require('../../../myUtils/api');
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    user: null,
    globalLoading: false
  },
  lifetimes: {
    attached() {
      this.setData({
        user: app.globalData.user
      })
    }
  },
  /**
   * 组件的方法列表
   */
  methods: {
    onClick() {
      let user = app.globalData.user;
      const that = this;
      

      wx.getUserProfile({
        desc: '用于完善会员资料',
        lang: "zh_CN",
        success(res) {
          that.setData({
            globalLoading: true
          })
          let userInfo = res.userInfo;
          userInfo._id = user.userInfo._id;
          user.userInfo = userInfo;
          api.setProduct(user, (err, res) => {
            if (res.data.ok > 0) {
              that.setData({
                globalLoading: false
              })
              wx.showToast({
                title: '更新资料成功',
                icon: "none"
              })
            }
          })
        },

        fail(res) {
          wx.showToast({
            title: '更新资料失败',
            icon: "none"
          })
        }

      })

    }
  }
})

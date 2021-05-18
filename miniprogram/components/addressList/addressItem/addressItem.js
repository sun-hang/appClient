// components/addressList/addressItem/addressItem.js
const api = require('../../../myUtils/api');
const app = getApp();
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    item: {
      type: Object,
      value: null
    },
    index: {
      type: Number
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    exitClick() {
      wx.navigateTo({
        url: '/pages/addressForm/addressForm?index=' + this.data.index,
      })
    },
    deteleClick() {
      let index = this.data.index;
      wx.showModal({
        title: "提示",
        content: "确认删除当前地址吗？",
        success(res) {
          if (res.confirm) {
            app.globalData.user.address.splice(index, 1);
            api.setAdmin(app.globalData.user._id, { address: app.globalData.user.address }, () => {
              wx.redirectTo({
                url: "addressList"
              })
            })
          }
        }
      })
    },
    setDefault() {
      let index = this.data.index
      app.globalData.user.address[0].isDefault = false;
      app.globalData.user.address[index].isDefault = true;
      let temp = app.globalData.user.address[0];
      app.globalData.user.address[0] = app.globalData.user.address[index];
      app.globalData.user.address[index] = temp;
      api.setAdmin(app.globalData.user._id, { address: app.globalData.user.address }, (err, res) => {
        wx.redirectTo({
          url: "addressList"
        })
      })
    }
  }
})

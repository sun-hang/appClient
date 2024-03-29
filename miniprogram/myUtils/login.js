const app = getApp()
const api = require('./api');
/**
 * 
 * @param {Function} callback error   app.globalData
 */
module.exports.getUser = (callback) => {
  if (app.globalData && app.globalData.user) {
    callback(null, app.globalData);
    return;
  }
  const openId = app.globalData.openId;
  api.getUserInfo(openId, async (err, res) => {
    if (!openId) {
      const res = await wx.cloud.callFunction({
        name: "login"
      })
      openId = res.result.openid;
    }
    /**
     * 用户不存在的话进行授权添加用户
     */
    if (!res.data) {
      if (!wx.getUserProfile) {
        wx.navigateTo({
          url: 'pages/login/login',
        })
      } else {
        wx.getUserProfile({
          desc: '用于完善会员资料',
          lang: "zh_CN",
          success(r) {
            /**
             * 添加用户
             */
            api.addAdmin({
              openId,
              userInfo: r.userInfo
            }, (err, user) => {
              //成功后添加到app的globalData
              app.globalData.user = user.data;
              callback(null, app.globalData);
            })
          },

          fail(res) {
            console.log(res);
            callback(true, null);
          }

        })
      }
    } else {
      app.globalData.user = res.data;
      callback(null, app.globalData);
    }

  })
}
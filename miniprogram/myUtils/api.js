const axios = require('axios').default;

const url = "http://127.0.0.1:12307";

/**
 * 获取所有标签
 */
module.exports.getTags = async () => {
  return await axios.get(url + '/api/tag')
}

/**
 * 获取所有标签
 * @param {function} callback 成功回调
 */
module.exports.wxGetTags = (callback) => {
  wx.request({
    url: url + '/api/tag',
    method: "GET",
    dataType: "json",
    success(res) {
      callback(res)
    },
    fail(err) {
      console.log('error', err)
    }
  })
}

/**
 * 获取猜你喜欢商品列表
 * @param {Function} callback 成功回调
 */
module.exports.getLikeProduct = (callback) => {
  let page = 1,
    size = 20,
    ctime = -1;

  let path = `/api/product?page=${page}&size=${size}&ctime=${ctime}`
  wx.request({
    url: url + path,
    method: "GET",
    dataType: "json",
    success(res) {
      callback(res)
    },
    fail(err) {
      console.log('error', err)
    }
  })
}

/**
 * 获取分页商品列表
 * @param {Number} page 当前页码
 * @param {Number} size 页容量
 * @param {String} tag 所属标签
 * @param {String} productName 商品名称
 * @param {Function} callback 成功回调
 */
module.exports.getProductList = (page = 1, size = 10, tag = '', productName = '', callback) => {
  const path = `/api/product?page=${page}&size=${size}&tag=${tag}&productName=${productName}`;
  wx.request({
    url: url + path,
    method: "GET",
    dataType: "json",
    success(res) {
      callback(null, res)
    },
    fail(res) {
      callback(res + "错误", null)
    }
  })
}

/**
 * 获取一个商品的详情
 * @param {String} id 商品ObjectId
 * @param {Function} callback 成功回调
 */
module.exports.getProductOne = (id = '', callback) => {
  let path = `/api/product/${id}`
  wx.request({
    url: url + path,
    method: "GET",
    dataType: "json",
    success(res) {
      callback(null, res)
    },
    fail(res) {
      callback(res + "错误", null)
    }
  })
}

/**
 * 根据openId获取用户信息
 * @param {String} openId 
 * @param {Function} callback 
 */
module.exports.getUserInfo = (openId = "", callback) => {
  let path = `/api/admin?openId=${openId}`;
  wx.request({
    url: url + path,
    method: "GET",
    dataType: "json",
    success(res) {
      callback(null, res)
    },
    fail(res) {
      callback(res + "错误", null)
    }
  })
}

/**
 * 获取所有订单信息
 * @param {Function} callback 
 */
module.exports.getOrderList = (callback) => {
  let path = `/api/order?page=${-1}`
  wx.request({
    url: url + path,
    method: "GET",
    dataType: "json",
    success(res) {
      callback(null, res)
    },
    fail(res) {
      callback(res + "错误", null)
    }
  })
}
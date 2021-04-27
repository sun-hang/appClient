const axios = require('axios').default;

const url = "http://127.0.0.1:12307";

module.exports.getTags = async () => {
  return await axios.get(url + '/api/tag')
}
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
const cloud = require('wx-server-sdk');
const axios = require('axios').default;
cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})

exports.main = async (event, context) => {
  const result = await axios.get(event.api).then(res => res.data);
  return {
    result: result.result
  }
}
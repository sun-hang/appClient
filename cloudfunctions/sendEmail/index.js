const cloud = require('wx-server-sdk');
const nodemailer = require('nodemailer');
let to = 'sun_fang@aliyun.com';
let fang = "836560138@qq.com";
let config = {
  host: 'smtp.qq.com',
  port: 465,
  auth: {
    user: '1844528595@qq.com',
    pass: "kthgwtcpfymzjjbb"
  }
}
cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})
let transporter = nodemailer.createTransport(config)
exports.main = async (event, context) => {
  let text = `用户名称：【${event.name}】 \r\n`;
  let list = event.productList;
  for (let i = 0; i < list.length; i++) {
    text += `商品名称：【${list[i].title}】  品牌：【${list[i].tag}】  购买数量：【${list[i].num}】   价格：【${list[i].price}】  总计：【${list[i].price * list[i].num}】\n`
  }
  text += `总计【${event.total}件】  总价格：【${event.price}】元`
  let msg = {
    from: "来自你家猪猪<1844528595@qq.com>",
    subject: "来自客户的订单",
    to:fang,
    text
  }
  let res = await transporter.sendMail(msg);
  return res;
}
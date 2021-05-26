/**
 * 根据时间戳返回日期字符串
 * @param {*} time 
 */
module.exports.getYearString = (time) => {
  let year = '';
  let timeObj = new Date(+time);
  year = `${timeObj.getFullYear()}-${(timeObj.getMonth() + 1).toString().padStart(2, '0')}-${timeObj.getDate().toString().padStart(2, '0')} ${timeObj.getHours().toString().padStart(2, '0')}:${timeObj.getMinutes().toString().padStart(2, '0')}:${timeObj.getSeconds().toString().padStart(2, '0')}`;
  return year;
}
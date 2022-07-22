const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return `${[year, month, day].map(formatNumber).join('-')} ${[hour, minute, second].map(formatNumber).join(':')}`
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : `0${n}`
}

/** 秒换算
 * @param {String} seconds - 秒数
 * @return {number,unit} unit -单位
 */
const secondTransform = seconds => {
  if (seconds > 86400) return {
    number: (seconds / 86400).toFixed(1),
    unit: "days"
  }
  if (seconds > 3600) return {
    number: (seconds / 3600).toFixed(1),
    unit: "h"
  }
  if (seconds > 60) return {
    number: (seconds / 86400).toFixed(1),
    unit: "min"
  }
}
module.exports = {
  formatTime,
  secondTransform
}
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
    number: parseInt((seconds / 86400)),
    unit: "days"
  }
  if (seconds > 3600) return {
    number: parseInt((seconds / 3600)),
    unit: "h"
  }
  if (seconds > 60) return {
    number: parseInt((seconds / 60)),
    unit: "min"
  }
  return {
    number: '0.0',
    unit: 'min'
  }
}
module.exports = {
  formatTime,
  secondTransform
}
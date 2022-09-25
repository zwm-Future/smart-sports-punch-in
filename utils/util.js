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
const secondTransform = (seconds, type) => {

  if (seconds >= 86400) return [{
    number: parseInt((seconds / 86400)),
    unit: "d"
  }, {
    number: parseInt((seconds % 86400 / 3600)),
    unit: "h"
  }]
  if (seconds >= 3600) return [{
    number: parseInt((seconds / 3600)),
    unit: "h"
  }, {
    number: parseInt((seconds % 3600 / 60)),
    unit: "min"
  }]
  if (seconds >= 60) return [{
    number: parseInt((seconds / 60)),
    unit: "min"
  }]
  return [{
    number: '0.0',
    unit: 'min'
  }]
}
/** 分换算
 * @param {String} mins - 分数
 * @return {number,unit} unit -单位
 */
const minTransform = (mins, type) => {
  if (mins >= 1440) return [{
    number: parseInt((mins / 1440)),
    unit: "d"
  }, {
    number: parseInt((mins % 1440 / 60)),
    unit: "h"
  }]
  if (mins >= 60) return [{
    number: parseInt((mins / 60)),
    unit: "h"
  }, {
    number: parseInt((mins % 60)),
    unit: "min"
  }]
  if (mins > 0) return [{
    number: mins,
    unit: 'min'
  }]
  return [{
    number: '0.0',
    unit: 'min'
  }]
}

module.exports = {
  formatTime,
  secondTransform,
  minTransform
}
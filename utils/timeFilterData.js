/** 
  @param str : YYYY-MM-DD ...
  @returns num
*/
function StringToMonthNum(str) {
  return str[6];
}

/** 
  @param str : YYYY-MM-DD ...
  @returns num
*/
function StringToDayNum(str) {
  return str[8] + str[9];
}

/** 
  @param ArrObj : obj里是end (后台的返回字段)
  @returns num
*/
//本月数据
export function filterCurrentMonth(ArrObj) {
  const date = new Date();
  const currentMonth = date.getMonth() + 1;
  return ArrObj.filter(item => StringToMonthNum(item.end) == currentMonth);
}

/** 
  @param ArrObj : obj里是end (后台的返回字段)
  @returns num
*/
//本周数据
export function filterCurrenWeek(ArrObj) {
  const date = new Date();
  const currentYear = date.getFullYear()
  const currentMonth = date.getMonth() + 1;
  const currentDay = date.getDate();
  let currentWeek = date.getDay();
  currentWeek = currentWeek == 0 ? 6 : currentWeek - 1;
  return ArrObj.filter(item => {
    const day = StringToDayNum(item.end);
    const month = StringToMonthNum(item.end);
    //一周在上月这月之间
    if (month == currentMonth - 1) {
      const d = new Date(currentYear, currentMonth, 0);
      const monthMaxDay = d.getDate();
      return parseInt(day) + 7 - currentWeek - monthMaxDay > currentDay
    } else //一周在这月
      return month == currentMonth && ((currentDay - currentWeek) <= day) && ((currentDay + 7 - currentWeek) >= day)
  });
}
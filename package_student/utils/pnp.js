/**
 * 
 * @param {*经纬度数组, [{latitude,longitude}]} verArr 
 * @param {*判断点纬度latitude} targetX 
 * @param {*判断点纬度longitude} targetY 
 */
export default function pnpoly(verArr, targetX, targetY) {
  if(!verArr) return;
  const nvert = verArr.length;
  let i = 0, j = 0, result = false;
  for (i = 0, j = nvert - 1; i < nvert; j = i++) {
    if (((verArr[i].longitude > targetY) != (verArr[j].longitude > targetY)) &&
      (targetX < Number((verArr[j].latitude - verArr[i].latitude) * (targetY - verArr[i].longitude) / (verArr[j].longitude - verArr[i].longitude)) + Number(verArr[i].latitude))) {
      result = !result;
    }
  }
  return result;
}
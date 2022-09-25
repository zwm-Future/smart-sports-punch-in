/**
 *  处理当前学期处理 如果全局没有 就发请求 有就从全局取
 * 
 * 
 */

import {
  getCurrentSemester
} from "../api/semester"

export const _getCurrentSemester = async function () {
  try {
    const app = getApp();
    const {
      currentSemester
    } = app.globalData;
    if (!currentSemester) {
      const {
        code,
        data
      } = await getCurrentSemester();
      if (code) {
        app.globalData.currentSemester = data;
      } else {
        console.log('code 0----currentSemester:utils');
      }
      return data;
    }
    return currentSemester
  } catch (error) {
    console.log('my-teacher:package_student', error);
  }
}
import Request from "./request.js"

export const getAllSemesters = () => {
  /**
  * 
  */
    return Request({
      url:'/semester/all',
    })
}

export const getCurrentSemester = () => {
  /**
  * 
  */
    return Request({
      url:'/semester/now',
    })
}
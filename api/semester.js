import Request from "./request.js"

export const getAllSemesters = () => {
  /**
  * 
  */
    return Request({
      url:'/semester/all',
    },
    0)
}

export const getCurrentSemester = () => {
  /**
  * 
  */
    return Request({
      url:'/semester/now',
    })
}
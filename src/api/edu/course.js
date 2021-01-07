import request from '@/utils/request'

// 添加课程信息
export function addCourseInfo(courseInfo) {
  return request({
    url: '/eduservice/edu-course/addCourseInfo',
    method: 'post',
    data: courseInfo
  })
}
// 查询所有讲师
export function getListTeacher() {
  return request({
    url: '/eduservice/edu-teacher/findAll',
    method: 'get'
  })
}

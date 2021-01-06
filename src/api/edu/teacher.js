import request from '@/utils/request'

export function getTeacherListPage(current, limit, teacherQuery) {
  return request({
    url: `/eduservice/edu-teacher/pageTeacherCondition/${current}/${limit}`,
    method: 'post',
    // data表示把对象转换为json进行传递到接口里面
    data: teacherQuery
  })
}

export function removeById(teacherId) {
  return request({
    url: `/eduservice/edu-teacher/${teacherId}`,
    method: 'delete'
  })
}

export function addTeacher(teacher) {
  return request({
    url: '/eduservice/edu-teacher/addTeacher',
    method: 'post',
    data: teacher
  })
}

export function getTeacherById(teacherId) {
  return request({
    url: `/eduservice/edu-teacher/getTeacher/${teacherId}`,
    method: 'get'
  })
}

export function updateTeacherInfo(teacher) {
  return request({
    url: '/eduservice/edu-teacher/updateTeacher',
    method: 'post',
    data: teacher
  })
}

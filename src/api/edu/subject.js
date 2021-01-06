import request from '@/utils/request'

export function getSubjectList() {
  return request({
    url: '/eduservice/edu-subject/getAllSubject',
    method: 'get'
  })
}

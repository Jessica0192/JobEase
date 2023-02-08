// this file contains api calls for Job Record Entity

import service from './base/service'
import { API } from './base/config'

// these are the api calls specific to User
export const api = {
  getJobRecordByID (args, param) {
    return service.get(`${API.jobRecord('')}`, param)
  },
  getAllJobRecords () {
    return service.get(`${API.jobRecord('')}`)
  },
  createJobRecord (args, param) {
    return service.post(`${API.jobRecord('create_jobRecord')}`, param)
  }
}

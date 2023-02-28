// this file contains api calls for Job Record Entity

import service from './base/service'
import { API } from './base/config'

// these are the api calls specific to Job Record
export const jobRecordApi = {
  getJobRecordByID (jobRecordId) {
    return service.get(`${API.jobRecord('')}${jobRecordId}`)
  },
  getAllJobRecords () {
    return service.get(`${API.jobRecord('')}`)
  },
  createJobRecord (data) {
    return service.post(`${API.jobRecord('')}`, data)
  },
  updateJobRecord(jobRecordId, data){
    return service.put(`${API.jobRecord('')}${jobRecordId}`, data)
  },
  deleteJobRecord(jobRecordId) {
    return service.delete(`${API.jobRecord('')}${jobRecordId}`)
  }
}

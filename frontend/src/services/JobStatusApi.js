// this file contains api calls for Job Tag Entity

import service from './base/service'
import { API } from './base/config'

// these are the api calls specific to User
export const jobStatusApi = {
  getAllStatus () {
    return service.get(`${API.jobStatus('')}`, )
  }
}

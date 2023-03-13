// this file contains api calls for Dashboard UI

import service from './base/service'
import { API } from './base/config'

// these are the api calls specific to Job Record
export const dashboardApi = {
  getAllJobRecordsTagCountForUser () {
    return service.get(`${API.dashboard('')}jobSearchMetrics`)
  },
}

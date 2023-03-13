// this file contains api calls for Job Note Type Entity

import service from './base/service'
import { API } from './base/config'

// these are the api calls specific to User
export const jobNoteTypeApi = {
  getAllJobNoteTypes () {
    return service.get(`${API.jobNoteType('')}`, )
  }
}

// this file contains api calls for Authentication

import service from './base/service'
import { API } from './base/config'

// these are the api calls specific to Authentication
export const api = {
  logInUser (data) {
    return service.post(`${API.auth('login/')}`, data)
  },
  logOutUser (data){
    return service.post(`${API.auth('logout/')}`, data)
  }
}

export const testApi = {
  getTests () {
    return service.get(`${API.tests}`)
  },
  /* Register Test
   * @param { Object } args
   * @param { string } args.args1
   * @param { string } args.args2
   * @param { string } args.args3
   */
  setTest (args) {
    return service.post(`${API.test(args)}`)
  }
}

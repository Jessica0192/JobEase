// this file contains api calls for Authentication

import service from './base/service'
import { API } from './base/config'

// these are the api calls specific to User
export const api = {
  logInUser (param) {
    return service.post(`${API.auth('login/')}`, param)
  }
  // setUser (args) {
  //   return service.post(`${API_URL}${API.user(args)}`)
  // },
  // updateUser (args, param) {
  //   return service.put(`${API_URL}${API.user(args)}`, param)
  // }
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

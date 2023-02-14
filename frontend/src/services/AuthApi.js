// this file contains api calls for Authentication

import loginService from './base/loginService'
import { API } from './base/config'

// these are the api calls specific to Authentication
export const api = {
  logInUser (data) {
    return loginService.post(`${API.auth('login/')}`, data)
  },
  logOutUser (data){
    return loginService.post(`${API.auth('logout/')}`, data)
  }
}

export const testApi = {
  getTests () {
    return loginService.get(`${API.tests}`)
  },
  /* Register Test
   * @param { Object } args
   * @param { string } args.args1
   * @param { string } args.args2
   * @param { string } args.args3
   */
  setTest (args) {
    return loginService.post(`${API.test(args)}`)
  }
}

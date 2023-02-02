// this file contains api calls for User Entity

import service from './service'
import { API_URL, API } from './config'

// these are the api calls specific to User
export const api = {
  getUserByID (args, param) {
    return service.get(`${API_URL}${API.user(args)}`, param)
  },
  getAllUsers (args) {
    return service.get(`${API_URL}${API.user(args)}`)
  },
  createUser (args, param) {
    return service.post(`${API_URL}${API.user(args)}`, param)
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
    return service.get(`${API_URL}${API.tests}`)
  },
  /* Register Test
   * @param { Object } args
   * @param { string } args.args1
   * @param { string } args.args2
   * @param { string } args.args3
   */
  setTest (args) {
    return service.post(`${API_URL}${API.test(args)}`)
  }
}

import axios, { AxiosError } from 'axios'
import store from '@/store'

// Provide basic information according to the project settings.
const service = axios.create({
  baseURL: 'http://localhost:8000/'
  // timeout,
  // withCredentials,
})

// Include the necessary information when requesting an axios
service.interceptors.request.use(
  (config) => {
    config.headers['Content-Type'] = 'application/json';

    // add authorization header only if the token exists; otherwise ignore
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = 'Bearer ' + token;
      // config.headers['Authorization'] = 'Bearer ${this.$store.state.token}';
    }
    return config
  }
)

// Include the necessary processing in the response.
service.interceptors.response.use(resp => resp, async error => {
  console.log(error);

  if (error.response.status === 401) {
    // 401 error occurred, dispatch logout action
    await store.dispatch('logout');
  }

  // it is used to reject the Promise chain and propagate the error to the caller of the service method.
  // This allows the caller to handle the error appropriately based on the error message or status code.
  return Promise.reject(error);
})
// (res) => { return res },
// (error) => Promise.reject(error)

// these are the default methods when calling api call
export default {
  async get (url, data) {
    try {
      const res = await service.get(url, data)
      if (res instanceof AxiosError) {
        return res.response
      }
      return res
    } catch (e) {
      return console.log(e)
    }
  },

  async post (url, data) {
    try {
      const res = await service.post(url, data)
      // check if the response is type of AxiosError, and if so return only response
      if (res instanceof AxiosError) {
        return res.response
      }
      return res
    } catch (e) {
      return console.log(e)
    }
  },

  async put (url, data) {
    try {
      const res = await service.put(url, data)
      if (res instanceof AxiosError) {
        return res.response
      }
      return res
    } catch (e) {
      return console.log(e)
    }
  },

  async delete (url, data) {
    try {
      const res = await service.delete(url, data)
      if (res instanceof AxiosError) {
        return res.response
      }
      return res
    } catch (e) {
      return console.log(e)
    }
  }
}

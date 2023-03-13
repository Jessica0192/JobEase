import axios, { AxiosError } from 'axios'
import store from '@/store'
import {API_URL} from '@/services/base/config'

// Provide basic information according to the project settings.
const service = axios.create({
  baseURL: API_URL,
  timeout: 30000
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
  console.log(error.response.data.detail);

  if (error.response) {
    if (error.response.status === 401) {
      // 401 error occurred, dispatch logout action
      await store.dispatch('logout');
    }

    if (error.response.status === 404) {
      throw new Error('Object not found');
    }
  }

  return error;
})

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
      console.log(e.response)
      return e.response
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
      console.log(e.response)
      return e.response
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
      console.log(e.response)
      return e.response
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
      console.log(e.response)
      return e.response
    }
  }
}

import axios, { AxiosError } from 'axios'

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
  if (error.response.status === 401) {
    console.log("Service Error: " + error)
  }
  return error
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

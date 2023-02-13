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
    // TODO: DON'T FORGET TO HANDLE THIS. WE NEED TO FIND A WAY OF USING DIFFERENT CONTENT TYPE FOR DIFFERENT REQUESTS
    // config.headers['Content-Type'] = 'application/json';
    config.headers['Content-Type'] = 'application/x-www-form-urlencoded';

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
let refresh = false
service.interceptors.response.use(resp => resp, async error => {
  if (error.response.status === 401 && !refresh) {
    refresh = true
    const {status, data} = await service.post('refresh', {}, {
      withCredentials: true
    })

    if (status === 200) {
      service.defaults.headers.common['Authorization'] = `Bearer ${data.access_token}`
      return service(error.config)
    }
  }
  refresh = false
  return error
})
// (res) => { return res },
// (error) => Promise.reject(error)

// these are the default methods when calling api call
export default {
  async get (options) {
    try {
      const res = await service.get(options)
      return res
    } catch (e) {
      return console.log(e)
    }
  },

  async post (...options) {
    try {
      console.log('options: ' + options)
      const res = await service.post(options[0], (options[1]) ? options[1] : null)
      // check if the response is type of AxiosError, and if so return only response
      if (res instanceof AxiosError) {
        return res.response
      }
      return res
    } catch (e) {
      return console.log(e)
    }
  },

  async put (...options) {
    try {
      const res = await service.put(options)
      return res
    } catch (e) {
      return console.log(e)
    }
  },

  async delete (...options) {
    try {
      const res = await service.delete(options)
      return res
    } catch (e) {
      return console.log(e)
    }
  }
}

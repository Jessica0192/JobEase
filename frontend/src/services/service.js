import axios from 'axios'

// Provide basic information according to the project settings.
const service = axios.create({
  baseURL: 'http://localhost:8000/'
  // timeout,
  // withCredentials,
})

// Include the necessary information when requesting an axios
service.interceptors.request.use(
  (config) => {
    config.headers = {
      'Content-Type': 'application/json',
      // 'Authorization': `Bearer ${this.$store.state.token}`,
      'Authorization': `Bearer ${localStorage.getItem('token')}`
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
      service.defaults.headers.common['Authorization'] = `Bearer ${data.token}`
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
    // 공통
    try {
      console.log('options: ' + options)
      const res = await service.post(options[0], (options[1]) ? options[1] : null)
      return res
    } catch (e) {
      return console.log(e)
    }
  },

  async put (...options) {
    // 공통
    try {
      const res = await service.put(options)
      return res
    } catch (e) {
      return console.log(e)
    }
  },

  async delete (...options) {
    // 공통
    try {
      const res = await service.delete(options)
      return res
    } catch (e) {
      return console.log(e)
    }
  }
}

import axios from 'axios'

// Provide basic information according to the project settings.
const service = axios.create({
  // baseURL,
  // timeout,
  // withCredentials,
})

// Include the necessary information when requesting an axios
service.interceptors.request.use(
  (config) => {
    config.headers = {
      'Content-Type': 'application/json'
    }
    return config
  }
)

// Include the necessary processing in the response.
service.interceptors.response.use(
  (res) => { return res },
  (error) => Promise.reject(error)
)

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

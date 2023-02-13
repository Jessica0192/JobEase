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
  else {
    alert(error.response.data.detail)
  }

  refresh = false
  return error
})
// (res) => { return res },
// (error) => Promise.reject(error)

// these are the default methods when calling api call
export default {
  async get (url, data) {
    try {
      const res = await service.get(url, data)
      return res
    } catch (e) {
      return console.log(e)
    }
  },

  async post (url, data) {
    try {
      const res = await service.post(url, data)
      return res
    } catch (e) {
      return console.log(e)
    }
  },

  async put (url, data) {
    try {
      console.log(data)
      const res = await service.put(url, data)
      return res
    } catch (e) {
      return console.log(e)
    }
  },

  async delete (url, data) {
    try {
      const res = await service.delete(url, data)
      return res
    } catch (e) {
      return console.log(e)
    }
  }
}

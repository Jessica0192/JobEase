import axios, { AxiosError } from 'axios'

// Provide basic information according to the project settings.
const loginService = axios.create({
  baseURL: 'http://localhost:8000/'
})

// Include the necessary information when requesting an axios
loginService.interceptors.request.use(
  (config) => {
    config.headers['Content-Type'] = 'application/x-www-form-urlencoded';
    return config
  }
)

// Include the necessary processing in the response.
let refresh = false
loginService.interceptors.response.use(resp => resp, async error => {
  if (error.response.status === 401 && !refresh) {
    refresh = true
    const {status, data} = await loginService.post('refresh', {}, {
      withCredentials: true
    })

    if (status === 200) {
      loginService.defaults.headers.common['Authorization'] = `Bearer ${data.access_token}`
      return loginService(error.config)
    }
  }
  refresh = false
  return error
})

// these are the default methods when calling api call
export default {
  async post (...options) {
    try {
      console.log('login service options: ' + options)
      const res = await loginService.post(options[0], (options[1]) ? options[1] : null)
      // check if the response is type of AxiosError, and if so return only response
      if (res instanceof AxiosError) {
        return res.response
      }
      return res
    } catch (e) {
      return console.log(e)
    }
  }
}

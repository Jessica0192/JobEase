// this is a javascript file for LoginView.vue page
import store from '@/store'
import {api} from '../services/AuthApi'

export default {
  name: 'LoginPage',
  // these are properties used in this file
  data: () => ({
    msg: [],
    userNameLogin: '',
    passwordLogin: '',
    emptyFields: false
  }),
  // have multiple methods
  methods: {
    // this is going to be called when 'Login' button is pressed
    async doLogin () {
      if (this.userNameLogin === '' || this.passwordLogin === '') {
        this.emptyFields = true
      } else {
        // send API call './login'

        let loginFormData = new FormData();
        loginFormData.append('username', this.userNameLogin)
        loginFormData.append('password', this.passwordLogin)

        // since the request body requires form data, send the data as FormData instead of JSON
        const response = await api.logInUser(loginFormData, {
          withCredentials: true
        })
        console.log(response)
        if (response.status === 200) {
          const token = response.data.access_token
          const user = this.userNameLogin
          // calling login method in auth.js to update 'store' object
          await store.dispatch('login', { token, user })
        } else {
          this.msg.failedMsg = response.data.detail
        }
      }
    }
  }
}

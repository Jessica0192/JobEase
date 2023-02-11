// this is a javascript file for LoginView.vue page

import router from '../router'
import store from '@/store'
// import {api} from '../services/AuthApi'

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

        const inputs = {
          username: this.userNameLogin,
          password: this.passwordLogin
        }
        console.log(inputs)

        // const data = await api.logInUser(JSON.stringify(inputs), {
        //   withCredentials: true
        // })
        // console.log(data)
        //if (data.status === 200) {
          alert('You are now logged in')

          const token = 'your-token'
          const user = this.userNameLogin
          // calling login method in auth.js to update 'store' object
          await store.dispatch('login', { token, user })
          await router.push({ name: 'Dashboard'})
        //}
      }
    }
  }
}
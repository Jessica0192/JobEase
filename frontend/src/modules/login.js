// this is a javascript file for LoginView.vue page

import router from '../router'
import store from '@/store'
// import {api} from '../services/UserApi'

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

        // const inputs = {
        //   user_name: this.userNameLogin,
        //   password: this.passwordLogin
        // }

        // const {data} = await api.logInUser('login', inputs, {
        //   withCredentials: true
        // })
        // event.defaults.headers.common['Authorization'] = `Bearer ${data.token}`
        alert('You are now logged in')

        // set isUserLoggedIn store object to true to allow navigating to different pages
        await store.dispatch('setUserLoggedIn', true)
        await router.push({ name: 'Dashboard'})
      }
    }
  }
}

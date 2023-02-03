// this is a javascript file for Login.vue page

import router from '../router'
// import {api} from '../services/UserApi'

export default {
  name: 'Login',
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
    async doLogin (e) {
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
        // eslint-disable-next-line standard/object-curly-even-spacing
        await router.push({ name: 'location.index', query: { userLoggedIn: true }})
      }
    }
  }
}

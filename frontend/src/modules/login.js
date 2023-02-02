// this is a javascript file for Login.vue page

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
        e.preventDefault()
        alert('You are now logged in')
      }
    }
  }
}

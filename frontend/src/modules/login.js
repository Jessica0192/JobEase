// this is a javascript file for Login.vue page
export default {
  name: 'Login',
  // these are properties used in this file
  data: () => ({
    msg: [],
    userNameLogin: '',
    passwordLogin: '',
    emptyFields: false
    // prevRoute: null
  }),
  // have multiple methods
  methods: {
    // this is going to be called when 'Login' button is pressed
    doLogin () {
      if (this.userNameLogin === '' || this.passwordLogin === '') {
        this.emptyFields = true
      } else {
        alert('You are now logged in')
      }
    }
  }
  // beforeRouteEnter (to, from, next) {
  //   next(vm => {
  //     vm.prevRoute = from
  //   })
  // }
}

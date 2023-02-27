// this is a javascript file for RegisterView.vue page

import {userApi} from '../services/UserApi.js'
import router from '../router'

export default {
  name: 'RegisterPage',
  // these are properties used in this file
  data: () => ({
    msg: [],
    firstNameReg: '',
    lastNameReg: '',
    userNameReg: '',
    emailReg: '',
    passwordReg: '',
    confirmReg: '',
    disabled: [true, true, true],
    emptyFields: false
    // prevRoute: null
  }),
  // the watch property to observe changes in specific data properties and trigger input validation functions.
  watch: {
    emailReg (value) {
      this.validateEmail(value)
    },
    passwordReg (value) {
      this.validatePassword(value)
    },
    confirmReg (value) {
      this.validateConfirmPassword(value)
    }
  },
  // have multiple methods
  methods: {
    initForm () {
      this.emailReg = ''
      this.userNameReg = ''
      this.passwordReg = ''
      this.confirmReg = ''
    },
    // this is going to be called when 'Register' button is pressed
    async doRegister () {
      if (this.firstNameReg === '' || this.lastNameReg === '' ||
        this.emailReg === '' || this.passwordReg === '' || this.confirmReg === '') {
        this.emptyFields = true
      } else if (!this.disabled.every(i => i === false)) {
        alert('Please provide inputs in correct format')
      } else {
        try {
          // create user data in json format
          const userData = {
            first_name: this.firstNameReg,
            last_name: this.lastNameReg,
            email: this.emailReg,
            username: this.userNameReg,
            password: this.passwordReg
          }
          // API call
          await userApi.createUser(JSON.stringify(userData)).then(res => {
            console.log(res)
            if (res.status === 200) {
              this.initForm()
              router.push('Login')
            }
          })
        } catch (exception) {
          console.log(exception)
        }
      }
    },
    // this is going to be called from 'watch' and validates email input format
    validateEmail (value) {
      // eslint-disable-next-line no-useless-escape
      if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value)) {
        this.msg['email'] = ''
        this.disabled = [false, this.disabled[1], this.disabled[2]]
      } else {
        this.msg['email'] = 'Invalid Email Address'
        this.disabled = [true, this.disabled[1], this.disabled[2]]
      }
    },
    // this is going to be called from 'watch' and validates password input length
    validatePassword (value) {
      let difference = 8 - value.length
      if (value.length < 8) {
        this.msg['password'] = 'Must be 8 characters! ' + difference + ' characters left'
        this.disabled = [this.disabled[0], true, this.disabled[2]]
      } else {
        this.msg['password'] = ''
        this.disabled = [this.disabled[0], false, this.disabled[2]]
      }
    },
    // this is going to be called from 'watch' and validates confirm password input is equal to password input
    validateConfirmPassword (value) {
      if (this.passwordReg !== value) {
        this.msg['confirmPassword'] = 'Passwords are different'
        this.disabled = [this.disabled[0], this.disabled[1], true]
      } else {
        this.msg['confirmPassword'] = ''
        this.disabled = [this.disabled[0], this.disabled[1], false]
      }
    }
  }
}

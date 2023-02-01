// this is a javascript file for Register.vue page
export default {
  name: 'Register',
  // these are properties used in this file
  data: () => ({
    msg: [],
    userNameReg: '',
    emailReg: '',
    passwordReg: '',
    confirmReg: '',
    disabled: [true, true, true],
    emptyFields: false
    // prevRoute: null
  }), // the watch property to observe changes in specific data properties and trigger input validation functions.
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
    // this is going to be called when 'Register' button is pressed
    doRegister (e) {
      if (this.emailReg === '' || this.passwordReg === '' || this.confirmReg === '') {
        this.emptyFields = true
      } else if (!this.disabled.every(i => i === false)) {
        alert('Please fill out all the fields in correct format')
        e.preventDefault()
      } else {
        // call Api-endpoint and if status code is 200 navigate back to login page
        alert('You are now registered')
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

<template>
<div id="app">
   <div class="register-page">
      <div class="container">
         <div class="row">
            <div class="col-lg-4 col-md-6 col-sm-8 mx-auto">
               <div class="card register" v-bind:class="{ error: emptyFields }">
                  <h2>Sign Up</h2>
                  <form class="form-group" data-url_root="/login" @submit.prevent="doRegister">
                    <input v-model="firstNameReg" id="firstName" type="text" class="form-control" placeholder="First Name" required>
                    <input v-model="lastNameReg" id="lastName" type="text" class="form-control" placeholder="Last Name" required>
                     <input v-model="userNameReg" id="userName" type="text" class="form-control" placeholder="User Name" required>
                     <input v-model="emailReg" id="email" type="email" class="form-control" placeholder="Email" required>
                     <span style="color:darkred;font-size:4mm" v-if="msg.email">{{msg.email}}</span>
                     <input v-model="passwordReg" id="password" type="password" class="form-control" placeholder="Password" required>
                     <span style="color:darkred;font-size: 4mm" v-if="msg.password">{{msg.password}}</span>
                     <input v-model="confirmReg" id="confirmPassword" type="password" class="form-control" placeholder="Confirm Password" required>
                     <span style="color:darkred;font-size:4mm" v-if="msg.confirmPassword">{{msg.confirmPassword}}</span>
                     <input id="register-button" type="submit" class="btn btn-primary">
                     <p>Already have an account? <a href="/login" @click="emptyFields = false">Sign in here</a>
                     </p>
                  </form>
               </div>
            </div>
         </div>
      </div>
   </div>
</div>
</template>

<style scoped src="../assets/css/loginRegisterPages.css">
</style>

<script>
  // this is a javascript file for RegisterView.vue page

import {api} from '../services/UserApi.js'
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
          await api.createUser('create_user', JSON.stringify(userData)).then(res => {
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

</script>


<!--https://blog.logrocket.com/vue-form-input-validation-watchers/-->

<style scoped src="../assets/css/loginpage.css">
</style>

<template>
  <div id="app">
   <div class="login-page">
      <div class="container">
         <div class="row">
            <div class="col-lg-4 col-md-6 col-sm-8 mx-auto">
               <div v-if="!registerActive" class="card login" v-bind:class="{ error: emptyFields }">
                  <h2>Sign In</h2>
                  <form class="form-group">
                     <input v-model="userNameLogin" id="userName" type="text" class="form-control" placeholder="User Name" required>
                     <input v-model="passwordLogin" id="password" type="text" class="form-control" placeholder="Password" required>
                     <input type="submit" class="btn btn-primary" @click="doLogin">
                     <p>Don't have an account? <a href="#" @click="registerActive = !registerActive, emptyFields = false">Sign up here</a>
                     </p>
                     <p><a href="#">Forgot your password?</a></p>
                  </form>
               </div>

               <div v-else class="card register" v-bind:class="{ error: emptyFields }">
                  <h2>Sign Up</h2>
                  <form class="form-group">
                    <input v-model="userNameReg" type="text" class="form-control" placeholder="User Name" required>
                     <input v-model="emailReg" type="text" class="form-control" placeholder="Email" required>
                     <span style="color:darkred;font-size:4mm" v-if="msg.email">{{msg.email}}</span>
                     <input v-model="passwordReg" type="text" class="form-control" placeholder="Password" required>
                     <span style="color:darkred;font-size: 4mm" v-if="msg.password">{{msg.password}}</span>
                     <input v-model="confirmReg" type="text" class="form-control" placeholder="Confirm Password" required>
                     <span style="color:darkred;font-size:4mm" v-if="msg.confirmPassword">{{msg.confirmPassword}}</span>
                     <input type="submit" class="btn btn-primary" @click="doRegister" :disabled="!disabled.every(i => i === false)">
                     <p>Already have an account? <a href="#" @click="registerActive = !registerActive, emptyFields = false">Sign in here</a>
                     </p>
                  </form>
               </div>
            </div>
         </div>

      </div>
   </div>

</div>
</template>

<script>
export default {
  name: 'Login',
  data: () => ({
    msg: [],
    registerActive: false,
    userNameLogin: '',
    passwordLogin: '',
    userNameReg: '',
    emailReg: '',
    passwordReg: '',
    confirmReg: '',
    emptyFields: false,
    disabled: [true, true]
  }),
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
  methods: {
    doLogin () {
      if (this.userNameLogin === '' || this.passwordLogin === '') {
        this.emptyFields = true
      } else {
        alert('You are now logged in')
      }
    },

    doRegister () {
      if (this.emailReg === '' || this.passwordReg === '' || this.confirmReg === '') {
        this.emptyFields = true
      } else {
        alert('You are now registered')
      }
    },

    validateEmail (value) {
      // eslint-disable-next-line no-useless-escape
      if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value)) {
        this.msg['email'] = ''
        this.disabled = [false, this.disabled[1]]
      } else {
        this.msg['email'] = 'Invalid Email Address'
        this.disabled = [true, this.disabled[1]]
      }
    },
    validatePassword (value) {
      let difference = 8 - value.length
      if (value.length < 8) {
        this.msg['password'] = 'Must be 8 characters! ' + difference + ' characters left'
        this.disabled = [this.disabled[1], true]
      } else {
        this.msg['password'] = ''
        this.disabled = [this.disabled[1], false]
      }
    },
    validateConfirmPassword (value) {
      if (this.passwordReg !== value) {
        this.msg['confirmPassword'] = 'Passwords are different'
        this.disabled = [this.disabled[1], true]
      } else {
        this.msg['confirmPassword'] = ''
        this.disabled = [this.disabled[1], false]
      }
    }
  }
}
</script>

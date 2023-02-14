<template>
<div id="app">
   <div class="register-page">
            <div>
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
</template>

<style scoped src="../assets/css/loginRegisterPages.css">
</style>

<script src="../modules/register.js">
</script>

<style scoped src="../assets/css/loginRegisterPages.css">
</style>

<script src="../modules/register.js"></script>

<template>
<div id="app">
   <div class="register-page">
      <div class="container">
         <div class="row">
            <div class="col-lg-4 col-md-6 col-sm-8 mx-auto">
               <div class="card register" v-bind:class="{ error: emptyFields }">
                  <h2>Sign Up</h2>
                  <form class="form-group" data-url_root="/login">
                    <input v-model="userNameReg" id="userName" type="text" class="form-control" placeholder="User Name" required>
                     <input v-model="emailReg" id="email" type="email" class="form-control" placeholder="Email" required>
                     <span style="color:darkred;font-size:4mm" v-if="msg.email">{{msg.email}}</span>
                     <input v-model="passwordReg" id="password" type="password" class="form-control" placeholder="Password" required>
                     <span style="color:darkred;font-size: 4mm" v-if="msg.password">{{msg.password}}</span>
                     <input v-model="confirmReg" id="confirmPassword" type="password" class="form-control" placeholder="Confirm Password" required>
                     <span style="color:darkred;font-size:4mm" v-if="msg.confirmPassword">{{msg.confirmPassword}}</span>
                     <input type="submit" class="btn btn-primary" @click="doRegister">
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

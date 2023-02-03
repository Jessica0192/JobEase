<!--https://blog.logrocket.com/vue-form-input-validation-watchers/-->

<style scoped src="../assets/css/loginRegisterPages.css">
</style>

<script src="../modules/login.js"></script>

<template>
  <div id="app">
   <div class="login-page">
      <div class="container">
         <div class="row">
            <div class="col-lg-4 col-md-6 col-sm-8 mx-auto">
               <div class="card login" v-bind:class="{ error: emptyFields }">
                  <h2>Sign In</h2>
                  <form class="form-group" @submit.prevent="doLogin">
                     <input v-model="userNameLogin" id="userName" type="text" class="form-control" placeholder="User Name" required>
                     <input v-model="passwordLogin" id="password" type="password" class="form-control" placeholder="Password" required>
                     <input type="submit" class="btn btn-primary">
                     <p>Don't have an account? <a href="/register" @click="emptyFields = false">Sign up here</a>
                     </p>
                     <p><a href="#">Forgot your password?</a></p>
                  </form>
               </div>
            </div>
         </div>

      </div>
   </div>
</div>
</template>

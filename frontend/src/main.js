// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  data () {
    return {
      info: null
    }
  },
  router,
  components: { App },
  template: '<App/>',
  mounted () {
    axios
      .get('http://localhost:8000/hello/jessica')
      .then(response => {
        (this.info = response)
        console.log(response)
      }, (error) => {
        console.log(error)
      })
  }
})

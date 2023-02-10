// In this store.js file, the state property holds the data that needs to be shared across multiple components.
// The getters property allows you to retrieve derived data from the state. The mutations property holds methods that will
// be used to update the state. The actions property contains methods that can be used to perform asynchronous operations
// and commit mutations.
import { createStore } from 'vuex'
import auth from '@/store/modules/auth'

export default createStore({
  state: {
  },
  getters: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    auth
  }
})

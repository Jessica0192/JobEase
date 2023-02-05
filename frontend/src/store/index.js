import { createStore } from 'vuex'

export default createStore({
  state: {
    userLoggedIn: false
  },
  getters: {
    getUserLoggedIn: state => state.userLoggedIn
  },
  mutations: {
    setUserLoggedIn: (state, value) => (state.userLoggedIn = value)
  },
  actions: {
    setUserLoggedIn: ({ commit }, value) => commit('setUserLoggedIn', value)
  },
  modules: {
  }
})

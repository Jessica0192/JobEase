export default ({
  state: {
    userLoggedIn: false,
    user: {},
    // token: null
  },
  getters: {
    getUserLoggedIn: state => state.userLoggedIn,
    getUser: state => state.user
  },
  mutations: {
    setUserLoggedIn: (state, value) => (state.userLoggedIn = value),
    setUser: (state, user) => {
      state.user = user
    },
    // setToken (state, token) {
    //   state.token = token
    // }
  },
  actions: {
    login ({ commit }, { token, user }) {
      commit('setUserLoggedIn', true)
      commit('setUser', user)
      // In general, it's recommended to use local storage if you want the user to remain logged in after they close the browser,
      // and to use Vuex state if you want to enforce a consistent state across your application.
      localStorage.setItem('token', token)
      // commit('token', token)
    },
    logout ({ commit }) {
      commit('setUserLoggedIn', false)
      commit('setUser', {})
      // In general, it's recommended to use local storage if you want the user to remain logged in after they close the browser,
      // and to use Vuex state if you want to enforce a consistent state across your application.
      localStorage.removeItem('token')
      // commit('token', token)
    }
  }
})

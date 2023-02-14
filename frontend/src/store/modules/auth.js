// This file is for creating a Vuex module for authentication in a Vue.js application.
// Vuex is a state management library for Vue.js that helps you manage and share the state of your application between components.
// The state property holds data relevant to the authentication state of the user, such as the userLoggedIn flag and the user object.

// Overall, this file is used to manage the authentication state of the user in a centralized and consistent way across the application.
export default ({
  state: {
    userLoggedIn: false,
    user: {},
    // token: null
  },
  // The getters property provides a way to retrieve data from the state.
  // For example, you can use the getUserLoggedIn getter to check whether the user is logged in,
  // and the getUser getter to retrieve the user object.
  getters: {
    getUserLoggedIn: state => state.userLoggedIn,
    getUser: state => state.user
  },
  // The mutations property contains methods that will be used to update the state.
  // For example, you can use the setUserLoggedIn mutation to set the userLoggedIn flag, and the setUser mutation to set the user object.
  mutations: {
    setUserLoggedIn: (state, value) => (state.userLoggedIn = value),
    setUser: (state, user) => {
      state.user = user
    },
  },
  // The actions property contains methods that perform asynchronous operations and commit mutations.
  // For example, you can use the login action to log in a user and set the userLoggedIn flag and the user object,
  // and you can use the logout action to log out a user and reset the userLoggedIn flag and the user object.
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

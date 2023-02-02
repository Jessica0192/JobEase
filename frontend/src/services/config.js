export const API_URL = 'http://localhost:8000/' // Application for easy retrieval of API URL from API list in the future

export const API = {
  users: 'users', // list the api structure
  // user api
  user: (args) => `users/${args}`
}

export const ETC_API = {
  tests: 'tests',
  test: (args) => `users/${args.args1}/depth1/${args.args2}/depth2/${args.args3}`
}

export const API_URL = 'http://localhost:8000/' // Application for easy retrieval of API URL from API list in the future

export const API = {
  // user api
  auth: (args) => `auth/${args}`,
  user: (args) => `user/${args}`,
  jobRecord: (args) => `job_record/${args}`,
  jobTag: (args) => `job_tag/${args}`,
  jobStatus: (args) => `job_status/${args}`
}

export const ETC_API = {
  tests: 'tests',
  test: (args) => `users/${args.args1}/depth1/${args.args2}/depth2/${args.args3}`
}

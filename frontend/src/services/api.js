import axios from 'axios'
// const apiUrl = '/api'

/**
 * @param {string} resource The resource to request date from
 */
export default class Api {
  static async getResource (resource, body = null) {
    let response = null
    try {
      // response = await axios.post(`${apiUrl}/${resource}`, body == null ? {} : body)
      response = await axios.get('http://127.0.0.1:8000/hello/enes')
    } catch (exception) {}

    if (response == null || response.status !== 200) {
      return null
    }

    return response.data
  }
}

/*
  REQUEST BODY FORMAT

  {
    request: {
      exclude: true,
      properties: key
    },
    filter: {
      require: 'all',
      conditions: [
        {
          property: key,
          type: '==',
          value: value,
          default: true
        }
      ]
    }
  }

*/

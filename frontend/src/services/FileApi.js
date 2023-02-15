import axios from 'axios'

export const fileApi = {
    async uploadFile (formData) {
      try {
        await axios.post ('/upload', formData) 
      } catch (err) {
        console.log(err)
      } 
    }
  }
  
import axios from 'axios'

export const fileApi = {
    async uploadFile (formData) {
      try {
        await axios.post ('/upload', formData) 
      } catch (err) {
        console.log(err)
      } 
    },

    async deleteFile (resourceName) {
      try {
        await axios.delete (`delete/${resourceName}`) 
      } catch (err) {
        console.log(err)
      } 
    }
  }
  
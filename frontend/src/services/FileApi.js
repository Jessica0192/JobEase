import axios from 'axios'

export const fileApi = {
  //  To upload a file
  async uploadFile (formData) {
    let response = null
    try {
      response = await axios.post ('/upload', formData) 
    } catch (err) {
      console.log(err)
    }

    if (response == null || response.status !== 200) {
      return null
    }
    return response.data
  },

  // To delete a file
  async deleteFile (resourceName) {
    let response = null
    try {
      response = await axios.delete (`/delete/${resourceName}`)
    } catch (err) {
      console.log(err)
    }
    
    if (response == null || response.status !== 200) {
      return null
    }
    return response.data
  },

  // To download a file
  async downloadFile (url, filename) {
    
    const response = await axios.get(url, { responseType: 'blob' })
    const blob = new Blob([response.data])
    const objectUrl = URL.createObjectURL(blob)

    const link = document.createElement('a')
    link.href = objectUrl
    link.download = filename
    document.body.appendChild(link)
    link.click()

    // clean up resources
    URL.revokeObjectURL(objectUrl)
    document.body.removeChild(link)
  },

  // To get all resources
  async getAllResources () {
    let response = null
    try {
      response = await axios.get('/api/resources')
    } catch (err) {
      console.log(err)
    }
    
    if (response == null || response.status !== 200) {
      return null
    }
    return response.data
  }
}
  
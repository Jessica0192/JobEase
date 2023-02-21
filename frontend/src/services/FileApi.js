// import axios from 'axios'
import service from './base/service'

const url = 'http://localhost:8000'

export const fileApi = {
  //  To upload a file
  async uploadFile (resourceTypeId, resourceExtensionTypeId, formData) {
    let response = null
    try {
      response = await service.post (`${url}/resource/?resource_type_id=${resourceTypeId}&resource_extension_type_id=${resourceExtensionTypeId}`, formData) 
    } catch (err) {
      console.log(err)
    }

    if (response == null || response.status !== 200) {
      return null
    }
    return response.data
  },

  // To delete a file
  async deleteFile (resourceId) {
    let response = null
    try {
      response = await service.delete (`${url}/resource/${resourceId}`)
    } catch (err) {
      console.log(err)
    }
    
    if (response == null || response.status !== 200) {
      return null
    }
    return response
  },

  // To download a file
  async downloadFile(resourceId, filename, fileType) {
    try {
      // Send a request to download the file
      const response = await service.get(`${url}/resource/${resourceId}/download/`, { responseType: 'arraybuffer' })
  
      // Convert the response data to a blob
      const blob = new Blob([response.data], { type: fileType })
  
      // Create a URL for the blob
      const objectUrl = URL.createObjectURL(blob)
  
      // Create a link to download the file
      const link = document.createElement('a')
      link.href = objectUrl
      link.download = filename
      document.body.appendChild(link)
  
      // Click the link to download the file
      link.click()
  
      // Clean up resources
      URL.revokeObjectURL(objectUrl)
      document.body.removeChild(link)
    } catch (error) {
      console.error('Error downloading file:', error)
    }
  }
  ,

  // To get all resources
  async getAllResources () {
    let response = null
    try {
      response = await service.get(`${url}/resource/?limit=100`)
    } catch (err) {
      console.log(err)
    }
    
    if (response == null || response.status !== 200) {
      return null
    }
    return response.data
  },

  // To type extension type id
  async getFileTypeId (resourceType) {
    let response = null
    try {
      response = await service.get(`${url}/${resourceType}/`)
    } catch (err) {
      console.log(err)
    }
    
    if (response == null || response.status !== 200) {
      return null
    }
    console.log('response.data', response.data)
    return response.data
  },

  // To view a file on browser
  async displayFile(resourceId, fileType) {
    try {
      // Send a request to download the PDF file
      const response = await service.get(`${url}/resource/${resourceId}/display/`, { responseType: 'arraybuffer' })
      console.log('response', response)
      console.log('file type', fileType)
  
      // Convert the response data to a blob
      const blob = new Blob([response.data], { type: fileType })
      const fileUrl = URL.createObjectURL(blob)
      window.open(fileUrl, '_blank')
    } catch (error) {
      console.error('Error displaying file:', error)
    }
  }
}
  
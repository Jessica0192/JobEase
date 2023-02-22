
import axios from 'axios'
import service from './base/service'
import { API } from './base/config'

const url = 'http://localhost:8000'

export const fileApi = {
  //  To upload a file
  async uploadFile (resourceTypeId, resourceExtensionTypeId, formData) {
    let response = null
    const token = localStorage.getItem('token')
    try {
      const config = {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
          'Accept': 'application/json',
        },
      }
      response = await axios.post (`${url}/resource/?resource_type_id=${resourceTypeId}&resource_extension_type_id=${resourceExtensionTypeId}`, formData, config) 
    } catch (err) {
      console.log(err)
    }

    if (response == null) {
      alert('This file is already exist! Please select another file or change the nam!')
    }
    else {
      alert('File has been saved successfully!')
    }

    return response
  },

  deleteFile (resourceId) {
    return service.delete(`${API.fileResource('')}${resourceId}`)
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

  // To view a file on browser
  async displayFile(resourceId, fileType) {
    try {
      // Send a request to download the PDF file
      const response = await service.get(`${url}/resource/${resourceId}/display/`, { responseType: 'arraybuffer' })
  
      // Convert the response data to a blob
      const blob = new Blob([response.data], { type: fileType })
      const fileUrl = URL.createObjectURL(blob)
      window.open(fileUrl, '_blank')
    } catch (error) {
      console.error('Error displaying file:', error)
    }
  },

  // To type extension type id
  async getFileTypeId () {
    let response = null
    try {
      response = await service.get(`${url}/resource_type/`)
    } catch (err) {
      console.log(err)
    }
    
    if (response == null || response.status !== 200) {
      return null
    }
    return response.data
  },

  // To type extension type id
  async getFileExtensionId () {
    let response = null
    try {
      response = await service.get(`${url}/resource_extension_type/`)
    } catch (err) {
      console.log(err)
    }
    
    if (response == null || response.status !== 200) {
      return null
    }
    return response.data
  }
}
  
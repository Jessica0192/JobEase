
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

  downloadFile (resourceId) {
    return service.get(`${API.fileResource('')}${resourceId}/download/`, { responseType: 'arraybuffer' })
  },

  getAllResources () {
    return service.get(`${API.fileResource('')}?limit=100`)
  },

  displayFile (resourceId) {
    return service.get(`${API.fileResource('')}${resourceId}/display/`, { responseType: 'arraybuffer' })
  },

  getFileTypeId () {
    return service.get(`${API.fileType('')}`)
  },

  getFileExtensionId () {
    return service.get(`${API.fileExtension('')}`)
  }
}
  
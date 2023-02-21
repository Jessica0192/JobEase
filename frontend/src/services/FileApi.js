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
  async downloadFile (resourceId) {
    
    const response = await service.get(`${url}/resource/${resourceId}/download/`, { responseType: 'blob' })
    const blob = new Blob([response.data])
    const objectUrl = URL.createObjectURL(blob)

    const link = document.createElement('a')
    link.href = objectUrl
    link.download = resourceId
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
  }
}
  
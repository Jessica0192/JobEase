
import axios, {AxiosError} from 'axios'
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
      if (response instanceof AxiosError) {
        return response.response
      }
    } catch (err) {
      console.log(err.response)
      return err.response
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

  getFileType () {
    return service.get(`${API.fileType('')}`)
  },

  getFileExtension () {
    return service.get(`${API.fileExtension('')}`)
  }
}

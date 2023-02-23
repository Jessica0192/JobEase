import { fileApi } from '../../services/FileApi'
export default {
  name:'resourcePopup',
  // When the component is mounted, load resources
  async mounted () {
    await this.loadResources()
  },
  // Initialize component data
  data () {
    return {
      fileType: '',
      fileTypeDb: [],
      fileTypeDbId: '',
      fileFormat: '',
      fileExtension: [],
      fileExtensionId: '',
      file: null
    }
  },
  // Define computed properties
  computed: {
    // Check whether all the required fields have been filled
    isSaveDisabled() {
      return !(this.fileType && this.fileFormat && this.file)
    },
  },
  methods: {
    // Load resource data from the file API
    async loadResources () {
      const typeRsp = await fileApi.getFileTypeId()
      const extensionRsp = await fileApi.getFileExtensionId()
      this.fileTypeDb = typeRsp.data
      this.fileExtension = extensionRsp.data
    },
    // Set the selected file in the component's data
    selectFile () {
      this.file = this.$refs.selectedFile.files[0]
    },
    // Reset the component's data to initial values
    resetForm() {
      this.fileType = ''
      this.fileFormat = ''
      this.file = null
      this.$refs.selectedFile.value = ''
    },
    // Save the selected file using the file API
    saveFile () {
      const formData = new FormData()
      formData.append('file', this.file)
      let extensionFile = this.file.name.split('.').pop()
      let alowSave = false
      
      // Find the ID of the selected file type
      for (let j=0; j<this.fileTypeDb.length; j++){
        if (this.fileTypeDb[j].resource_type === this.fileType)
        {
          this.fileTypeDbId = this.fileTypeDb[j].id
          break
        }          
      }

      // Determine whether the selected file format is allowed
      for (let k =0 ; k < this.fileExtension.length; k++) {
        if (extensionFile === 'docx') {
          alowSave = true
          break
        }
        if (extensionFile === 'jpg') {
          alowSave = true
          break
        }
        if (this.fileExtension[k].resource_extension_type.split('/').pop() === extensionFile) {
          alowSave = true
          break
        }
      }

      // If the file format is allowed, find the ID of the selected file extension and upload the file using the file API
      if (alowSave) {
        for (let i = 0; i < this.fileExtension.length; i++) {
          let extensionDb = this.fileExtension[i].resource_extension_type.split('/').pop()
          if (extensionFile === 'docx') {
            extensionFile = 'plain'
          }
          if (extensionDb === extensionFile) {
            this.fileExtensionId = this.fileExtension[i].id
            break 
          }
        }
        
        fileApi.uploadFile(this.fileTypeDbId, this.fileExtensionId, formData)
        this.resetForm()
      }
      // If the file format is not allowed, display an alert message
      else {
        alert('Please select a file with correct format!')
      }
    }
  }
}